import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../actions/orderActions";
const OrderListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllOrders());
		} else {
			navigate("/login");
		}
	}, [dispatch, userInfo, navigate, successDelete]);
	const deleteHandler = (id) => {
		// console.log(id);
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};
	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table className="table-sm" hover responsive bordered striped>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
						</tr>
					</thead>

					<tbody>
						{orders &&
							orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user.name}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.ispaid ? (
											<i
												className="fas fa-check"
												style={{ color: "green" }}
											></i>
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<i
												className="fas fa-check"
												style={{ color: "green" }}
											></i>
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
		</>
	);
};

export default OrderListScreen;
