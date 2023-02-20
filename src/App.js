import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import Protected from "./components/Protected";
import { UserProvider } from "./context/UserContext";
import AllProducts from "./pages/AllProducts";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import MyCart from "./pages/MyCart";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Outlet />
        </QueryClientProvider>
      </UserProvider>
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
        element: (
          <Protected>
            <MyCart />
          </Protected>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/new",
        element: (
          <Protected checkAdmin>
            <NewProduct />
          </Protected>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
