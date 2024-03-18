import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Main from "./pages/Main";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import Payment from "./pages/Payment";
import Upload from "./pages/Upload";
import Modify from "./pages/Modify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: "/productlist/:category", element: <ProductList /> },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/mypage/modify",
        element: <Modify />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
