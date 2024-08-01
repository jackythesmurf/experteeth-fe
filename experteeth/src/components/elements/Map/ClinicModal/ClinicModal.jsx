import React from "react";
import {
	Modal,
	Box,
	Typography,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ClinicModal = ({ clinic, open, onClose }) => {
	if (!clinic) return null;

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="clinic-modal-title"
			aria-describedby="clinic-modal-description"
			closeAfterTransition
			BackdropProps={{
				timeout: 500,
			}}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: { xs: "90%", sm: 400 },
					bgcolor: "background.paper",
					borderRadius: 2,
					boxShadow: 24,
					p: 4,
					outline: "none",
					background:
						"linear-gradient(135deg, #ECE9E6 0%, #FFFFFF 100%)",
					transition: "all 0.3s ease-in-out",
				}}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 2,
					}}>
					<Typography
						id="clinic-modal-title"
						variant="h6"
						component="h2"
						sx={{
							fontWeight: "bold",
							fontFamily: "Roboto, sans-serif",
						}}>
						{clinic.name}
					</Typography>
					<IconButton
						onClick={onClose}
						sx={{ color: "#000" }}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Typography
					id="clinic-modal-description"
					sx={{
						mt: 2,
						fontSize: 16,
						color: "rgba(0, 0, 0, 0.7)",
						fontFamily: "Roboto, sans-serif",
					}}>
					{clinic.address}
				</Typography>
				<Typography
					sx={{
						mt: 1,
						fontSize: 14,
						color: "rgba(0, 0, 0, 0.6)",
						fontFamily: "Roboto, sans-serif",
					}}>
					{clinic.phone}
				</Typography>
				<Typography
					sx={{
						mt: 1,
						fontSize: 14,
						color: "rgba(0, 0, 0, 0.6)",
						fontFamily: "Roboto, sans-serif",
					}}>
					{clinic.hours}
				</Typography>
				<Typography
					sx={{
						mt: 1,
						fontSize: 14,
						color: "rgba(0, 0, 0, 0.6)",
						fontFamily: "Roboto, sans-serif",
					}}>
					{clinic.comment}
				</Typography>
			</Box>
		</Modal>
	);
};

export default ClinicModal;
