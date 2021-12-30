import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, updateUser } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
	const { id } = useParams();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: id,
				name,
				email,
				isAdmin,
			})
		);
	};

	useEffect(() => {
		if (successUpdate) {
			dispatch({
				type: USER_UPDATE_RESET,
			});
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== id) {
				dispatch(getUserDetails(id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, id, user, navigate, successUpdate]);

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
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

						<Form.Group controlId="isAdmin">
							<Form.Check
								type="checkbox"
								checked={isAdmin}
								label="Is Admin"
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<Button type="submit" variant="primary" className="my-3">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
