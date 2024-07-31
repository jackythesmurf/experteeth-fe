import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function samePageLinkNavigation(event) {
	if (
		event.defaultPrevented ||
		event.button !== 0 || // ignore everything but left-click
		event.metaKey ||
		event.ctrlKey ||
		event.altKey ||
		event.shiftKey
	) {
		return false;
	}
	return true;
}

function LinkTab(props) {
	return (
		<Tab
			component="a"
			onClick={(event) => {
				if (samePageLinkNavigation(event)) {
					event.preventDefault();
				}
			}}
			aria-current={props.selected && "page"}
			sx={{
				color: "#004d00", // Dark green for default tab color
				fontSize: "1.2rem", // Increase font size
				flex: 1, // Make the tab fill more space
				minWidth: 250, // Set a minimum width for each tab
				"&.Mui-selected": {
					color: "#009688", // Neon mint green for the selected tab
				},
			}}
			{...props}
		/>
	);
}

LinkTab.propTypes = {
	selected: PropTypes.bool,
};

function Navbar() {
	const [value, setValue] = React.useState(0);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleChange = (event, newValue) => {
		if (
			event.type !== "click" ||
			(event.type === "click" &&
				samePageLinkNavigation(event))
		) {
			setValue(newValue);
		}
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

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
					overflowX: "auto", // Enable horizontal scroll if needed
					display: "flex",
					justifyContent: "center", // Center the Tabs
				}}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="nav tabs example"
					role="navigation"
					sx={{
						minWidth: "max-content", // Ensure tabs container width grows with its content
						"& .MuiTabs-indicator": {
							backgroundColor: "#23DCBD", // Neon mint green indicator
						},
					}}>
					<LinkTab label="Home" href="/drafts" />
					<LinkTab label="Find a practice" href="/drafts" />
					<Tab
						label="Treatment"
						onClick={handleClick}
						aria-controls={
							open ? "dropdown-menu" : undefined
						}
						aria-haspopup="true"
						sx={{
							color: "#040009", // Dark green for default tab color
							fontSize: "1.2rem", // Increase font size
							minWidth: 250, // Set a minimum width for each tab
							flex: 1, // Make the tab fill more space
							"&.Mui-selected": {
								color: "#23DCBD", // Neon mint green for the selected tab
							},
						}}
					/>
					<LinkTab label="Dentist Team" href="/spam" />
					<LinkTab label="Help me" href="/spam" />
				</Tabs>
			</Box>
			<Menu
				id="dropdown-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>
					My Account
				</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</Box>
	);
}

export default Navbar;
