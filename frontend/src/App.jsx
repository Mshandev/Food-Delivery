import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ScrollToHash from "./components/ScrollToHash/ScrollToHash";

// Lazy-load the Diagnostics/Export page so it is not bundled into the main chunk.
const DiagnosticsExport = lazy(
  () => import("./pages/DiagnosticsExport/DiagnosticsExport")
);

const App = () => {
  return (
    <>
      <div className="app">
        <ToastContainer />
        <ScrollToHash />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/diagnostics/export"
            element={
              <Suspense fallback={<div>Loading…</div>}>
                <DiagnosticsExport />
              </Suspense>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
