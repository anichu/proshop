import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	const { search } = useLocation();

	const redirect = search ? search.split("=")[1] : "/";
	const navigate = useNavigate();
	useEffect(() => {
		if (userInfo) {
			console.log("userInfo", userInfo);

			console.log("anis");
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
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
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="my-3">
					Sign In
				</Button>
			</Form>
			<Row className="py">
				<Col>
					New Customer?
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register
					</Link>
					{/* <Link to="/register">Register</Link> */}
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
