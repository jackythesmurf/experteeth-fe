import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home/Home";
import Navbar from "./components/containers/navs/HeaderNavBar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
	return (
		<div>
			<Navbar></Navbar>
			<Home></Home>
		</div>
	);
}

export default App;
