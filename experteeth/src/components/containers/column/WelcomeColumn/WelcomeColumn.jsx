import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import AllLocationsGrid from "../../grid/AllLocationsGrid/AllLocationsGrid";
import SearchBar from "../../../elements/Search/SearchBar/SearchBar";

const WelcomeColumn = () => {
	return (
		<Box
			sx={{
				position: "relative", // Set position relative for overlapping
				background:
					"linear-gradient(135deg, #E0F2F1, #B9FBC0)", // Gradient background for a modern touch
				padding: "40px",
				borderRadius: "12px",
				boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
				maxWidth: "1500px",
				margin: "auto",
				mt: "-80px", // Negative margin to overlap with the component above
				zIndex: 10, // Ensure it overlaps the BackgroundCarousel
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Typography
				variant="h3"
				sx={{
					textAlign: "center",
					color: "#004D40", // Darker teal for text
					mb: "32px",
					fontWeight: "bold",
					fontFamily: '"Roboto", sans-serif',
				}}>
				Discover Your Location
			</Typography>
			<Grid container spacing={4}>
				<Grid item xs={12} md={5}>
					<Box
						sx={{
							backgroundColor: "#FFFFFF",
							padding: "24px",
							borderRadius: "12px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
							maxWidth: "100%",
							mx: "auto",
							transition:
								"transform 0.3s ease, box-shadow 0.3s ease",
							"&:hover": {
								transform: "scale(1.02)",
								boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
							},
						}}>
						<SearchBar />
					</Box>
				</Grid>
				<Grid item xs={12} md={7}>
					<Box
						sx={{
							backgroundColor: "#FFFFFF",
							padding: "24px",
							borderRadius: "12px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
							maxWidth: "100%",
							mx: "auto",
							transition:
								"transform 0.3s ease, box-shadow 0.3s ease",
							"&:hover": {
								transform: "scale(1.02)",
								boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
							},
						}}>
						<AllLocationsGrid />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default WelcomeColumn;
