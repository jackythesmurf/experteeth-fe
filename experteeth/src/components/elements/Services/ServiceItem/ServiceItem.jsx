import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for the rounded image
const RoundedImage = styled("img")({
	borderRadius: "50%",
	width: "100px",
	height: "100px",
	objectFit: "cover",
	border: "4px solid #B9FBC0", // Mint green border
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

// Container for the service item
const ServiceItemContainer = styled(Box)(({ theme }) => ({
	backgroundColor: "#FFFFFF",
	padding: "16px",
	borderRadius: "12px",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
	textAlign: "center",
	transition: "transform 0.3s ease, box-shadow 0.3s ease",
	"&:hover": {
		transform: "scale(1.02)",
		boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
	},
}));

const ServiceItem = ({ imageSrc, caption }) => {
	return (
		<ServiceItemContainer>
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
		</ServiceItemContainer>
	);
};

export default ServiceItem;
