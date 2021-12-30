import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("password do not match");
		} else {
			dispatch(register(name, email, password));
		}
	};
	const { search } = useLocation();
	console.log(search);
	const redirect = search ? search.split("=")[1] : "/";
	console.log(redirect);
	const navigate = useNavigate();
	useEffect(() => {
		console.log("register", userInfo);
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<FormContainer>
			<h1>Register</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
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
					Sign In
				</Button>
			</Form>
			<Row className="">
				<Col>
					Have an account?
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
