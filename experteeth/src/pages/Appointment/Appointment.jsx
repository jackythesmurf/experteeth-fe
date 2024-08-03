import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Button,
	TextField,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Snackbar,
	Typography,
	Container,
	Box,
	Grid,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Custom Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert
			elevation={6}
			ref={ref}
			variant="filled"
			{...props}
		/>
	);
});

const Appointment = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm();

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [blockedTimes, setBlockedTimes] = useState([]);

	const onSubmit = (data) => {
		console.log(data);
		setOpenSnackbar(true); // Open snackbar on successful submission
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	// Watch for date change and block times
	const selectedDate = watch("date");
	useEffect(() => {
		if (selectedDate) {
			const blocked = generateBlockedTimes(
				new Date(selectedDate)
			);
			setBlockedTimes(blocked);
		}
	}, [selectedDate]);

	const generateBlockedTimes = (date) => {
		const startHour = 9; // Example start hour
		const endHour = 17; // Example end hour
		const blocked = [];

		for (let hour = startHour; hour < endHour; hour++) {
			blocked.push(
				`${date.toISOString().split("T")[0]}T${String(
					hour
				).padStart(2, "0")}:00`
			);
			blocked.push(
				`${date.toISOString().split("T")[0]}T${String(
					hour
				).padStart(2, "0")}:30`
			);
		}
		return blocked;
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
			<Box mb={4} textAlign="center">
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					sx={{ color: "#11c39c" }}>
					Request an Appointment
				</Typography>
			</Box>
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete="off">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Controller
							name="firstName"
							control={control}
							defaultValue=""
							rules={{ required: "First name required" }}
							render={({ field }) => (
								<TextField
									{...field}
									label="First Name"
									fullWidth
									margin="normal"
									variant="outlined"
									error={!!errors.firstName}
									helperText={
										errors.firstName
											? errors.firstName.message
											: ""
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="lastName"
							control={control}
							defaultValue=""
							rules={{ required: "Last name required" }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Last Name"
									fullWidth
									margin="normal"
									variant="outlined"
									error={!!errors.lastName}
									helperText={
										errors.lastName
											? errors.lastName.message
											: ""
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="phoneNumber"
							control={control}
							defaultValue=""
							rules={{
								required: "Phone number required",
								pattern: {
									value: /^[0-9\b]+$/,
									message: "Invalid phone number",
								},
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Phone Number"
									fullWidth
									margin="normal"
									variant="outlined"
									error={!!errors.phoneNumber}
									helperText={
										errors.phoneNumber
											? errors.phoneNumber.message
											: ""
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: "Email required",
								pattern: {
									value:
										/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
									message: "Invalid email address",
								},
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Email"
									fullWidth
									margin="normal"
									variant="outlined"
									error={!!errors.email}
									helperText={
										errors.email ? errors.email.message : ""
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl
							fullWidth
							margin="normal"
							variant="outlined">
							<InputLabel
								id="location-label">
								Select Location
							</InputLabel>
							<Controller
								name="location"
								control={control}
								defaultValue=""
								rules={{ required: "Location required" }}
								render={({ field }) => (
									<Select
										{...field}
										labelId="location-label"
										label="Location"
										error={!!errors.location}>
										<MenuItem value="location1">
											Location 1
										</MenuItem>
										<MenuItem value="location2">
											Location 2
										</MenuItem>
									</Select>
								)}
							/>
							{errors.location && (
								<Typography variant="body2" color="error">
									{errors.location.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl
							fullWidth
							margin="normal"
							variant="outlined">
							<InputLabel
								id="doctor-label">
								Select Doctor
							</InputLabel>
							<Controller
								name="doctor"
								control={control}
								defaultValue=""
								rules={{
									required: "Doctor selection required",
								}}
								render={({ field }) => (
									<Select
										{...field}
										labelId="doctor-label"
										label="Doctor"
										error={!!errors.doctor}>
										<MenuItem value="doctor1">
											Doctor 1
										</MenuItem>
										<MenuItem value="doctor2">
											Doctor 2
										</MenuItem>
									</Select>
								)}
							/>
							{errors.doctor && (
								<Typography variant="body2" color="error">
									{errors.doctor.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="comments"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									label="Booking Comments"
									fullWidth
									multiline
									rows={3}
									margin="normal"
									variant="outlined"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="date"
							control={control}
							defaultValue=""
							rules={{ required: "Date required" }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Date"
									type="date"
									fullWidth
									margin="normal"
									InputLabelProps={{ shrink: true }}
									error={!!errors.date}
									helperText={
										errors.date ? errors.date.message : ""
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="time"
							control={control}
							defaultValue=""
							rules={{ required: "Time required" }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Time"
									type="time"
									fullWidth
									margin="normal"
									InputLabelProps={{ shrink: true }}
									error={!!errors.time}
									helperText={
										errors.time ? errors.time.message : ""
									}
									InputProps={{
										inputProps: {
											min:
												blockedTimes.length > 0
													? blockedTimes[0].split("T")[1]
													: "09:00",
											max:
												blockedTimes.length > 0
													? blockedTimes[
															blockedTimes.length - 1
													  ].split("T")[1]
													: "17:00",
										},
									}}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Box textAlign="center" my={0.5}>
					<Button
						type="submit"
						variant="contained"
						size="large"
						sx={{
							backgroundColor: "#000000", // Black background for the button
							color: "#ffffff",
							fontWeight: "bold",
							textTransform: "none",
							borderRadius: "8px",
							padding: "8px 30px",
							"&:hover": {
								backgroundColor: "#11c39c", // Teal color on hover
							},
						}}>
						Next
					</Button>
				</Box>
			</form>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity="success">
					Appointment request submitted successfully!
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Appointment;
