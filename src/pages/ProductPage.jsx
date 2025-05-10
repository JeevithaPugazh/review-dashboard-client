import React, { useEffect, useState } from "react";
import { getProducts } from "../utilities/apis/product-api";
// import { getUsers } from "../utilities/apis/users-api";
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
  // useEffect(() => {
  //   getUsers().then((response) => {
  //     console.log(response);
  //     getUsers(response);
  //   });
  // }, []);
  return (
    <div className="min-h-screen bg-background text-text-primary font-primary">
      {/* Navbar */}
      <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold"> ⭐Revuhub</h1>
        <h2 className="text-xl font-bold flex">Welcome,{}<span className="mr-2  material-symbols-outlined">
        account_circle
                    </span></h2>
      </nav>

      {/* Products Grid */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Your Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-surface p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3
                className="text-xl font-semibold cursor-pointer text-primary mb-2"
                onClick={() =>
                  nav(`/review/${product._id}`)
                }
              >
                {product.name}
              </h3>
              <div className="text-secondary mb-4">
                <p className="mb-2 font-medium text-primary">
                  Services:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.services.map(
                    (service, index) => (
                      <span key={index} className="">
                        ⭐{service.trim()}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
                  onClick={() =>
                    nav(`/addProduct/${product._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 border-0 text-white px-4 py-2 rounded hover:bg-red-600"
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
        <div className="flex justify-center items-center mt-10 mb-10">
          <button
            className="bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-primary-light
           hover:text-white"
            onClick={() => nav("/addProduct")}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
