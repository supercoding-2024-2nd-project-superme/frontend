import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Paypal from "../../checkout/Paypal";
import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import selectedQuantity, {
  decrement,
  increment,
} from "../../store/modules/selectedQuantity";

const Layout = styled.div`
  position: fixed;
  right: ${(props) => (props.$isModalOpen ? "0" : "-100%")};
  opacity: ${(props) => (props.$isModalOpen ? "1" : "0")};
  top: 0;
  width: 550px;
  height: 100%;
  z-index: 1500;
  transition: all 0.5s;
  background-color: var(--color-white);
  padding: 100px 0 350px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartWrapper = styled.div`
  height: 100px;
  width: 450px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
  position: fixed;
  top: 0px;
  background-color: white;
  overflow: hidden;
`;

const CartText = styled.div`
  font-size: 2rem;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px 0px 20px 0px;
  margin-left: 30px;
`;

const BoxItem = styled.div`
  display: flex;
  font-size: 1.25rem;
  margin-bottom: 15px;
  padding-top: 20px;
`;

const Description = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin-left: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  height: 30px;
  border: 1px solid grey;
  font-size: 1.125;
  color: grey;
  margin-top: 15px;
  padding-bottom: 3px;
`;

const BtnPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QtyControlBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const Text = styled.div`
  margin: 10px 0 10px 0;
  font-size: 1.125rem;
`;

const TextSize = styled.div`
  font-size: 1rem;
`;

const CheckoutWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 350px;
  width: 450px;
  border-top: 1px solid grey;
  position: fixed;
  bottom: 0px;
  overflow: hidden;
`;

const SubTotalWrapper = styled.div`
  width: 450px;
  margin: 8px 0 12px 0;
  color: grey;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
`;

const ExtraCostDesc = styled.div`
  width: 450px;
  margin: 8px 0 8px 0;
  font-size: 1rem;
  color: grey;
  white-space: nowrap; //텍스트 한줄로
`;

const BtnCheckout = styled.button`
  width: 100%;
  height: 48px;
  margin: 10px 0 15px 0;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const PaypalWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const CartOverlay = ({ isModalOpen, handleModal }) => {
  //컴포넌트에서 Action을 Dispatch
  const dispatch = useDispatch();

  const SelectedQuantity = useSelector(
    (state) => state.selectedQuantity.number
  );

  const [totalAmount, setTotalAmount] = useState(0);
  //임시데이터
  const [cartItems, setCartItems] = useState([
    {
      id: "user1",
      item_id: "4536662830136",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241L103-0012_10_1800x1800.jpg?v=1708062882",
      item_name: "【STORE EXCLUSIVE】WOMEN'S SWEAT SHIRTS",
      ordered_qty: 1,
      orderd_color: "BLUE",
      ordered_size: "38",
      price: 125,
      added_at: new Date(),
    },
    {
      id: "user1",
      item_id: "4536606430737",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241M104-0017_color_410_1800x1800.jpg?v=1708582832",
      item_name: "MEN'S WORK SHIRT",
      ordered_qty: 1,
      orderd_color: "LGT GRY",
      ordered_size: "40",
      price: 198,
      added_at: new Date(),
    },
    {
      id: "user1",
      item_id: "4554H489AA",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241L103-0006_color_070_1800x1800.jpg?v=1707375086",
      item_name: "WOMEN'S LONG SLEEVE SWEAT T-SHIRT",
      ordered_qty: 1,
      orderd_color: "SAX",
      ordered_size: "XS",
      price: 106,
      added_at: new Date(),
    },
    {
      id: "user1",
      item_id: "4535364070099",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241U303-0012_color_016_1800x1800.jpg?v=1709117816",
      item_name: "POLYESTER STRETCH BUCKET HAT",
      ordered_qty: 1,
      orderd_color: "BLACK",
      ordered_size: "F",
      price: 80,
      added_at: new Date(),
    },
  ]);

  //장바구니 총 금액 업데이트
  useEffect(() => {
    const eachItemTotalAmountArr = cartItems.map(
      (item) => selectedQuantity * item.price
    );

    setTotalAmount(
      eachItemTotalAmountArr.reduce(
        (total, amoutPerItem) => total + amoutPerItem,
        0
      )
    );
  }, [cartItems]);

  //수량 감소
  //const decreaseQty = (item) => {
  //  setCartItems((prevState) => {
  //    const newCartItems = prevState.map((cartItem) => {
  //      if (cartItem.item_id === item.item_id && cartItem.//ordered_qty > 0) {
  //        return {
  //           ...cartItem,
  //           ordered_qty: cartItem.ordered_qty - 1,
  //         };
  //       }
  //       return cartItem;
  //     });
  //
  //     // 수량이 0인 아이템 제거
  //     return newCartItems.filter((cartItem) => cartItem.//ordered_qty > 0);
  //   });
  // };

  //수량 증가
  //const increaseQty = (item) => {
  //  console.log(item);
  //  setCartItems((prevState) => {
  //    const newCartItems = [...prevState];
  //    const selectedItem = newCartItems.find(
  //      (cartItem) => cartItem.item_id === item.item_id
  //    );
  //    if (selectedItem) {
  //      selectedItem.ordered_qty += 1;
  //    }
  //    return newCartItems;
  //  });
  //};

  return (
    <Layout $isModalOpen={isModalOpen}>
      <CartWrapper>
        <CartText>Cart</CartText>
      </CartWrapper>
      <ItemList>
        {cartItems.map((item) => (
          <BoxItem key={uuid4()}>
            <img
              src={item.main_img}
              width="130px"
              height="130px"
              style={{ objectFit: "cover" }}
            />
            <Description>
              <Text>{item.item_name}</Text>
              <TextSize>
                {item.orderd_color}/{item.ordered_size}
              </TextSize>

              <BtnPriceWrapper>
                <ButtonBox>
                  <QtyControlBtn onClick={() => dispatch(decrement())}>
                    -
                  </QtyControlBtn>
                  {SelectedQuantity}
                  <QtyControlBtn onClick={() => dispatch(increment())}>
                    +
                  </QtyControlBtn>
                </ButtonBox>
                <Text>${item.price}</Text>
              </BtnPriceWrapper>
            </Description>
          </BoxItem>
        ))}
      </ItemList>
      <CheckoutWrapper>
        <SubTotalWrapper>
          <div>SUBTOTAL</div>
          <div>${totalAmount}</div>
        </SubTotalWrapper>
        <ExtraCostDesc>
          Shipping, taxes, and discount codes calculated at checkout.
        </ExtraCostDesc>
        <BtnCheckout>Check Out</BtnCheckout>
        <PaypalWrapper>
          <Paypal />
        </PaypalWrapper>
      </CheckoutWrapper>
    </Layout>
  );
};

export default function CartModal({ isModalOpen, handleModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <CartOverlay isModalOpen={isModalOpen} handleModal={handleModal} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
