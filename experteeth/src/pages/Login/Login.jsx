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
import Cookies from "js-cookie";

// Mock user data for validation
const mockUserData = {
	username: "testuser",
	password: "password123",
	userType: "admin", // Example user type
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
				// Set user type in cookies securely
				Cookies.set("userType", mockUserData.userType, {
					expires: 1, // 1 day
					secure: true,
					sameSite: "Strict",
				});

				// Open the LoginSuccess component in a new tab
				const newTab = window.open("", "_blank");
				newTab.document.write(
					"<h1>Login Success</h1><p>You are now logged in as an admin.</p>"
				);
				newTab.document.title = "Login Success";

				// Optionally, you could redirect to a route handled by your application in a new tab
				// newTab.location.href = '/login-success'; // Ensure this path is routed to render the success message
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
