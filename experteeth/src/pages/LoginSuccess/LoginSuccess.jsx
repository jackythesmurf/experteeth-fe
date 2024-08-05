import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Container, Typography, Box } from "@mui/material";

const LoginSuccess = () => {
	useEffect(() => {
		// Set user type in cookies securely
		Cookies.set("userType", "admin", {
			expires: 1, // 1 day
			secure: true,
			sameSite: "Strict",
		});
	}, []);

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
				textAlign: "center",
			}}>
			<Typography
				variant="h4"
				sx={{ mb: 4, color: "#000" }}>
				Login Success
			</Typography>
			<Box sx={{ mb: 2 }}>
				<Typography variant="body1" sx={{ color: "#000" }}>
					You are now logged in as an admin.
				</Typography>
			</Box>
		</Container>
	);
};

export default LoginSuccess;
