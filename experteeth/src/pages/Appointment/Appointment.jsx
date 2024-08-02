import React, { useState } from "react";
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
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Appointment = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setOpenSnackbar(true); // Open snackbar on successful submission
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          REQUEST AN APPOINTMENT
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          )}
        />
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
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Phone number required", pattern: { value: /^[0-9\b]+$/, message: "Invalid phone number" } }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email address"
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="location-label">Select Location</InputLabel>
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
                error={!!errors.location}
              >
                <MenuItem value="location1">Location 1</MenuItem>
                <MenuItem value="location2">Location 2</MenuItem>
              </Select>
            )}
          />
          {errors.location && <Typography variant="body2" color="error">{errors.location.message}</Typography>}
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="doctor-label">Select Doctor</InputLabel>
          <Controller
            name="doctor"
            control={control}
            defaultValue=""
            rules={{ required: "Doctor selection required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="doctor-label"
                label="Doctor"
                error={!!errors.doctor}
              >
                <MenuItem value="doctor1">Doctor 1</MenuItem>
                <MenuItem value="doctor2">Doctor 2</MenuItem>
              </Select>
            )}
          />
          {errors.doctor && <Typography variant="body2" color="error">{errors.doctor.message}</Typography>}
        </FormControl>
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
              rows={4}
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <Box textAlign="center" my={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            NEXT
          </Button>
        </Box>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Appointment request submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Appointment;
