import React, { useState } from "react";

const Cart = () => {
  // 장바구니 상태를 관리하기 위한 useState 훅 사용
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 제품 추가하는 함수
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <h2>Cart</h2>
      <div>
        <h3>제품 목록</h3>
        <ul>
          {/* 장바구니에 추가된 제품 목록을 표시 */}
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>상품 추가</h3>
        {/* 간단한 제품 추가 양식 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const productName = e.target.elements.productName.value;
            const product = { name: productName };
            addToCart(product);
            e.target.reset();
          }}
        >
          <input type="text" name="productName" placeholder="제품명" />
          <button type="submit">장바구니에 추가</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
