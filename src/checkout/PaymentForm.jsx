import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Paypal from "./Paypal";
import { loadDaumAddressAPI } from "../common/DaumAddressApi";

const PaymentForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //주소검색
  const [isAddressAPIInitialized, setIsAddressAPIInitialized] = useState(false);

  //장바구니 총액
  const [totalAmount, setTotalAmount] = useState(50);
  //결제여부
  const [isPaid, setIsPaid] = useState(false);

  const [objectState, setObjectState] = useState({
    userId: "",
    itemIds: [],
    email: "",
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    balance: "",
    totalPrice: "",
    orderDate: new Date(),
    status: "",
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

  //다음주소찾기
  const addressSearchHandler = () => {
    if (!isAddressAPIInitialized) {
      setIsAddressAPIInitialized(true);
      new window.daum.Postcode({
        oncomplete: function (data) {
          const { address } = data;
          setObjectState((prevState) => ({
            ...prevState,
            address: address,
          }));
        },
      }).open();
    }
  };

  //다음주소찾기
  useEffect(() => {
    loadDaumAddressAPI().then(() => {
      document.getElementById("customer-address").onclick =
        addressSearchHandler;
    });
  }, []);

  const inputAddressDetailHandler = (event) => {
    setObjectState((prevState) => ({
      ...prevState,
      addressDetail: event.target.value,
    }));
  };

  const buttonSubmitHandler = (event) => {
    event.preventDefault();
    console.log(objectState);
    if (objectState.balance >= totalAmount) {
      setObjectState((prevState) => ({
        ...prevState,
        balance: objectState.balance - totalAmount,
      }));
      setIsPaid(true);
      alert("결제가 완료되었습니다.");
    } else {
      alert("잔액이 부족합니다.");
    }

    //주문정보를 서버로 POST하는 함수
    const sendOrderInfoToServer = async (objectState) => {
      try {
        const {
          userId,
          itemIds,
          adress,
          addressDetail,
          totalPrice,
          orderDate,
          status,
        } = objectState; // 주문 정보 추출

        const requestBody = {
          userId,
          itemIds,
          adress,
          addressDetail,
          totalPrice,
          orderDate,
          status,
        };
        const response = await fetch("/api/cart/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to send order information to the server");
        }

        return await response.json(); // 성공적으로 보내진 경우 응답 데이터 반환
      } catch (error) {
        throw new Error("Failed to send order information to the server");
      }
    };

    // 결제 완료 후 주문 정보 서버에 보내기
    sendOrderInfoToServer(objectState)
      .then((data) => {
        console.log("주문 정보가 성공적으로 서버에 전송되었습니다.", data);
        setObjectState({
          email: "",
          name: "",
          phone: "",
          address: "",
          addressDetail: "",
        });
      })
      .catch((error) => {
        console.error("주문 정보 전송 중 오류가 발생했습니다.", error.message);
      });
  };

  return (
    <Layout>
      <PaymentWrapper>
        <PaypalWrapper>
          <PaypalText>Express Checkout</PaypalText>
          <PaypalBtnWrapper>
            <PaypalButton />
          </PaypalBtnWrapper>
        </PaypalWrapper>

        <OrContainer>
          <OrLine />
          <OrText>OR</OrText>
        </OrContainer>

        <Form onSubmit={buttonSubmitHandler}>
          {/* Contact */}
          <ContactWrapper>
            <GuestContactWrapper>
              <ContactTitleWrapper>
                <ContactTitle htmlFor="contact">Contact</ContactTitle>
                {!isLoggedIn && (
                  <LoginLink href="http://localhost:3000/login">
                    LOGIN
                  </LoginLink>
                )}
              </ContactTitleWrapper>

              <InputBox
                value={objectState.email}
                onChange={inputEmailHandler}
                placeholder={isLoggedIn ? objectState.email : "Email"}
                readOnly={isLoggedIn}
              />
              <CheckboxWrapper>
                <CheckboxShell>
                  <CheckboxInput type="checkbox" id="subscribeNews" />
                </CheckboxShell>

                <SubscribeLabel for="subscribeNews">
                  Email me with news and offers
                </SubscribeLabel>
              </CheckboxWrapper>
            </GuestContactWrapper>
          </ContactWrapper>
          <DeliveryWrapper>
            <TitleWrapper>
              <Title htmlFor="delivery">Delivery</Title>
            </TitleWrapper>

            <InputBox
              value={objectState.name}
              onChange={inputNameHandler}
              placeholder={isLoggedIn ? objectState.name : "Name"}
              readOnly={isLoggedIn}
            />

            <InputBox
              value={objectState.phone}
              onChange={inputPhoneHandler}
              placeholder={isLoggedIn ? objectState.phone : "Phone number"}
            />

            <InputBox
              type="text"
              name="customer-address"
              id="customer-address"
              value={objectState.address}
              placeholder={isLoggedIn ? objectState.phone : "Address"}
              onClick={addressSearchHandler}
              readOnly
            />

            <InputBox
              onChange={inputAddressDetailHandler}
              placeholder={
                isLoggedIn ? objectState.addressDetail : "Address detail"
              }
              value={objectState.addressDetail}
            />
          </DeliveryWrapper>

          <PaymentWrapper>
            <TitleWrapper>
              <Title htmlFor="payment">Payment</Title>
            </TitleWrapper>

            <InputBox
              placeholder={
                isLoggedIn
                  ? "E-Money Balance: $" + objectState.balance
                  : "Please login to pay with E-Money"
              }
              readOnly
            />
          </PaymentWrapper>

          <PayBtnWrapper>
            <PayNowBtn type="submit">Pay now</PayNowBtn>
          </PayBtnWrapper>
        </Form>
      </PaymentWrapper>
      <FooterContainer>
        <FooterText>Refund policy</FooterText>
        <FooterText>Order & Shipment</FooterText>
        <FooterText>Privacy policy</FooterText>
        <FooterText>Terms of service</FooterText>
        <FooterText>Legal notice</FooterText>
      </FooterContainer>
    </Layout>
  );
};

export default PaymentForm;

const Layout = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 89px;
  width: 110%;
  height: 100%;
  border-right: 1px solid var(--color-lightgray);
  padding-right: 35px;
  padding-left: 200px;
`;

const PaypalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 140px;
  margin: 15px 0 15px 0;
`;

const PaypalText = styled.div`
  margin-bottom: 25px;
  font-size: 1.125rem;
  color: lightgrey;
`;

const PaypalBtnWrapper = styled.div`
  width: 100%;
`;

const PaypalButton = styled(Paypal)``;

const OrContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
`;

const OrLine = styled.div`
  position: relative;
  margin: 10px 0;
  border-top: 1px solid var(--color-lightgray);
`;

const OrText = styled.span`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0 5px;
  color: lightgrey;
  font-size: 1rem;
`;

const Form = styled.form`
  width: 100%;
  margin: 25px 0 25px 0;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
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

const ContactTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 30px 0 17px 0;
`;

const ContactTitle = styled.label`
  font-size: 1.5rem;
`;

const LoginLink = styled.a`
  font-size: 1rem;
  text-decoration: underline;
`;

const InputBox = styled.input`
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  font-size: 1rem;
  color: black;

  &::placeholder {
    font-size: 1rem;
    color: black;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
`;

const CheckboxShell = styled.div`
  width: 20px;
  margin-right: 5px;
`;

const CheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  &:checked {
    accent-color: black;
  }
`;

const SubscribeLabel = styled.label`
  width: 500px;
  font-size: 1rem;
`;

const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-top: 40px;
  input {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const Title = styled.label`
  font-size: 1.5rem;
  margin-bottom: 18px;
`;

const PayBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 42px;
  input {
    width: 100%;
  }
`;

const PayNowBtn = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 50px;
  background-color: #ff6d6d;
  border: none;
  border-radius: 5px;
  font-size: 1.25rem;
  color: white;

  &:hover {
    background-color: #ff2c2c;
    cursor: pointer;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid var(--color-lightgray);
  height: 73px;
  font-size: 0.875rem;
`;

const FooterText = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;
