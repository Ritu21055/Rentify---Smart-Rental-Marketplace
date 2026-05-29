import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Bookings from "./pages/Bookings";
import ManageBookings from "./pages/ManageBookings";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar search={search} setSearch={setSearch} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
