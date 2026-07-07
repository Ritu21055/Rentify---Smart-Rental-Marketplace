import { useState, useEffect } from "react";

import axios from "axios";

function Home({ search }) {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [rentDays, setRentDays] = useState(1);

  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(
          "https://rentify-smart-rental-marketplace.onrender.com/api/products",
        );

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, []);

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");

      window.location.href = "/login";

      return;
    }

    try {
      const bookingData = {
        productTitle: selectedProduct.title,

        productImage: selectedProduct.image,

        renterName: user.name,

        rentDays: rentDays,

        totalPrice: selectedProduct.pricePerDay * rentDays,
      };

      const res = await axios.post(
        "https://rentify-smart-rental-marketplace.onrender.com/api/bookings/add",

        bookingData,
      );

      alert(res.data.message);

      setShowPayment(false);

      setSelectedProduct(null);

      setRentDays(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container pt-3 pb-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="text-center mb-4">
        <h1
          className="fw-bold"
          style={{
            color: "#2563EB",
            fontSize: "60px",
            letterSpacing: "1px",
          }}
        >
          Discover What You Need
        </h1>

        <p
          className="text-muted"
          style={{
            fontSize: "18px",
          }}
        >
          Borrow More. Own Less.
        </p>
      </div>

      <div className="row">
        {products
          ?.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div
                className="card shadow border-0 h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="300"
                  style={{
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>

                  <p className="card-text">{product.description}</p>

                  <h5>₹ {product.pricePerDay}/ day</h5>

                  <p>Deposit: ₹ {product.deposit}</p>

                  <button
                    className="btn text-white"
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      backgroundColor: "#2563EB",
                      border: "none",
                    }}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {selectedProduct && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>

              <div className="modal-body text-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="img-fluid rounded mb-3"
                  height="250"
                />

                <p>{selectedProduct.description}</p>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Select Rental Days
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={rentDays}
                    onChange={(e) => setRentDays(e.target.value)}
                  />
                </div>

                <h5>Total: ₹ {selectedProduct.pricePerDay * rentDays}</h5>

                <p>Deposit: ₹ {selectedProduct.deposit}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>

                <button
                  className="btn text-white"
                  style={{
                    backgroundColor: "#2563EB",
                    border: "none",
                  }}
                  onClick={() => setShowPayment(true)}
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayment && selectedProduct && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPayment(false)}
                ></button>
              </div>

              <div className="modal-body text-center">
                <h4 className="mb-4">
                  Total: ₹ {selectedProduct.pricePerDay * rentDays}
                </h4>

                <div className="d-grid gap-3">
                  <button className="btn btn-outline-dark">Pay with UPI</button>

                  <button className="btn btn-outline-dark">
                    Pay with Card
                  </button>

                  <button className="btn btn-outline-dark">
                    Cash on Delivery
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn text-white"
                  style={{
                    backgroundColor: "#F97316",
                    border: "none",
                  }}
                  onClick={handleBooking}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
