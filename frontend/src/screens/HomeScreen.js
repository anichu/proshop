import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const { keyword, pageNumber } = useParams();
	const productList = useSelector((state) => state.productList);
	const { products, loading, error, page, pages } = productList;
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
						isAdmin={false}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
