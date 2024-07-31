import React, { useState } from "react";
import {
	Autocomplete,
	TextField,
	Box,
	Paper,
} from "@mui/material";

// Predefined list of locations
const locationSuggestions = [
	"Chatswood 2067",
	"Sydney 2000",
	"Burwood 2134",
	"Mascot 2020",
	// Add more predefined locations if needed
];

const SearchBar = () => {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState(
		locationSuggestions
	);

	// Filter the options based on user input
	const handleInputChange = (event, value) => {
		setInputValue(value);
		// Update options based on user input
		setOptions(
			locationSuggestions.filter((location) =>
				location.toLowerCase().includes(value.toLowerCase())
			)
		);
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "600px",
				margin: "auto",
				padding: "16px",
			}}>
			<Autocomplete
				freeSolo
				disableClearable
				options={options}
				value={inputValue}
				onInputChange={handleInputChange}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Enter a suburb or postcode"
						variant="outlined"
						fullWidth
						InputProps={{
							...params.InputProps,
							endAdornment: null, // Optional: add a clear button or icon
						}}
					/>
				)}
				PaperComponent={(props) => (
					<Paper
						{...props}
						sx={{ maxHeight: "300px", overflow: "auto" }}
					/>
				)}
			/>
		</Box>
	);
};

export default SearchBar;
