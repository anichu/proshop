import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
const ProfileScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const userLogin = useSelector((state) => state.userLogin);
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const orderMyList = useSelector((state) => state.orderMyList);
	const { orders, loading: loadingOrders, error: errorOrders } = orderMyList;

	const { success } = userUpdateProfile;
	const { userInfo } = userLogin;
	const { user, loading, error } = userDetails;

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("password do not match");
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
				dispatch(listOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [navigate, user, userInfo, dispatch]);

	return (
		<Row>
			<Col md={4}>
				<h1>User Profile</h1>
				{error && <Message variant="danger">{error}</Message>}
				{message && <Message variant="danger">{message}</Message>}
				{success && <Message variant="success">profile updated!</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="primary" className="my-3">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={8}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger"> {errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIEVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.ispaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>

									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
