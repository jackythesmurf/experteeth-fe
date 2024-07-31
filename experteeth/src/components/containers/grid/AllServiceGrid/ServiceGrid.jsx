import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import ServiceItem from "../../../elements/Services/ServiceItem/ServiceItem";
const services = [
	{
		id: 1,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 1",
	},
	{
		id: 2,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 2",
	},
	{
		id: 3,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 3",
	},
	{
		id: 4,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 4",
	},
	{
		id: 5,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 5",
	},
	{
		id: 6,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 6",
	},
	{
		id: 7,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 7",
	},
	{
		id: 8,
		imageSrc:
			"https://static.vecteezy.com/system/resources/previews/016/326/827/non_2x/3d-dental-teeth-isolated-on-transparent-background-free-png.png",
		caption: "Service 8",
	},
];

const ServiceGrid = () => {
	return (
		<Box
			sx={{
				padding: "40px",
				borderRadius: "12px",
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
				Our Dental Services
			</Typography>
			<Grid container spacing={1}>
				{services.map((service) => (
					<Grid item xs={12} sm={6} md={4} key={service.id}>
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
