import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import Loader from "./CommenComponents/Loader.jsx";
import Home from "./Home/Home.jsx";
import About from "./Home/About.jsx";
import ContactUs from "./Home/ContactUs.jsx";
import Products from "./Pages/Products.jsx";
import FitmentSystems from "./Pages/FitmentSystems.jsx";
import Services from "./Pages/Services.jsx";
import BalconyScreens from "./Pages/BalconyScreens.jsx";
import Gallery from "./Pages/Gallery.jsx";
import Downloads from "./Pages/Downloads.jsx";
import Quote from "./Pages/Quote.jsx";
import Warranty from "./Pages/Warranty.jsx";
import CareMaintenance from "./Pages/CareMaintenance.jsx";
import FAQ from "./Pages/FAQ.jsx";
import WhyOzone from "./Pages/WhyOzone.jsx";
import NotFound from "./Pages/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "products", element: <Products /> },
      { path: "fitment-systems", element: <FitmentSystems /> },
      { path: "services", element: <Services /> },
      { path: "balcony-screens", element: <BalconyScreens /> },
      { path: "gallery", element: <Gallery /> },
      { path: "downloads", element: <Downloads /> },
      { path: "quote", element: <Quote /> },
      { path: "warranty", element: <Warranty /> },
      { path: "care-maintenance", element: <CareMaintenance /> },
      { path: "faq", element: <FAQ /> },
      { path: "why-ozone", element: <WhyOzone /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>

    <Toaster
      position="top-left"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
    />
  </StrictMode>
);
