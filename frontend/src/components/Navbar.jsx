import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#2563EB",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Rentify
        </Link>

        <div className="d-flex align-items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "180px",
              borderRadius: "10px",
              border: "none",
              padding: "10px",
            }}
          />

          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/bookings">
                My Bookings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/manage-bookings">
                Manage Bookings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/add-product">
                Add Product
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Hi, {user.name}</span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-sm text-white"
                    style={{
                      backgroundColor: "#F97316",
                      border: "none",
                    }}
                    onClick={() => {
                      localStorage.removeItem("user");

                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
