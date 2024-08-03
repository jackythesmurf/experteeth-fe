import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

// Mock user data for validation
const mockUserData = {
	username: "testuser",
	password: "password123",
	userType: "admin", // Example user type
};

// Function to set a cookie
const setCookie = (name, value, days) => {
	const expires = new Date();
	expires.setTime(
		expires.getTime() + days * 24 * 60 * 60 * 1000
	);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		username: "",
		password: "",
	});

	const handleValidation = () => {
		let formIsValid = true;
		let errors = {};

		if (!username) {
			formIsValid = false;
			errors["username"] = "Username cannot be empty";
		}

		if (!password) {
			formIsValid = false;
			errors["password"] = "Password cannot be empty";
		}

		setErrors(errors);
		return formIsValid;
	};

	const handleLogin = () => {
		if (handleValidation()) {
			if (
				username === mockUserData.username &&
				password === mockUserData.password
			) {
				// Set user type in cookies
				setCookie("userType", mockUserData.userType, 7); // Cookie expires in 7 days

				// Redirect to a new tab
				window.open("/dashboard", "_blank");
			} else {
				alert("Invalid username or password");
			}
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				mt: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "#f1f1f1",
				borderRadius: 2,
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				padding: 4,
			}}>
			<Typography
				variant="h4"
				sx={{ mb: 4, color: "#000" }}>
				LOGIN
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: 500,
					mb: 2,
				}}>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-end",
						mb: 3,
					}}>
					<AccountCircleIcon
						sx={{ color: "#555", mr: 1, my: 2 }}
					/>
					<TextField
						fullWidth
						variant="outlined"
						label="User Name"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={handleKeyDown}
						error={!!errors.username}
						helperText={errors.username}
						InputLabelProps={{
							style: { color: "#555" },
						}}
						InputProps={{
							style: { color: "#000" },
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#ccc", // Default border color
								},
								"&:hover fieldset": {
									borderColor: "#11c39c", // Green border on hover
								},
								"&.Mui-focused fieldset": {
									borderColor: "#11c39c", // Green border when focused
								},
							},
							input: {
								color: "#000",
								backgroundColor: "#f8fdfb", // Light background color
							},
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-end",
						mb: 3,
					}}>
					<LockIcon sx={{ color: "#555", mr: 1, my: 2 }} />
					<TextField
						fullWidth
						variant="outlined"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={handleKeyDown}
						error={!!errors.password}
						helperText={errors.password}
						sx={{
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#ccc", // Default border color
								},
								"&:hover fieldset": {
									borderColor: "#11c39c", // Green border on hover
								},
								"&.Mui-focused fieldset": {
									borderColor: "#11c39c", // Green border when focused
								},
							},
							input: {
								color: "#000",
								backgroundColor: "#f7fcfb", // Light background color
							},
						}}
						InputLabelProps={{
							style: { color: "#555" },
						}}
						InputProps={{
							style: { color: "#000" },
						}}
					/>
				</Box>
			</Box>
			<Button
				variant="contained"
				fullWidth
				onClick={handleLogin}
				sx={{
					backgroundColor: "#031a15",
					"&:hover": { backgroundColor: "#11c39c" },
					py: 1.5,
					mt: 2,
					fontSize: "1rem",
				}}>
				Login
			</Button>
			<Typography
				sx={{ mt: 2, color: "#11c39c", cursor: "pointer" }}
				onClick={() => alert("Reset password!")}>
				Forgot your password?
			</Typography>
		</Container>
	);
};

export default Login;
