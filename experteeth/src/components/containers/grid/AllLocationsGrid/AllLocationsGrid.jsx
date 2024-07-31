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
			{" "}
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
							flexDirection: "row",
							alignItems: "center",
							height: "100px",
							backgroundColor: "#23E9B6",
							borderRadius: "8px",
							padding: "16px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							maxWidth: "200px",
							width: "100%",
							boxSizing: "border-box", // Ensure padding and border are included in the box's total width
						}}>
						<LocationOnIcon
							sx={{
								fontSize: "48px",
								color: "#DFFFF5",
								mr: 2,
							}}
						/>
						<Typography
							variant="body1"
							sx={{
								color: "#DFFFF5",
								fontWeight: "bold",
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
