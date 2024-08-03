import React from "react";
import { useParams } from "react-router-dom";
import clinics from "./clinics.json"; // Your clinic data
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Paper,
	Grid,
} from "@mui/material";
import ClinicImage from "./clinic.jpg"; // Correct import for the image

const Clinics = () => {
	const { identifier } = useParams();
	const clinic = clinics.find(
		(clinic) =>
			clinic.id.toLowerCase().replace(/\s+/g, "-") ===
			identifier
	);

	if (!clinic) {
		return <div>Clinic not found</div>;
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				color="primary"
				sx={{ marginBottom: 4 }}>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}>
						Maven Dental Greenwood
					</Typography>
					<Button color="inherit">About Us</Button>
					<Button color="inherit">
						Meet The Clinicians
					</Button>
					<Button color="inherit">Treatments</Button>
					<Button color="inherit">Offers</Button>
					<Button color="inherit">Payment Options</Button>
				</Toolbar>
			</AppBar>

			{/* Background Image with Title */}
			<Box
				sx={{
					position: "relative",
					height: "300px",
					backgroundImage: `url(${ClinicImage})`, // Corrected way to set the background image
					backgroundSize: "cover",
					backgroundPosition: "center",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color: "white",
				}}>
				<Typography
					variant="h3"
					sx={{
						position: "absolute", // Positioning text relative to the Box
						bottom: 20, // Move 20px from the bottom
						textAlign: "center",
						textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
					}}>
					{clinic.name}
				</Typography>
			</Box>

			{/* Main Content */}
			<Grid container spacing={3} padding={3}>
				{/* About Us Section */}
				<Grid item xs={12} md={8}>
					<Typography variant="h4" gutterBottom>
						About Us
					</Typography>
					<Typography variant="body1" paragraph>
						Established in 1993, Maven Dental Greenwood has
						three decades of history supporting the local
						community. Don't let the age fool you though –
						your local clinic is far from dated; walking
						through the doors you will find an elegant
						dental facility equipped with the latest
						technology.
					</Typography>
					<Typography variant="body1" paragraph>
						<strong>Address:</strong> {clinic.address}
					</Typography>
					<Typography variant="body1" paragraph>
						<strong>Suburb:</strong> {clinic.id}
					</Typography>
					<Typography variant="body1" paragraph>
						<strong>Phone:</strong> {clinic.phone}
					</Typography>
					<Typography variant="body1" paragraph>
						<strong>Hours:</strong> {clinic.hours}
					</Typography>
					<Typography variant="body1" paragraph>
						<strong>Comment:</strong> {clinic.comment}
					</Typography>
				</Grid>

				{/* Contact and Booking Section */}
				<Grid item xs={12} md={4}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="button"
							display="block"
							gutterBottom>
							Contact Us
						</Typography>
						<Button
							variant="contained"
							sx={{ marginBottom: 2 }}
							onClick={() =>
								window.open("/forms", "_blank")
							}>
							Book Online
						</Button>
						<Typography variant="body2">
							{clinic.phone}
						</Typography>
						<Typography variant="body2">
							Send A Message
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			{/* Address Space */}
			<Box sx={{ padding: 3, backgroundColor: "#f5f5f5" }}>
				<Typography variant="h6">Visit Us:</Typography>
				<Typography variant="body1">
					{clinic.address}
				</Typography>
				<Typography variant="body1">{clinic.id}</Typography>
			</Box>
		</Box>
	);
};

export default Clinics;
