import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/modules";

const root = ReactDOM.createRoot(document.getElementById("root"));

//스토어 만들기: 이 스토어는 (리덕스의) createStore로 만든 스토어이고 rootReducer로 변화를 준다.
const store = createStore(rootReducer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
