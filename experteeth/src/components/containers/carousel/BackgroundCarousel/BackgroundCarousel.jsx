import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing local images
import image1 from "../../../../assets/images/dentist-bg.jpg";

const BackgroundCarousel = () => {
	// Array of imported image URLs
	const images = [image1, image1, image1];

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "500px",
				overflow: "hidden", // Ensures no overflow
				position: "relative", // Ensures correct positioning of children
			}}>
			<Slider {...settings}>
				{images.map((image, index) => (
					<div
						key={index}
						style={{
							position: "relative",
							height: "100%",
						}}>
						<img
							src={image}
							alt={`Slide ${index}`}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover", // Ensures image covers the container
								display: "block", // Removes unwanted spacing below the image
							}}
						/>
					</div>
				))}
			</Slider>
		</Box>
	);
};

export default BackgroundCarousel;
