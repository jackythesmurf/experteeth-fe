import React from "react";
import {
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	CardMedia,
} from "@mui/material";

const GeneralInformationColumn = () => {
	// Sample data for the columns
	const columns = [
		{
			id: 1,
			title: "Column 1 Title",
			imageSrc:
				"https://via.placeholder.com/400x200?text=Image+1",
			text: "This is some text for column 1. It provides general information about the topic covered in this column.",
		},
		{
			id: 2,
			title: "Column 2 Title",
			imageSrc:
				"https://via.placeholder.com/400x200?text=Image+2",
			text: "This is some text for column 2. It provides general information about the topic covered in this column.",
		},
		{
			id: 3,
			title: "Column 3 Title",
			imageSrc:
				"https://via.placeholder.com/400x200?text=Image+3",
			text: "This is some text for column 3. It provides general information about the topic covered in this column.",
		},
	];

	return (
		<Box
			sx={{
				padding: "40px",
				textAlign: "center",
				backgroundColor: "#F9F9F9",
			}}>
			<Typography
				variant="h4"
				sx={{
					marginBottom: "32px",
					color: "#333333",
					fontWeight: "bold",
				}}>
				General Information
			</Typography>
			<Grid container spacing={4}>
				{columns.map((column) => (
					<Grid item xs={12} md={4} key={column.id}>
						<Card
							sx={{
								display: "flex",
								flexDirection: "column",
								height: "100%",
							}}>
							<CardMedia
								component="img"
								height="200"
								image={column.imageSrc}
								alt={column.title}
								sx={{ objectFit: "cover" }}
							/>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography
									variant="h6"
									sx={{
										marginBottom: "16px",
										fontWeight: "bold",
									}}>
									{column.title}
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: "#666666" }}>
									{column.text}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default GeneralInformationColumn;
