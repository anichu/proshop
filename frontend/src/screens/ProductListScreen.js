import React, { useEffect } from "react";
import { Button, Row, Table, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { useNavigate, useParams } from "react-router-dom";
import {
	createProduct,
	deleteProduct,
	listProducts,
} from "../actions/productActions";
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
} from "../constants/productConstants";
import Paginate from "../components/Paginate";
const ProductListScreen = () => {
	const { pageNumber } = useParams() || 1;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
		if (!userInfo.isAdmin) {
			navigate("/login");
		}
		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts("", pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		navigate,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);
	const deleteHandler = (id) => {
		// console.log(id);
		if (window.confirm("Are you sure")) {
			// DELETE PRODUCTS
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{error}</Message>}

			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{error}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table className="table-sm" hover responsive bordered striped>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
							</tr>
						</thead>

						<tbody>
							{products &&
								products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer to={`/admin/product/${product._id}/edit`}>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() => deleteHandler(product._id)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
