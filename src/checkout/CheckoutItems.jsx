import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckoutItems = () => {
  //컴포넌트에서 Action을 Dispatch
  const dispatch = useDispatch();

  //스토어에 있는 값을 컴포넌트로 가져오기. 객체인 state에서 selectedQuantity의 number라는 속성을 가져온다.
  const selectedQuantity = useSelector(
    (state) => state.selectedQuantity.number
  );

  return (
    <div>
      <h1>selected quantity</h1>
      <h4>{selectedQuantity}</h4>
    </div>
  );
};

export default CheckoutItems;
