import React, { useState } from "react";
import {
	Box,
	Typography,
	Paper,
	TextField,
	Button,
} from "@mui/material";
import axios from "axios";

const clinics = [
	{
		name: "Chatswood",
		address: "176 Chatswood Rd, NSW",
		lat: -33.7999,
		lng: 151.1875,
	},
	{
		name: "Burwood",
		address: "205 Burwood Rd, NSW",
		lat: -33.8881,
		lng: 151.0984,
	},
	{
		name: "Sydney",
		address: "205 Sussex street, NSW",
		lat: -33.8688,
		lng: 151.2093,
	},
	{
		name: "Mascot",
		address: "35 Gardeners Rd, NSW",
		lat: -33.9219,
		lng: 151.2048,
	},
];

const DisplayLocMapColumn = () => {
	const [location, setLocation] = useState("");
	const [mapUrl, setMapUrl] = useState("");
	const [closestClinic, setClosestClinic] = useState(null);

	const handleSearch = async () => {
		const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Replace with your actual Google Maps API key
		console.log(apiKey)
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			location
		)}&key=${apiKey}`;

		try {
			const response = await axios.get(geocodeUrl);

			if (
				response.data.status === "OK" &&
				response.data.results.length > 0
			) {
				const { lat, lng } =
					response.data.results[0].geometry.location;

				let minDistance = Infinity;
				let nearestClinic = null;

				clinics.forEach((clinic) => {
					const distance = Math.sqrt(
						Math.pow(lat - clinic.lat, 2) +
							Math.pow(lng - clinic.lng, 2)
					);
					if (distance < minDistance) {
						minDistance = distance;
						nearestClinic = clinic;
					}
				});

				if (nearestClinic) {
					const newMapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
						nearestClinic.address
					)}&key=${apiKey}`;
					setMapUrl(newMapUrl);
					setClosestClinic(nearestClinic);
				}
			} else {
				console.error(
					"No results found for the given location."
				);
				setMapUrl("");
				setClosestClinic(null);
			}
		} catch (error) {
			console.error("Error fetching location data:", error);
			setMapUrl("");
			setClosestClinic(null);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				height: "100vh",
				width: "100%",
				gap: 2,
			}}>
			{/* Left Section */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					padding: 2,
					overflowY: "auto",
					borderRight: "1px solid #ddd",
				}}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Location Details
				</Typography>
				<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
					<TextField
						label="Search Location"
						variant="outlined"
						fullWidth
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSearch}
						disabled={!location}>
						Search
					</Button>
					{closestClinic && (
						<Box sx={{ mt: 2 }}>
							<Typography variant="body1">
								Closest Clinic: {closestClinic.name}
							</Typography>
							<Typography variant="body2">
								Address: {closestClinic.address}
							</Typography>
						</Box>
					)}
				</Paper>
			</Box>

			{/* Right Section */}
			<Box
				sx={{
					flex: 2,
					display: "flex",
					flexDirection: "column",
					padding: 2,
				}}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Map
				</Typography>
				<Paper
					elevation={3}
					sx={{ height: "100%", width: "100%" }}>
					{mapUrl ? (
						<iframe
							title="Google Map"
							width="100%"
							height="100%"
							frameBorder="0"
							style={{ border: 0 }}
							src={mapUrl}
							allowFullScreen></iframe>
					) : (
						<Typography
							variant="body1"
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								color: "#aaa",
							}}>
							Enter a location to view the nearest clinic
						</Typography>
					)}
				</Paper>
			</Box>
		</Box>
	);
};

export default DisplayLocMapColumn;
