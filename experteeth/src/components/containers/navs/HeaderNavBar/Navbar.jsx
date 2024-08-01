import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import {
	Menu,
	MenuItem,
	IconButton,
	ListItemText,
	Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Logo from "./logo.png"
function LinkTab(props) {
	return (
		<Tab
			component={Link}
			to={props.to}
			sx={{
				color: "#004d00",
				fontSize: {
					xs: "0.9rem",
					sm: "1.1rem",
					md: "1.2rem",
				},
				flex: 1,
				minWidth: 100,
				"&.Mui-selected": {
					color: "#009688",
				},
				padding: {
					xs: "6px 12px",
					sm: "8px 16px",
					md: "10px 20px",
				},
			}}
			{...props}
		/>
	);
}

LinkTab.propTypes = {
	to: PropTypes.string.isRequired,
};

function Navbar() {
	const location = useLocation();
	const [value, setValue] = React.useState(
		getTabValue(location.pathname)
	);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
		React.useState(null);
	const [mobileSubMenuOpen, setMobileSubMenuOpen] =
		React.useState(false);

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleTreatmentMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMobileMenuClick = (event) => {
		setMobileMenuAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMenuAnchorEl(null);
		setMobileSubMenuOpen(false);
	};

	const handleMobileSubMenuToggle = () => {
		setMobileSubMenuOpen((prevOpen) => !prevOpen);
	};

	React.useEffect(() => {
		setValue(getTabValue(location.pathname));
	}, [location.pathname]);

	const isMobile = window.innerWidth <= 600;

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 16px",
				height: { xs: "56px", sm: "64px", md: "72px" },
				boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
			}}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Avatar
					alt="Logo"
					src={Logo} // Replace with the path to your logo
					sx={{
						width: { xs: 40, sm: 50, md: 54 },
						height: { xs: 40, sm: 50, md: 54 },
						marginRight: {
							xs: "8px",
							sm: "12px",
							md: "16px",
						},
					}}
				/>
				{isMobile ? (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleMobileMenuClick}
						sx={{ padding: "8px" }}>
						<MenuIcon />
					</IconButton>
				) : (
					<Box
						sx={{
							width: "100%",
							maxWidth: "100%",
							overflowX: "auto",
							display: "flex",
							justifyContent: "center",
						}}>
						<Tabs
							value={value}
							onChange={handleTabChange}
							aria-label="nav tabs"
							sx={{
								minWidth: "max-content",
								"& .MuiTabs-indicator": {
									backgroundColor: "#23DCBD",
								},
							}}>
							<LinkTab label="Home" to="/" value={0} />
							<LinkTab
								label="Find a practice"
								to="/find-a-practice"
								value={1}
							/>
							<LinkTab
								label="Dentist Team"
								to="/dentist-team"
								value={2}
							/>
							<Tab
								label="Treatment"
								aria-controls="treatment-menu"
								aria-haspopup="true"
								onClick={handleTreatmentMenuClick}
								sx={{
									color: "#004d00",
									fontSize: {
										xs: "0.9rem",
										sm: "1.1rem",
										md: "1.2rem",
									},
									flex: 1,
									minWidth: 100,
									"&.Mui-selected": {
										color: "#009688",
									},
									padding: {
										xs: "6px 12px",
										sm: "8px 16px",
										md: "10px 20px",
									},
								}}
							/>
						</Tabs>
					</Box>
				)}
			</Box>
			<Menu
				id="treatment-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				PaperProps={{
					sx: {
						width: 300,
						maxWidth: "100%",
						backgroundColor: "#f9f9f9",
					},
				}}
				MenuListProps={{
					sx: {
						padding: 2,
					},
				}}>
				<MenuItem
					component={Link}
					to="/treatment/option2"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
					}}>
					Dental Services
				</MenuItem>
				<MenuItem
					component={Link}
					to="/treatment/option3"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
					}}>
					Cosmetic Dental Services
				</MenuItem>
				<MenuItem
					component={Link}
					to="/treatment/option4"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
					}}>
					Advanced Services
				</MenuItem>
				<MenuItem
					component={Link}
					to="/treatment"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "12px 24px",
						color: "#333333",
						backgroundColor: "#12EDC8",
						"&:hover": {
							transition: 1,
							backgroundColor: "#E1FEFA",
						},
						borderRadius: "4px",
					}}>
					View All Treatments
				</MenuItem>
			</Menu>
			<Menu
				id="mobile-menu"
				anchorEl={mobileMenuAnchorEl}
				open={Boolean(mobileMenuAnchorEl)}
				onClose={handleMobileMenuClose}
				PaperProps={{
					sx: {
						width: 250,
						maxWidth: "100%",
						backgroundColor: "#f9f9f9",
					},
				}}
				MenuListProps={{
					sx: {
						padding: 2,
					},
				}}>
				<MenuItem
					component={Link}
					to="/"
					onClick={handleMobileMenuClose}>
					Home
				</MenuItem>
				<MenuItem
					component={Link}
					to="/find-a-practice"
					onClick={handleMobileMenuClose}>
					Find a practice
				</MenuItem>
				<MenuItem
					component={Link}
					to="/dentist-team"
					onClick={handleMobileMenuClose}>
					Dentist Team
				</MenuItem>
				<MenuItem onClick={handleMobileSubMenuToggle}>
					<ListItemText primary="Treatment" />
					{mobileSubMenuOpen ? (
						<ExpandLessIcon />
					) : (
						<ExpandMoreIcon />
					)}
				</MenuItem>
				{mobileSubMenuOpen && (
					<Box sx={{ pl: 4 }}>
						<MenuItem
							component={Link}
							to="/treatment/option2"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
							}}>
							Dental Services
						</MenuItem>
						<MenuItem
							component={Link}
							to="/treatment/option3"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
							}}>
							Cosmetic Dental Services
						</MenuItem>
						<MenuItem
							component={Link}
							to="/treatment/option4"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
							}}>
							Advanced Services
						</MenuItem>
						<MenuItem
							component={Link}
							to="/treatment"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "12px 24px",
								color: "#333333",
								backgroundColor: "#12EDC8",
								"&:hover": {
									transition: 1,
									backgroundColor: "#E1FEFA",
								},
								borderRadius: "4px",
							}}>
							View All Treatments
						</MenuItem>
					</Box>
				)}
			</Menu>
		</Box>
	);
}

// Helper function to get tab value based on pathname
function getTabValue(pathname) {
	const tabMap = {
		"/": 0,
		"/find-a-practice": 1,
		"/dentist-team": 2,
		"/help-me": 3,
	};

	return tabMap[pathname] ?? false;
}

export default Navbar;
