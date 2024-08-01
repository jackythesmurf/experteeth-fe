import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import ServiceItem from "../../../elements/Services/ServiceItem/ServiceItem";

const services = [
	{
		id: 1,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Dental Check-Up & X-Rays",
	},
	{
		id: 2,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Children's Dentistry",
	},
	{
		id: 3,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service Teeth Whitening",
	},
	{
		id: 4,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Invisalign",
	},
	{
		id: 5,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Dental Implants",
	},
	{
		id: 6,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Veneers",
	},
	{
		id: 7,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Hygiene Services",
	},
	{
		id: 8,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Wisdom Tooth Removal",
	},
	{
		id: 9,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Root Canals",
	},
	{
		id: 10,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Fillings",
	},
];

const ServiceGrid = () => {
	return (
		<Box
			sx={{
				padding: "40px",
				textAlign: "center",
				maxWidth: "1400px",
				margin: "auto",
			}}>
			<Typography
				variant="h4"
				sx={{
					marginBottom: "24px",
					color: "#004D40", // Darker teal for the title
					fontWeight: "bold",
				}}>
				OUR DENTAL SERVICES
			</Typography>
			<Grid container columnSpacing={0.5} rowSpacing={5}>
				{services.map((service) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={2.4}
						key={service.id}>
						<ServiceItem
							imageSrc={service.imageSrc}
							caption={service.caption}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ServiceGrid;
