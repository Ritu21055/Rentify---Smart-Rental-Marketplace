import { useState, useEffect } from "react";
import axios from "axios";

function ManageBookings() {
  const [Bookings, setBookings] = useState([]);

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

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `https://rentify-smart-rental-marketplace.onrender.com/api/bookings{id}`,
        {
          status: newStatus,
        },
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Manage Bookings</h1>
      <div className="row">
        {Bookings.map((booking) => (
          <div className="col-md-4 mb-4" key={booking._id}>
            <div
              className="card shadow border-0 h-100"
              style={{ borderRadius: "20px" }}
            >
              <img
                src={booking.productImage}
                alt={booking.productTitle}
                className="card-img-top"
                height="250"
                style={{ objectFit: "cover" }}
              />

              <div className="card-body">
                <h3>{booking.productTitle}</h3>

                <p>{booking.renterName}</p>

                <h5>₹ {booking.totalPrice}</h5>

                <span className="badge bg-warning text-dark mb-3">
                  {booking.status}
                </span>

                <div className="d-flex gap-2">
                  <button
                    className="btn text-white w-50"
                    style={{
                      backgroundColor: "#2563EB",
                      border: "none",
                    }}
                    onClick={() => updateStatus(booking._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger w-50"
                    onClick={() => updateStatus(booking._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageBookings;
