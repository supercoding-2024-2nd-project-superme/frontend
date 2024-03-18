//Ducks 패턴 - 기능 중심으로 나눔, 리듀서, 액션을 같은 파일에 작성

// Actions
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creator
export const increment = () => {
  return {
    type: INCREMENT,
  };
};
export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

//REDUCER

// selectedQuantity 리듀서
export default function selectedQuantity(state = { number: 1 }, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}
