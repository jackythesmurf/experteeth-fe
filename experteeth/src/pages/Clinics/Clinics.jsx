import React from "react";
import { useParams } from "react-router-dom";
import clinics from "./clinics.json";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Paper,
	Grid,
	CardContent,
	Container,
	Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import ClinicImage from "./clinic.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentIcon from "@mui/icons-material/Comment";
import ServiceGrid from "../../components/containers/grid/AllServiceGrid/ServiceGrid";
import staticMapUrl from "./map.png";

const StyledAppBar = styled(AppBar)({
	backgroundColor: "#2ec4b6",
	boxShadow: "none",
	borderBottom: "2px solid #11c39c",
});

const HeroBox = styled(Box)({
	position: "relative",
	height: "50vh",
	backgroundImage: `url(${ClinicImage})`,
	backgroundSize: "cover",
	backgroundPosition: "center",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	alignItems: "flex-start",
	textAlign: "left",
	paddingBottom: "20px",
	paddingLeft: "20vw",
	"&::after": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background:
			"linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
		zIndex: 1, // Gradient is below the content
	},
});

const HeroContent = styled(Box)({
	position: "relative",
	zIndex: 2, // Content is above the gradient
	color: "white", // Ensure text is white
});

const ContactButton = styled(Button)({
	backgroundColor: "#000000",
	color: "#fff",
	padding: "12px 20px",
	borderRadius: "4px",
	transition: "background-color 0.3s",
	"&:hover": {
		backgroundColor: "#2ec4b6",
	},
});

const IconWrapper = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "12px",
	marginBottom: "10px",
});

// Utility function to get a cookie by name
const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2)
		return parts.pop().split(";").shift();
	return null;
};

const Clinics = () => {
	const { identifier } = useParams();
	const clinic = clinics.find(
		(clinic) =>
			clinic.id.toLowerCase().replace(/\s+/g, "-") ===
			identifier
	);

	// Check if the user is an admin
	const isAdmin = getCookie("userType") === "admin";

	if (!clinic) {
		return <div>Clinic not found</div>;
	}

	return (
		<Box sx={{ flexGrow: 1, backgroundColor: "#f9f9f9" }}>
			<StyledAppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "bold" }}>
						{clinic.name}
					</Typography>
				</Toolbar>
			</StyledAppBar>
			<HeroBox>
				<HeroContent>
					<Typography
						variant="h5"
						sx={{
							fontWeight: "bold",
							color: "#44e7ba",
							textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
						}}>
						{clinic.address}
					</Typography>
					<Typography
						variant="h4"
						sx={{
							my: 1,
							fontSize: "1.75rem",
							textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
						}}>
						{clinic.name}
					</Typography>

					<Box
						sx={{ display: "flex", alignItems: "center" }}>
						<LocationOnIcon sx={{ mr: 1 }} />
						<Typography variant="subtitle1">
							Open Monday 8:00am to 6:00pm
						</Typography>
					</Box>
				</HeroContent>
			</HeroBox>
			<Container sx={{ paddingY: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<CardContent>
							<Typography
								variant="h4"
								gutterBottom
								sx={{
									color: "#2ec4b6",
									fontWeight: "bold",
									mb: 2,
									position: "relative",
									"&::after": {
										content: '""',
										position: "absolute",
										left: 0,
										bottom: -4,
										width: "100%",
										height: "2px",
										backgroundColor: "#2ec4b6",
									},
								}}>
								About Us
							</Typography>
							<Typography
								variant="body1"
								paragraph
								sx={{ color: "#555" }}>
								Established in 1993, Maven Dental Greenwood
								has three decades of history supporting the
								local community. Don't let the age fool you
								though – your local clinic is far from
								dated; walking through the doors you will
								find an elegant dental facility equipped
								with the latest technology.
							</Typography>
							<IconWrapper>
								<LocationOnIcon color="action" />
								<Typography variant="body1">
									<strong>Address:</strong> {clinic.address}
								</Typography>
							</IconWrapper>
							<IconWrapper>
								<PhoneIcon color="action" />
								<Typography variant="body1">
									<strong>Phone:</strong> {clinic.phone}
								</Typography>
							</IconWrapper>
							<IconWrapper>
								<AccessTimeIcon color="action" />
								<Typography variant="body1">
									<strong>Hours:</strong> {clinic.hours}
								</Typography>
							</IconWrapper>
							<IconWrapper>
								<CommentIcon color="action" />
								<Typography variant="body1">
									<strong>Comment:</strong> {clinic.comment}
								</Typography>
							</IconWrapper>
							{/* Render Edit Button if user is admin */}
							{isAdmin && (
								<Button
									variant="outlined"
									sx={{
										mt: 2,
										borderColor: "#2ec4b6",
										color: "#2ec4b6",
										"&:hover": {
											borderColor: "#44e7ba",
											color: "#44e7ba",
										},
									}}
									onClick={() => {
										// Logic for editing content
										alert(
											"Edit functionality coming soon!"
										);
									}}>
									Edit Details
								</Button>
							)}
						</CardContent>
					</Grid>

					<Grid item xs={12} md={4}>
						<Paper
							elevation={0}
							sx={{
								padding: 3,
								backgroundColor: "#ffffff",
								borderRadius: 2,
								textAlign: "center",
								boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
							}}>
							<ContactButton
								variant="contained"
								onClick={() =>
									window.open("/appointment", "_blank")
								}>
								Book Online
							</ContactButton>
							<Typography
								variant="button"
								display="block"
								gutterBottom
								sx={{ color: "#2ec4b6", mt: 3 }}>
								Contact Us
							</Typography>
							<Typography variant="body2">
								{clinic.phone}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			<Box
				sx={{
					width: "80%",
					margin: "0 auto",
					paddingY: 4,
					backgroundColor: "#f9f9f9",
					borderTop: "1px solid #cccccc",
					textAlign: "center",
				}}>
				<ServiceGrid
					sx={{ backgroundColor: "#c9f8eb" }}></ServiceGrid>
			</Box>
			<Box
				sx={{
					width: "80%",
					margin: "0 auto",
					paddingY: 4,
					backgroundColor: "#f9f9f9",
					textAlign: "center",
				}}>
				<Box
					sx={{
						width: "80%",
						margin: "0 auto",
						paddingY: 4,
						backgroundColor: "#f9f9f9",
						borderTop: "1px solid #cccccc",
					}}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							gap: 4,
						}}>
						<Box
							sx={{
								flex: "0 0 25%",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								gap: 2,
								px: 2,
							}}>
							<Typography
								variant="h5"
								sx={{
									color: "#2ec4b6",
									mb: 2,
									fontWeight: "bold",
									textAlign: "left",
									textTransform: "uppercase",
									letterSpacing: "1px",
									fontFamily: "'Roboto', sans-serif",
									borderBottom: "2px solid #2ec4b6",
									paddingBottom: "8px",
								}}>
								Visit Us:
							</Typography>

							<Chip
								label={clinic.address}
								icon={<LocationOnIcon fontSize="medium" />}
								sx={{
									mb: 2,
									bgcolor: "#f1f1f1",
									color: "#000",
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
									fontSize: "1rem",
									padding: "10px 16px",
								}}
							/>
						</Box>

						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								width: "100%",
							}}>
							<Box
								sx={{
									flex: "1",
									overflow: "hidden",
									borderRadius: "12px",
									border:
										"1px solid rgba(255, 255, 255, 0.2)",
									backdropFilter: "blur(10px)",
									background: "rgba(255, 255, 255, 0.1)",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									transition: "transform 0.3s ease",
									maxHeight: "40vh",
									maxWidth: "40vw",
								}}>
								<img
									src={staticMapUrl}
									alt={`Map of ${clinic.address}`}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block",
									}}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Clinics;
