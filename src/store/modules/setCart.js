////카트 조회. CartModal에서 서버에 요청하여 응답으로 데이터 //받아옴
//
//// 액션 타입 정의
//const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
//
//// 액션 생성자
//export const setInitialState = (initialCartData) => ({
//  type: SET_INITIAL_STATE,
//  payload: initialCartData,
//});
//
//// 초기 상태 정의
//const initialState = {
//  cart: [] // 카트 정보 초기값 설정
//};
//+
//// 리듀서
//const setCart = (state = initialState, action) //=> {
//  switch (action.type) {
//    case SET_INITIAL_STATE:
//      // SET_INITIAL_STATE 액션 처리
//      return {
//        ...state,
//        cart: action.payload // 받아온 초기 상태로 카트 //정보 업데이트
//      };
//    // 기존의 다른 액션 처리 로직들...
//    default:
//      return state;
//  }
//};

//export default setCart;
