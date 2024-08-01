import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TreatmentColumn = () => {
	return (
		<Box
			sx={{
				width: "250px",
				padding: "16px",
				backgroundColor: "#f5f5f5",
				borderRadius: "8px",
				boxShadow: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "12px",
			}}>
			<Typography variant="h6" component="h2">
				Our Services
			</Typography>
			<Button
				variant="contained"
				color="primary"
				href="#dental"
				sx={{ width: "100%", justifyContent: "start" }}>
				Dental
			</Button>
			<Button
				variant="contained"
				color="secondary"
				href="#cosmetic"
				sx={{ width: "100%", justifyContent: "start" }}>
				Cosmetic
			</Button>
			<Button
				variant="contained"
				color="success"
				href="#advanced"
				sx={{ width: "100%", justifyContent: "start" }}>
				Advanced
			</Button>
		</Box>
	);
};

export default TreatmentColumn;
