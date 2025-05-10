import React, { useEffect, useState } from "react";
import { getProducts } from "../utilities/apis/product-api";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((response) => {
      console.log(response);
      setProducts(response);
    });
  }, []);
  return (
    <div className="min-h-screen bg-background text-text-primary font-primary">
      {/* Navbar */}
      <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold"> ⭐Revuhub</h1>
        <button
          className="bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-primary-light"
          onClick={() => nav("/addProduct")}
        >
          Add Product
        </button>
      </nav>

      {/* Products Grid */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-surface p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3
                className="text-xl font-semibold cursor-pointer text-primary mb-2"
                onClick={() => nav(`/review/${product._id}`)}
              >
                {product.name}
              </h3>
              <p className="text-secondary mb-4">
                Services: {product.services}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
                  onClick={() => nav(`/addProduct/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => {
                    // handle delete logic here
                    alert("Delete logic to be implemented");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
