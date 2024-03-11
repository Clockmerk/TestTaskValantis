import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Catalog } from "./pages/Catalog/catalog";
import App from "./App";
import { Product } from "./pages/Product/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Catalog />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "*",
        element: (
          <div className="flex justify-center mt-[50vh]">
            Такой страницы нет ¯\_(ツ)_/¯
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
