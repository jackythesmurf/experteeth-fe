import React, { useState, useRef } from "react";
import {
	Box,
	Typography,
	Paper,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Alert,
} from "@mui/material";
import {
	Autocomplete,
	LoadScript,
	GoogleMap,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const clinics = [
	{
		name: "Experteeth Dental 益白齿科",
		rating: 5.0,
		reviews: 466,
		type: "Dental clinic",
		address: "Suite 502/71-73 Archer St",
		phone: "(02) 9410 1080",
		hours: "Open ⋅ Closes 5:30 pm",
		comment:
			"Experteeth Dental is very nice as they treat patients warmly.",
		lat: -33.7969,
		lng: 151.1813,
	},
	{
		name: "Experteeth Dental 益白齿科",
		rating: 4.8,
		reviews: 175,
		type: "Dental clinic",
		address: "Sydney NSW",
		phone: "(02) 9232 4051",
		hours: "Open ⋅ Closes 6 pm",
		comment:
			"Excellent professional service, couldn't recommend Experteeth dental more highly.",
		lat: -33.8688,
		lng: 151.2093,
	},
	{
		name: "Experteeth Dental",
		rating: 4.9,
		reviews: 605,
		type: "Dental clinic",
		address: "Eastwood NSW",
		phone: "(02) 9858 3636",
		hours: "Open ⋅ Closes 5:30 pm",
		lat: -33.7891,
		lng: 151.0813,
	},
];

const DisplayLocMapColumn = () => {
	const [location, setLocation] = useState("");
	const [mapCenter, setMapCenter] = useState({
		lat: -33.8688,
		lng: 151.2093,
	});
	const [closestClinics, setClosestClinics] = useState([]);
	const [selectedClinic, setSelectedClinic] =
		useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const autocompleteRef = useRef(null);
	const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

	const handlePlaceChanged = () => {
		const place = autocompleteRef.current.getPlace();
		if (place.geometry) {
			const lat = place.geometry.location.lat();
			const lng = place.geometry.location.lng();
			setLocation(place.formatted_address);
			handleSearch(lat, lng);
		}
	};

	const handleSearch = async (lat, lng) => {
		setLoading(true);
		setError("");
		try {
			let sortedClinics = clinics
				.map((clinic) => {
					const distance = Math.sqrt(
						Math.pow(lat - clinic.lat, 2) +
							Math.pow(lng - clinic.lng, 2)
					);
					return { ...clinic, distance };
				})
				.sort((a, b) => a.distance - b.distance);

			setClosestClinics(sortedClinics);
			setMapCenter({ lat, lng });
		} catch (error) {
			setError(
				"Failed to fetch clinic details. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleMarkerClick = (clinic) => {
		setSelectedClinic(clinic);
	};

	return (
		<LoadScript
			googleMapsApiKey={apiKey}
			libraries={["places"]}>
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
						<Autocomplete
							onLoad={(ref) =>
								(autocompleteRef.current = ref)
							}
							onPlaceChanged={handlePlaceChanged}>
							<TextField
								label="Search Location"
								variant="outlined"
								fullWidth
								value={location}
								onChange={(e) =>
									setLocation(e.target.value)
								}
								sx={{ mb: 2 }}
							/>
						</Autocomplete>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleSearch()}
							disabled={!location}>
							Search
						</Button>
						{loading && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									mt: 2,
								}}>
								<CircularProgress />
							</Box>
						)}
						{error && (
							<Alert severity="error" sx={{ mt: 2 }}>
								{error}
							</Alert>
						)}
						{closestClinics.length > 0 && (
							<List sx={{ mt: 2 }}>
								{closestClinics.map((clinic, index) => (
									<ListItem key={index}>
										<ListItemText
											primary={clinic.name}
											secondary={clinic.address}
										/>
									</ListItem>
								))}
							</List>
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
						<GoogleMap
							mapContainerStyle={{
								width: "100%",
								height: "100%",
							}}
							center={mapCenter}
							zoom={12}>
							{closestClinics.map((clinic, index) => (
								<Marker
									key={index}
									position={{
										lat: clinic.lat,
										lng: clinic.lng,
									}}
									icon={{
										url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
										scaledSize: new window.google.maps.Size(
											40,
											40
										),
									}}
									onClick={() => handleMarkerClick(clinic)}
								/>
							))}

							{selectedClinic && (
								<InfoWindow
									position={{
										lat: selectedClinic.lat,
										lng: selectedClinic.lng,
									}}
									onCloseClick={() =>
										setSelectedClinic(null)
									}>
									<div>
										<h3>{selectedClinic.name}</h3>
										<p>{selectedClinic.address}</p>
										<p>{selectedClinic.phone}</p>
										<p>{selectedClinic.hours}</p>
										<p>{selectedClinic.comment}</p>
									</div>
								</InfoWindow>
							)}
						</GoogleMap>
					</Paper>
				</Box>
			</Box>
		</LoadScript>
	);
};

export default DisplayLocMapColumn;
