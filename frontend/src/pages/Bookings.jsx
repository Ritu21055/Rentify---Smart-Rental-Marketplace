import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await axios.get(
          "https://rentify-smart-rental-marketplace.onrender.com/api/bookings",
        );

        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      <div className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{
            fontSize: "50px",
          }}
        >
          My Bookings
        </h1>

        <p className="text-muted">Track all your rented products</p>
      </div>

      <div className="row">
        {bookings.map((booking) => (
          <div className="col-md-4 mb-4" key={booking._id}>
            <div
              className="card shadow border-0 h-100"
              style={{
                borderRadius: "20px",
              }}
            >
              <div className="card-body">
                <h3 className="mb-3">{booking.productTitle}</h3>

                <img
                  src={booking.productImage}
                  alt={booking.productTitle}
                  className="img-fluid rounded mb-3"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />

                <p>
                  <strong>Renter:</strong> {booking.renterName}
                </p>

                <p>
                  <strong>Days:</strong> {booking.rentDays}
                </p>

                <h5 className="mb-3">₹ {booking.totalPrice}</h5>

                <span className="badge bg-warning text-dark p-2">
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
