//Ducks 패턴 - 기능 중심으로 나눔, 리듀서, 액션을 같은 파일에 작성

// Actions
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creator
export const increment = (itemId) => {
  return {
    type: INCREMENT,
    payload: {
      itemId: itemId,
    },
  };
};
export const decrement = (itemId) => {
  return {
    type: DECREMENT,
    payload: {
      itemId: itemId,
    },
  };
};

//REDUCER

//초기 상태 정의
//추후 데이터 받아와야함
const initialState = {
  cartItems: [
    {
      id: "user1",
      cartItemId: "1",
      itemId: "4536662830136",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241L103-0012_10_1800x1800.jpg?v=1708062882",
      name: "【STORE EXCLUSIVE】WOMEN'S SWEAT SHIRTS",
      quantity: 1,
      color: "BLUE",
      size: "38",
      price: 125,
      added_at: new Date(),
    },
    {
      id: "user1",
      cartItemId: "2",
      itemId: "4536606430737",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241M104-0017_color_410_1800x1800.jpg?v=1708582832",
      name: "MEN'S WORK SHIRT",
      quantity: 1,
      color: "LGT GRY",
      size: "40",
      price: 198,
      added_at: new Date(),
    },
    {
      id: "user1",
      cartItemId: "3",
      itemId: "4554H489AA",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241L103-0006_color_070_1800x1800.jpg?v=1707375086",
      name: "WOMEN'S LONG SLEEVE SWEAT T-SHIRT",
      quantity: 1,
      color: "SAX",
      size: "XS",
      price: 106,
      added_at: new Date(),
    },
    {
      id: "user1",
      cartItemId: "4",
      itemId: "4535364070099",
      main_img:
        "https://danton.com/cdn/shop/files/DNB241U303-0012_color_016_1800x1800.jpg?v=1709117816",
      name: "POLYESTER STRETCH BUCKET HAT",
      quantity: 1,
      color: "BLACK",
      size: "F",
      price: 80,
      added_at: new Date(),
    },
  ],
};

// selectedQuantity 리듀서
export default function selectedQuantity(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        cartItems: state.cartItems.map((item) =>
          item.itemId === action.payload.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT:
      const updatedCartItems = state.cartItems.map((item) =>
        item.itemId === action.payload.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      //수량이 0인 아이템을 카트에서 삭제
      const updatedCartWithItemDeleted = updatedCartItems.filter(
        (item) =>
          !(item.itemId === action.payload.itemId && item.quantity === 0)
      );

      return {
        cartItems: updatedCartWithItemDeleted,
      };
    default:
      return state;
  }
}
