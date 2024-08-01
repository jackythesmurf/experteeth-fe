import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
	Link,
	useLocation,
	useNavigate,
} from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import HealingIcon from "@mui/icons-material/Healing";
import Logo from "./logo.png";

function LinkTab(props) {
	return (
		<Tab
			component={Link}
			to={props.to}
			icon={props.icon}
			iconPosition="start"
			sx={{
				color: "#004d40",
				fontSize: {
					xs: "0.9rem",
					sm: "1.1rem",
					md: "1.2rem",
				},
				flex: 1,
				minWidth: 100,
				"&.Mui-selected": {
					color: "#00C853", // Mint Green for selected state
				},
				padding: {
					xs: "6px 12px",
					sm: "8px 16px",
					md: "10px 20px",
				},
				transition: "color 0.3s ease",
				"&:hover": {
					color: "#00C853", // Mint Green for hover state
				},
			}}
			{...props}
		/>
	);
}

LinkTab.propTypes = {
	to: PropTypes.string.isRequired,
	icon: PropTypes.element,
};

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
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
				background: "#ffffff", // White background
			}}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Avatar
					alt="Logo"
					src={Logo}
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
			</Box>
			{isMobile ? (
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={handleMobileMenuClick}
					sx={{ padding: "8px" }}>
					<MenuIcon sx={{ color: "#004d40" }} />
				</IconButton>
			) : (
				<Box
					sx={{
						width: "100%",
						maxWidth: "100%",
						overflowX: "auto",
						display: "flex",
						justifyContent: "flex-end",
					}}>
					<Tabs
						value={value}
						onChange={handleTabChange}
						aria-label="nav tabs"
						sx={{
							minWidth: "max-content",
							"& .MuiTabs-indicator": {
								backgroundColor: "#00C853", // Mint Green indicator
							},
						}}>
						<LinkTab
							icon={<HomeIcon />}
							label="Home"
							to="/"
							value={0}
						/>
						<LinkTab
							icon={<SearchIcon />}
							label="Find a Practice"
							to="/find-a-practice"
							value={1}
						/>
						<LinkTab
							icon={<PeopleIcon />}
							label="Dentist Team"
							to="/dentist-team"
							value={2}
						/>
						<Tab
							icon={<HealingIcon />}
							label="Treatment"
							onClick={handleTreatmentMenuClick}
							sx={{
								color: "#004d40",
								fontSize: {
									xs: "0.9rem",
									sm: "1.1rem",
									md: "1.2rem",
								},
								flex: 1,
								minWidth: 100,
								"&.Mui-selected": {
									color: "#00C853",
								},
								padding: {
									xs: "6px 12px",
									sm: "8px 16px",
									md: "10px 20px",
								},
								transition: "color 0.3s ease",
								"&:hover": {
									color: "#00C853",
								},
							}}
							value={3}
						/>
					</Tabs>
				</Box>
			)}
			<Menu
				id="treatment-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				PaperProps={{
					sx: {
						width: 300,
						maxWidth: "100%",
						backgroundColor: "#e0f7fa", // Light blue background
					},
				}}
				MenuListProps={{
					sx: {
						padding: 2,
					},
				}}>
				<MenuItem
					component={Link}
					to="/treatment#option2"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
						"&:hover": {
							backgroundColor: "#b2ebf2", // Light blue on hover
						},
					}}>
					Dental Services
				</MenuItem>
				<MenuItem
					component={Link}
					to="/treatment#option3"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
						"&:hover": {
							backgroundColor: "#b2ebf2",
						},
					}}>
					Cosmetic Dental Services
				</MenuItem>
				<MenuItem
					component={Link}
					to="/treatment#option4"
					onClick={handleClose}
					sx={{
						fontSize: "1.1rem",
						padding: "10px 20px",
						"&:hover": {
							backgroundColor: "#b2ebf2",
						},
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
						color: "#004d40",
						backgroundColor: "#80deea", // Lighter mint green
						"&:hover": {
							transition: 1,
							backgroundColor: "#4dd0e1", // Darker mint green on hover
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
						backgroundColor: "#e0f7fa", // Light blue background
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
					<HomeIcon sx={{ mr: 1 }} />
					Home
				</MenuItem>
				<MenuItem
					component={Link}
					to="/find-a-practice"
					onClick={handleMobileMenuClose}>
					<SearchIcon sx={{ mr: 1 }} />
					Find a Practice
				</MenuItem>
				<MenuItem
					component={Link}
					to="/dentist-team"
					onClick={handleMobileMenuClose}>
					<PeopleIcon sx={{ mr: 1 }} />
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
							to="/treatment#option2"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
								"&:hover": {
									backgroundColor: "#b2ebf2",
								},
							}}>
							Dental Services
						</MenuItem>
						<MenuItem
							component={Link}
							to="/treatment#option3"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
								"&:hover": {
									backgroundColor: "#b2ebf2",
								},
							}}>
							Cosmetic Dental Services
						</MenuItem>
						<MenuItem
							component={Link}
							to="/treatment#option4"
							onClick={handleMobileMenuClose}
							sx={{
								fontSize: "1rem",
								padding: "10px 20px",
								"&:hover": {
									backgroundColor: "#b2ebf2",
								},
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
								color: "#004d40",
								backgroundColor: "#80deea",
								"&:hover": {
									transition: 1,
									backgroundColor: "#4dd0e1",
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
		"/treatment": 3,
	};

	return tabMap[pathname] ?? false;
}

export default Navbar;
