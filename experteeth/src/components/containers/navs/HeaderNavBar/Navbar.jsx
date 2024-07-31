import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";

function LinkTab(props) {
	return (
		<Tab
			component={Link}
			to={props.to}
			sx={{
				color: "#004d00",
				fontSize: "1.2rem",
				flex: 1,
				minWidth: 250,
				"&.Mui-selected": {
					color: "#009688",
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

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleTreatmentMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		setValue(getTabValue(location.pathname));
	}, [location.pathname]);

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
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
							fontSize: "1.2rem",
							flex: 1,
							minWidth: 250,
							"&.Mui-selected": {
								color: "#009688",
							},
						}}
					/>
				</Tabs>
				<Menu
					id="treatment-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					PaperProps={{
						sx: {
							width: 300, // Increased width for better readability
							maxWidth: "100%",
							backgroundColor: "#f9f9f9", // Light background color for better visibility
						},
					}}
					MenuListProps={{
						sx: {
							padding: 2, // Increase padding inside the menu
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
							fontSize: "1.1rem", // Larger font size
							padding: "12px 24px", // More padding for easier clicking
							color: "#333333", // Darker text color for better readability
							backgroundColor: "#12EDC8", // Softer mint green background
							"&:hover": {
								transition: 1,
								backgroundColor: "#E1FEFA", // Lighter mint green on hover
							},
							borderRadius: "4px", // Rounded corners for a softer look
						}}>
						View All Treatments
					</MenuItem>
				</Menu>
			</Box>
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
