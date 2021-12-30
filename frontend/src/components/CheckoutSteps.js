import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className="mb-4">
			<Nav.Item>
				{step1 ? (
					<LinkContainer to="/login">
						<Nav.Link>
							{" "}
							<span>Sign In</span>{" "}
						</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>
						<span>Sign In</span>
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2 ? (
					<LinkContainer to="/shipping">
						<Nav.Link>
							<span>Shipping</span>
						</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>
						{" "}
						<span>Shipping</span>
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3 ? (
					<LinkContainer to="/payment">
						<Nav.Link>
							<span>Payment</span>
						</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>
						<span>Payment</span>
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4 ? (
					<LinkContainer to="/placeorder">
						<Nav.Link>
							<span>Place Order</span>
						</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>
						<span>Place Order</span>
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
