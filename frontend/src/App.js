import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
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
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/shipping" element={<ShippingScreen />} />
						<Route path="/payment" element={<PaymentScreen />} />
						<Route path="/placeorder" element={<PlaceOrderScreen />} />
						<Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
						<Route path="/admin/userlist" element={<UserListScreen />} />
						<Route path="/admin/orderlist" element={<OrderListScreen />} />
						<Route
							exact
							path="/admin/productlist"
							element={<ProductListScreen />}
						/>
						<Route
							exact
							path="/admin/productlist/:pageNumber"
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/product/:id/edit"
							element={<ProductEditScreen />}
						/>
						<Route path="/order/:id" element={<OrderScreen />} />
						<Route exact element={<HomeScreen />} path="/search/:keyword" />
						<Route exact element={<HomeScreen />} path="/page/:pageNumber" />
						<Route
							exact
							element={<HomeScreen />}
							path="/search/:keyword/page/:pageNumber"
						/>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
