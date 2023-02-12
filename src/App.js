import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllProducts from "./pages/AllProducts";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import MyCart from "./pages/MyCart";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/carts",
        element: <MyCart />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/new",
        element: <NewProduct />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
