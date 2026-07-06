import {  useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./CommenComponents/Navbar";
import Header from "./CommenComponents/Header";
import Footer from "./CommenComponents/Footer";
import "./index.css";

import ScrollToTop from "./CommenComponents/ScrollToTop";
import ScrollNavigator from "./CommenComponents/ScrollNavigator";
import Loader from "./CommenComponents/Loader";
import FloatingActions from "./CommenComponents/FloatingActions";
import TopHeader from "./CommenComponents/TopHeader";

function App() {
   const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Navbar />
      <ScrollToTop/>
      <ScrollNavigator/>
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;