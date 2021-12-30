import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const navigate = useNavigate();
	if (!shippingAddress) {
		navigate("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Row>
						<Col>
							<Form.Check
								type="radio"
								label="PayPal or Credit Card"
								id="PayPal"
								value="PayPal"
								name="paymentMethod"
								checked
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>

							<Form.Check
								type="radio"
								label="Stripe"
								id="Stripe"
								value="Stripe"
								name="paymentMethod"
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>
						</Col>
					</Row>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-2">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
