import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route exact element={<HomeScreen />} path="/" />
						<Route exact path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart">
							<Route path="" element={<CartScreen />} />
							<Route path=":id" element={<CartScreen />} />
						</Route>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
