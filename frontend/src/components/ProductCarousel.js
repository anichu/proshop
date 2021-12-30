import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTopProduct } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
const ProductCarousel = () => {
	const dispatch = useDispatch();
	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, products, error } = productTopRated;
	useEffect(() => {
		dispatch(listTopProduct());
	}, [dispatch]);
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Carousel pause="hover" style={{ backgroundColor: "black" }}>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<center>
							<Image
								style={{ display: "flex", justifyContent: "center" }}
								src={product.image}
								alt={product.name}
								fluid
							></Image>
						</center>
						<Carousel.Caption className="carousel-caption">
							<h2>
								{product.name} {product.price}
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
