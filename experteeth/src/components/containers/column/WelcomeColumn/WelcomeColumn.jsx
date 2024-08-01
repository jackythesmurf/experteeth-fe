import React from "react";
import { Grid, Typography } from "@mui/material";
import AllLocationsGrid from "../../grid/AllLocationsGrid/AllLocationsGrid";
import SearchBar from "../../../elements/Search/SearchBar/SearchBar";

const WelcomeColumn = () => {
	return (
		<Grid
			container
			spacing={2}
			sx={{
				position: "relative",
				background: "#C6E2F7",
				padding: "20px 10px",
				borderRadius: "0",
				boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
				maxWidth: "1200px",
				margin: "auto",
				mt: "-20px",
				zIndex: 10,
				alignItems: "center",
				textAlign: "center",
				fontFamily: "Metropolis",
			}}>
			<Grid item xs={12} md={6}>
				<Typography
					variant="h5"
					sx={{
						color: "#116089",
						mb: "8px",
						fontWeight: "bold",
					}}>
					FIND A PRACTICE NEAR YOU...
				</Typography>
				{/* Removed Box, directly inserting SearchBar */}
				<SearchBar
					sx={{
						width: "100%", // Adjust width as necessary
					}}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography
					variant="h5"
					sx={{
						color: "#116089",
						mb: "8px",
						fontWeight: "bold",
					}}>
					BROWSE OUR PRACTICE LOCATIONS IN...
				</Typography>
				{/* Removed Box, directly using AllLocationsGrid */}
				<AllLocationsGrid />
			</Grid>
		</Grid>
	);
};

export default WelcomeColumn;
