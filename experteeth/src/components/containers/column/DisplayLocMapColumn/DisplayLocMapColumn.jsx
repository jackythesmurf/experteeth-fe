import React, { useState, useRef, useEffect } from "react";
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
	AppBar,
	Toolbar,
	IconButton,
} from "@mui/material";
import {
	Autocomplete,
	useJsApiLoader,
	GoogleMap,
	Marker,
} from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClinicModal from "../../../elements/Map/ClinicModal/ClinicModal";
import clinics from "./clinic.json";

const libraries = ["places"];

const DisplayLocMapColumn = () => {
	const [location, setLocation] = useState("");
	const [mapCenter, setMapCenter] = useState({
		lat: -33.8688,
		lng: 151.2093,
	});
	const [closestClinics, setClosestClinics] = useState([]);
	const [selectedClinic, setSelectedClinic] =
		useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const autocompleteRef = useRef(null);
	const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKey,
		libraries,
	});

	useEffect(() => {
		let isMounted = true; // flag to check if component is mounted
		const fetchClinics = async () => {
			if (location) {
				setLoading(true);
				setError("");
				try {
					const sortedClinics = clinics
						.map((clinic) => ({
							...clinic,
							distance: Math.hypot(
								mapCenter.lat - clinic.lat,
								mapCenter.lng - clinic.lng
							),
						}))
						.sort((a, b) => a.distance - b.distance);
					if (isMounted) {
						setClosestClinics(sortedClinics);
					}
				} catch {
					if (isMounted) {
						setError(
							"Failed to fetch clinic details. Please try again."
						);
					}
				} finally {
					if (isMounted) {
						setLoading(false);
					}
				}
			}
		};

		fetchClinics();

		// Cleanup function to reset the loading state
		return () => {
			isMounted = false;
			setLoading(false);
		};
	}, [location, mapCenter]);

	const handlePlaceChanged = () => {
		const place = autocompleteRef.current.getPlace();
		if (place.geometry) {
			const lat = place.geometry.location.lat();
			const lng = place.geometry.location.lng();
			setLocation(place.formatted_address);
			setMapCenter({ lat, lng });
		}
	};

	const handleMarkerClick = (clinic) => {
		setSelectedClinic(clinic);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedClinic(null);
		setModalOpen(false);
	};

	if (loadError) {
		return <div>Error loading maps</div>;
	}

	if (!isLoaded) {
		return <div>Loading Maps...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Clinic Locator
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexGrow: 1,
					gap: 2,
					p: 2,
				}}>
				{/* Left Section */}
				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						padding: 2,
						borderRight: "1px solid #ddd",
						overflowY: "auto",
					}}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Search Location
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
								InputProps={{
									endAdornment: (
										<IconButton
											onClick={() =>
												setMapCenter({
													lat: mapCenter.lat,
													lng: mapCenter.lng,
												})
											}>
											<SearchIcon />
										</IconButton>
									),
								}}
								sx={{ mb: 2 }}
							/>
						</Autocomplete>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								setMapCenter({
									lat: mapCenter.lat,
									lng: mapCenter.lng,
								})
							}
							disabled={!location}
							startIcon={<LocationOnIcon />}
							sx={{ mb: 2 }}>
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
						{closestClinics.length > 0 && !loading && (
							<List sx={{ mt: 2 }}>
								{closestClinics.map((clinic, index) => (
									<ListItem
										key={index}
										button
										onClick={() =>
											handleMarkerClick(clinic)
										}>
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
									onClick={() => handleMarkerClick(clinic)}
								/>
							))}
						</GoogleMap>
					</Paper>
				</Box>
			</Box>
			<ClinicModal
				clinic={selectedClinic}
				open={modalOpen}
				onClose={handleCloseModal}
			/>
		</Box>
	);
};

export default DisplayLocMapColumn;
