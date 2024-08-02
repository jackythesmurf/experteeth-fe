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
	Slide,
	Card,
	CardMedia,
	CardContent,
	Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
	Autocomplete,
	useJsApiLoader,
	GoogleMap,
	Marker,
} from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import clinics from "./clinic.json";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ScheduleIcon from "@mui/icons-material/Schedule";
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
				backgroundColor: "#f7fefd", // Light teal background
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
					maxWidth: "800px",
					margin: "0 auto",
					boxSizing: "border-box",
				}}>
				<Typography
					variant="h5"
					sx={{
						marginBottom: "16px",
						fontWeight: "bold",
						color: "#333333",
						textAlign: "center",
					}}>
					Find Your Nearest Clinic
				</Typography>
				<Autocomplete
					onLoad={(ref) => (autocompleteRef.current = ref)}
					onPlaceChanged={handlePlaceChanged}
					sx={{ width: "100%" }}>
					<TextField
						label="Input your location"
						variant="outlined"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={() =>
										setMapCenter({
											lat: mapCenter.lat,
											lng: mapCenter.lng,
										})
									}
									sx={{ color: "#ff9f1c" }} // Search icon color
									aria-label="search location">
									<SearchIcon />
								</IconButton>
							),
						}}
						sx={{
							minWidth: "900px",
							backgroundColor: "#ffffff", // Background color
							borderRadius: "12px",
							boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
							transition: "all 0.3s ease",
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#2ec4b6", // Border color
									borderWidth: "1.5px",
								},
								"&:hover fieldset": {
									borderColor: "#ff9f1c", // Hover border color
								},
								"&.Mui-focused fieldset": {
									borderColor: "#2ec4b6", // Focused border color
								},
							},
							"& .MuiInputLabel-root": {
								color: "#2ec4b6", // Label color
								fontSize: "1rem",
							},
							"& .MuiInputLabel-root.Mui-focused": {
								color: "#2ec4b6", // Focused label color
							},
							"& .MuiOutlinedInput-input": {
								padding: "14px",
								backgroundColor: "#ffffff", // Input background color
							},
							mb: 3,
						}}
					/>
				</Autocomplete>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexGrow: 1,
					gap: 4,
					p: 15,
					paddingTop: 5,
				}}>
				{/* Left Section */}
				<Paper
					elevation={3}
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						padding: 2,
						borderRight: "1px solid #ddd",
						overflowY: "auto",
						borderRadius: "12px",
						backgroundColor: "#ffffff",
						maxHeight: "70vh", // Set maximum height
						// WebKit scrollbar styles (for Chrome, Safari)
						"&::-webkit-scrollbar": {
							width: "8px", // Width of the scrollbar
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: "#f1f1f1", // Color of the track
							borderRadius: "10px", // Rounded corners for the track
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#888", // Color of the scrollbar thumb
							borderRadius: "10px", // Rounded corners for the thumb
						},
						"&::-webkit-scrollbar-thumb:hover": {
							backgroundColor: "#555", // Color on hover
						},
						// Firefox scrollbar styles
						scrollbarWidth: "thin", // Width of the scrollbar
						scrollbarColor: "#888 #f1f1f1", // Thumb color and track color
					}}>
					<Typography
						variant="h6"
						sx={{
							color: "black",
							textAlign: "left",
							color: "#899898",
							borderBottom: "2px solid #a9b4b4", // Simple underline
							pb: 1.5, // Add some padding to separate the text from the underline
						}}>
						Showing your nearest location
					</Typography>

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
						<List>
							{closestClinics.map((clinic, index) => (
								<React.Fragment key={index}>
									<Slide
										direction="up"
										in={true}
										mountOnEnter
										unmountOnExit>
										<ListItem
											button
											onClick={() =>
												handleMarkerClick(clinic)
											}
											sx={{
												mb: 1,
												paddingTop: 1,
												paddingBottom: 5,
												position: "relative",
												borderBottom: "2px solid #a9b4b4", // Simple underline
												"&:last-of-type": {
													borderBottom: "none",
												},
											}}>
											<ListItemText
												sx={{
													p: 1.5,
												}}
												primary={clinic.name}
												secondary={clinic.address}
												primaryTypographyProps={{
													color: "#11c39c",
												}}
												secondaryTypographyProps={{
													color: "#899898",
												}}
											/>
											<Box
												sx={{
													position: "absolute",
													right: 0,
													display: "grid",
													gap: 4, // Smaller gap between elements
													mt: 6, // Reduce margin top for compactness
												}}>
												<a
													href={`/appointment`}
													target="_blank"
													rel="noopener noreferrer"
													style={{
														textDecoration: "none",
													}}>
													<Button
														variant="contained"
														startIcon={<ScheduleIcon />} // Use ScheduleIcon from MUI
														sx={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															backgroundColor: "black",
															color: "#ffffff",
															borderRadius: "6px", // Smaller border radius for tighter corners
															padding: "6px 12px", // Reduced padding for smaller button size
															fontWeight: "bold",
															fontSize: "0.85rem", // Smaller font size
															boxShadow:
																"0 2px 4px rgba(0, 0, 0, 0.1)", // Slightly reduced shadow for compactness
															transition:
																"background-color 0.3s, transform 0.3s", // Smooth transitions
															"&:hover": {
																backgroundColor: "#11c39c", // Different color on hover
																transform:
																	"translateY(-1px)", // Subtle lift effect on hover
															},
														}}>
														Request Appointment
													</Button>
												</a>
												<a
													href={`/clinics/${clinic.id}`}
													target="_blank"
													rel="noopener noreferrer"
													style={{
														textAlign: "right",
														textDecoration: "none",
													}}>
													<Tooltip title="Redirect to Clinic's Site">
														<IconButton
															sx={{
																color: "#2ec4b6",
																padding: "6px", // Reduced padding for smaller icon button size
																"&:hover": {
																	color: "#ff9f1c",
																},
															}}>
															<ArrowForwardIcon />
														</IconButton>
													</Tooltip>
												</a>
											</Box>
										</ListItem>
									</Slide>
								</React.Fragment>
							))}
						</List>
					)}
				</Paper>

				{/* Right Section */}
				<Box
					sx={{
						flex: 2,
						display: "flex",
						flexDirection: "column",
						padding: 2,
					}}>
					<Paper
						elevation={3}
						sx={{
							height: "100%",
							width: "100%",
							borderRadius: "12px",
							overflow: "hidden",
							position: "relative",
						}}>
						{selectedClinic && (
							<Card
								sx={{
									position: "absolute",
									top: 10,
									left: 10,
									zIndex: 10,
									width: "300px",
									backgroundColor: "#ffffff",
									borderRadius: "12px",
									overflow: "hidden", // Ensures the close button doesn't overflow
								}}>
								<CardMedia
									component="img"
									alt="clinic"
									height="140"
									image="https://source.unsplash.com/random/300x200/?clinic"
								/>
								<CardContent>
									{/* Close Button */}
									<IconButton
										onClick={handleCloseModal}
										sx={{
											position: "absolute",
											top: 10,
											right: 10,
											color: "#2ec4b6",
											"&:hover": {
												backgroundColor: "#ffbf69",
											},
										}}>
										<CloseIcon />
									</IconButton>
									<Typography
										variant="h6"
										sx={{
											color: "#2ec4b6",
											mt: 2, // Margin top for spacing
										}}>
										{selectedClinic.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										sx={{ mt: 1 }} // Margin top for spacing
									>
										{selectedClinic.address}
									</Typography>
								</CardContent>
							</Card>
						)}
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
									icon={{
										url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker icon
									}}
								/>
							))}
						</GoogleMap>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default DisplayLocMapColumn;
