import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for the rounded image
const RoundedImage = styled("img")({
	borderRadius: "50%",
	width: "100px",
	height: "100px",
	objectFit: "cover",
	border: "0.5px solid #717171",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	display: "block",
	margin: "0 auto", // Center the image
});

const ServiceItem = ({ imageSrc, caption }) => {
	return (
		<div style={{ textAlign: "center" }}>
			<RoundedImage src={imageSrc} alt={caption} />
			<Typography
				variant="body1"
				sx={{
					marginTop: "16px",
					color: "#004D40", // Darker teal for the caption
					fontWeight: "bold",
				}}>
				{caption}
			</Typography>
		</div>
	);
};

export default ServiceItem;
