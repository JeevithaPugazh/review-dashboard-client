import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
} from "../utilities/apis/product-api";
// import { getUsers } from "../utilities/apis/users-api";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import AddProductPage from "./AddProductPage";

function ProductPage() {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] =
    useState(null);

  useEffect(() => {
    getProducts().then((response) => {
      console.log(response);
      setProducts(response);
    });
  }, []);

  const openAddProductModal = () => {
    setEditingProductId(null);
    setShowModal(true);
  };

  const openEditProductModal = (id) => {
    setEditingProductId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProductId(null);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-primary">
      {/* Navbar */}
      <Nav />

      {/* Products Grid */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Your Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              id={product._id}
              className="bg-surface p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex flex-row justify-between">
                <h3
                  className="text-xl font-semibold cursor-pointer text-primary mb-2"
                  onClick={() =>
                    nav(`/review/${product._id}`)
                  }
                >
                  {product.name}
                </h3>

                <div>
                  <a
                    className="hover:bg-primary-hover cursor-pointer material-symbols-outlined mr-2"
                    onClick={() =>
                      openEditProductModal(product._id)
                    }
                  >
                    edit
                  </a>

                  <a
                    className="text-red-500 hover:bg-red-600 cursor-pointer material-symbols-outlined"
                    onClick={() => {
                      const { _id } = product;
                      deleteProduct(_id)
                        .then(() => {
                          const currentProduct =
                            document.getElementById(_id);
                          currentProduct.remove();
                        })
                        .catch((e) => {
                          alert(e.message);
                        });
                      // handle delete logic here

                      // alert("Delete logic to be implemented");
                    }}
                  >
                    delete_forever
                  </a>
                </div>
              </div>
              <p class="mb-3 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
              <div className="text-secondary mb-4">
                <p className="mb-2 font-bold text-primary">
                  Services
                </p>
                <div className="flex flex-wrap gap-2 m-5">
                  {product.services.map(
                    (service, index) => (
                      <div key={index} className="pr-1 pb-1">
                        <span className="bg-accent rounded-lg p-2">
                          ✔️{service.trim()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-between"></div>
             { product.location && <footer class="rounded-lg dark:bg-gray-800">
                <small class="w-full mx-auto max-w-screen-xl md:flex md:items-end">
                  <span class="material-symbols-outlined mr-0">
                    place
                  </span>
                  {product.location}
                </small>
              </footer> }
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-10 mb-10">
          <button
            className="bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-primary-light hover:text-white"
            onClick={openAddProductModal}
          >
            Add Product
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-1 w-[90%] max-w-2xl">
            {/* <a
              className=" float-right cursor-pointer"
              onClick={closeModal}
            >
              ✕
            </a> */}
            <AddProductPage
              productId={editingProductId}
              onClose={closeModal}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
