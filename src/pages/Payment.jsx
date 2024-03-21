import React from "react";
import PaymentForm from "../checkout/PaymentForm";
import CheckoutItems from "../checkout/CheckoutItems";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Payment = () => {
  return (
    <Layout>
      <PaymentForm />
      <CheckoutItems />
    </Layout>
  );
};

export default Payment;
