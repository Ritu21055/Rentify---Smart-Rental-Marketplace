import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    deposit: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);

      data.append("description", formData.description);
      data.append("pricePerDay", formData.pricePerDay);

      data.append("deposit", formData.deposit);
      data.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert(res.data.message);
      window.location.href = "/";
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Add Product</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="number"
                name="pricePerDay"
                placeholder="Price Per Day"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="number"
                name="deposit"
                placeholder="Deposit"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button
                type="submit"
                className="btn text-white w-100"
                style={{
                  backgroundColor: "#2563EB",
                  border: "none",
                }}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
