import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const locations = [
	{ id: 1, title: "Brisbane" },
	{ id: 2, title: "Melbourne" },
	{ id: 3, title: "Perth" },
	{ id: 4, title: "Sydney" },
	{ id: 5, title: "Adelaide" },
];

const AllLocationsGrid = () => {
	return (
		<Grid container spacing={2}>
			{locations.map((location) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={location.id}
					sx={{ display: "flex", justifyContent: "center" }} // Center the grid item
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row-reverse", // Move icon to the right
							alignItems: "center",
							height: "60px", // Shorter height
							backgroundColor: "#46BBA9",
							borderRadius: "0px", // No rounded corners
							padding: "12px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							maxWidth: "160px",
							width: "100%",
							boxSizing: "border-box", // Ensure padding and border are included in the box's total width
						}}>
						<LocationOnIcon
							sx={{
								fontSize: "36px", // Adjusted icon size
								color: "#FFFFFF",
								ml: 2, // Margin-left instead of margin-right
							}}
						/>
						<Typography
							variant="body2" // Appropriate text variant for smaller box
							sx={{
								color: "#FFFFFF",
								fontWeight: "bold",
								fontFamily: '"Metropolis", sans-serif', // Change font to Metropolis
							}}>
							{location.title}
						</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

export default AllLocationsGrid;
