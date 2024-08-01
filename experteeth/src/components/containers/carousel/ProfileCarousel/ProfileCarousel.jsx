import React from "react";
import Slider from "react-slick";
import {
	Box,
	Typography,
	Button,
	Paper,
} from "@mui/material";
import {
	ArrowForward,
	ArrowBack,
} from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfileCarousel = () => {
	// Sample profiles
	const profiles = [
		{
			id: 1,
			imageSrc:
				"https://via.placeholder.com/120?text=Dentist+1",
			caption: "Dr. John Doe",
		},
		{
			id: 2,
			imageSrc:
				"https://via.placeholder.com/120?text=Dentist+2",
			caption: "Dr. Jane Smith",
		},
		{
			id: 3,
			imageSrc:
				"https://via.placeholder.com/120?text=Dentist+3",
			caption: "Dr. Michael Brown",
		},
		{
			id: 4,
			imageSrc:
				"https://via.placeholder.com/120?text=Dentist+4",
			caption: "Dr. Emily Davis",
		},
		{
			id: 5,
			imageSrc:
				"https://via.placeholder.com/120?text=Dentist+5",
			caption: "Dr. Sarah Wilson",
		},
	];

	// Slick carousel settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: (
			<ArrowForward
				sx={{
					color: "#00FFCC", // Neon mint green
					"&:hover": {
						color: "#00CC99", // Darker mint green on hover
					},
					position: "absolute",
					right: "-40px", // Positioned outside the Box
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 1,
				}}
				fontSize="large"
			/>
		),
		prevArrow: (
			<ArrowBack
				sx={{
					color: "#00FFCC", // Neon mint green
					"&:hover": {
						color: "#00CC99", // Darker mint green on hover
					},
					position: "absolute",
					left: "-40px", // Positioned outside the Box
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 1,
				}}
				fontSize="large"
			/>
		),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Box
			sx={{
				position: "relative",
				padding: "40px",
				borderRadius: "16px",
				boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
				maxWidth: "1200px",
				margin: "auto",
				textAlign: "center",
				backgroundColor: "#F9F9F9", // Light grey background
				overflow: "hidden", // Ensure content does not overlap outside the Box
				paddingRight: "80px", // Create space for the right arrow
				paddingLeft: "80px", // Create space for the left arrow
			}}>
			<Typography
				variant="h4"
				sx={{
					marginBottom: "32px",
					color: "#333333", // Dark grey for the title
					fontWeight: "bold",
				}}>
				Our Dental Professionals
			</Typography>
			<Box
				sx={{
					position: "relative",
					"& .slick-slide": {
						padding: "0 10px", // Adjust spacing between slides
					},
				}}>
				<Slider {...settings}>
					{profiles.map((profile) => (
						<Paper
							key={profile.id}
							sx={{
								marginBottom: "20px",
								padding: "24px",
								textAlign: "center",
								boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
								borderRadius: "16px",
								backgroundColor: "#FFFFFF",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								transition:
									"transform 0.3s, box-shadow 0.3s",
								"&:hover": {
									transform: "scale(1.05)",
									boxShadow:
										"0 8px 16px rgba(0, 0, 0, 0.2)",
								},
							}}>
							<img
								src={profile.imageSrc}
								alt={profile.caption}
								style={{
									borderRadius: "50%",
									width: "140px",
									height: "140px",
									objectFit: "cover",
									marginBottom: "16px",
								}}
							/>
							<Typography
								variant="body1"
								sx={{
									color: "#333333", // Dark grey for the caption
									fontWeight: "bold",
									marginBottom: "8px",
								}}>
								{profile.caption}
							</Typography>
						</Paper>
					))}
				</Slider>
			</Box>
			<Typography
				variant="body2"
				sx={{
					fontSize: "20px",
					marginTop: "50px",
					marginBottom: "32px",
					color: "#666666", // Medium grey for the text
					lineHeight: 3, // Improved line spacing
					textAlign: "left", // Align text to the left for better readability
				}}>
				sdfsdfdsfds sdf sdfsd fsd fsd fdsf sdf sd fsd fsd
				fsd f sd f sd f sd f sd f sd sdfdsf
			</Typography>
			<Button
				variant="contained"
				color="primary"
				sx={{
					backgroundColor: "#00FFCC", // Mint green color
					"&:hover": {
						backgroundColor: "#00CC99", // Darker mint green on hover
					},
				}}>
				View All
			</Button>
		</Box>
	);
};

export default ProfileCarousel;
