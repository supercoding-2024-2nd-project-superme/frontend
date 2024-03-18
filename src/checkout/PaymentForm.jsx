import React, { useState } from "react";
import { styled } from "styled-components";
import Paypal from "./Paypal";
import CheckoutItems from "./CheckoutItems";

const PaymentForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //가상머니 잔액
  const [balance, setBalance] = useState(200);
  //장바구니 총액
  const [totalAmount, setTotalAmount] = useState(50);
  //결제여부
  const [isPaid, setIsPaid] = useState(false);

  const [objectState, setObjectState] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    cardNumber: "",
  });

  const inputEmailHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  };

  const inputNameHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const inputPhoneHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      phone: event.target.value,
    }));
  };

  const inputPostCodeHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      postCode: event.target.value,
    }));
  };

  const inputAddressHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      address: event.target.value,
    }));
  };

  const inputAddressDetailHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      addressDetail: event.target.value,
    }));
  };

  const inputCardNumberHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      cardNumber: event.target.value,
    }));
  };

  const inputExpDateHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      expDate: event.target.value,
    }));
  };

  const inputSecurityCodeHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      securityCode: event.target.value,
    }));
  };

  const inputNameOnCardHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      nameOnCard: event.target.value,
    }));
  };

  const buttonSubmitHandler = (event) => {
    event.preventDefault();
    console.log(objectState);
    if (balance >= totalAmount) {
      setBalance(balance - totalAmount);
      setIsPaid(true);
      alert("결제가 완료되었습니다.");
    } else {
      alert("잔액이 부족합니다.");
    }

    setObjectState({
      email: "",
      name: "",
      phone: "",
      postCode: "",
      address: "",
      addressDetail: "",
      cardNumber: "",
      expDate: "",
      securityCode: "",
      nameOnCard: "",
    });
  };

  return (
    <Layout>
      <PaymentWrapper>
        <PaypalWrapper>
          <div>Express Checkout</div>
          <Paypal />
        </PaypalWrapper>

        <Form onSubmit={buttonSubmitHandler}>
          <ContactWrapper>
            {isLoggedIn ? (
              <MemberContactWrapper>
                <p>account</p>
                {/* 이메일주소 데이터 받아서 넣아야함 */}
                <p>로그인 되어 있습니다. 사용자 이메일주소</p>
              </MemberContactWrapper>
            ) : (
              <GuestContactWrapper>
                <label>Contact</label>
                <input
                  value={objectState.email}
                  placeholder="Email"
                  onChange={inputEmailHandler}
                />
              </GuestContactWrapper>
            )}
          </ContactWrapper>
          <DeliveryWrapper>
            <label>Delivery</label>
            <input
              value={objectState.name}
              placeholder="Name"
              onChange={inputNameHandler}
            />

            <input
              value={objectState.phone}
              placeholder="Phone number"
              onChange={inputPhoneHandler}
            />

            <input
              value={objectState.postCode}
              placeholder="Post code"
              onChange={inputPostCodeHandler}
            />

            <input
              value={objectState.address}
              placeholder="Address"
              onChange={inputAddressHandler}
            />

            <input
              value={objectState.addressDetail}
              placeholder="Address detail"
              onChange={inputAddressDetailHandler}
            />
          </DeliveryWrapper>
          <PaymentWrapper>
            <div>Deposit Balance: ${balance}</div>

            <label>Payment</label>
            <input
              value={objectState.cardNumber}
              placeholder="Card number"
              onChange={inputCardNumberHandler}
            />
            <CardDetailWrapper>
              <input
                value={objectState.expDate}
                placeholder="Expiration date (MM/YY)"
                onChange={inputExpDateHandler}
              />

              <input
                value={objectState.securityCode}
                placeholder="Security code"
                onChange={inputSecurityCodeHandler}
              />
            </CardDetailWrapper>

            <input
              value={objectState.nameOnCard}
              placeholder="Name on card"
              onChange={inputNameOnCardHandler}
            />
          </PaymentWrapper>
          <PayBtnWrapper>
            <button type="submit">Pay now</button>
          </PayBtnWrapper>
        </Form>
      </PaymentWrapper>

      <CheckoutItems />
    </Layout>
  );
};

export default PaymentForm;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0 100px 0;
  width: 100%;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  border-right: 1px solid grey;
  input {
    width: 100%;
  }
`;

const PaypalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

const MemberContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 100%;
  }
`;

const GuestContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 100%;
  }
`;

const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  input {
    width: 100%;
  }
`;

const CardDetailWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const PayBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
