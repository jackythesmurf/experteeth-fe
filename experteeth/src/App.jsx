import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Navbar from "./components/containers/navs/HeaderNavBar/Navbar";
import Home from "./pages/Home/Home";
import FindLocation from "./pages/FindLocation/FindLocation";
import DentistTeam from "./pages/Dentist/DentistTeam";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Treatment from "./pages/Treatment/Treatment";
import Appointment from "./pages/Appointment/Appointment";
function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/find-a-practice"
					element={<FindLocation />}
				/>
				<Route
					path="/dentist-team"
					element={<DentistTeam />}
				/>
				<Route path="/treatment" element={<Treatment />} />
				<Route
					path="/appointment"
					element={<Appointment />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
