import React, { useEffect, useState } from "react";
import {
  addProduct,
  getCategories,
  getProduct,
  updateProduct,
} from "../utilities/apis/product-api";
import {
  getListOfCategories,
  getServices,
} from "../utilities/data-util";
import ErrorMessage from "../component/ErrorMessage";
import Services from "../component/Services";
import Nav from "../component/Nav";
import { useNavigate } from "react-router-dom";

function AddProductPage({
  productId,
  onClose,
  products,
  setProducts,
}) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image,setImage] = useState(null);

  // Load product if editing
  useEffect(() => {
    if (productId) {
      getProduct(productId).then((product) => {
        setProduct(product);
        setName(product.name);
        setDescription(product.description);
        setLocation(product.location);
      });
    } else {
      setLoading(false);
    }
  }, [productId]);

  // Load category info
  useEffect(() => {
    getCategories().then((categoryResponse) => {
      setCategoryMap(categoryResponse);
      const categoryList = getListOfCategories(
        categoryResponse
      );
      const defaultCategory =
        product?.category || categoryList[0].value;
      setCategories(categoryList);
      setSelectedCategory(defaultCategory);
      setServices(
        getServices(categoryResponse, defaultCategory)
      );
      setLoading(false);
    });
  }, [product]);

  const handleCategoryChange = (e) => {
    const value = e.currentTarget.value;
    setSelectedCategory(value);
    setServices(getServices(categoryMap, value));
  };

  const handleSubmit = () => {
    const payload = {
      name,
      location,
      description,
      category: selectedCategory,
      services,
      image
    };

    const action = productId
      ? updateProduct(productId, payload)
      : addProduct(payload);

    action
      .then((product) => {
        onClose && onClose(); //: nav("/productPage");
        let allProducts = [...products, product];
        if (productId) {
          allProducts = products.map((p) => {
            return p._id == productId ? product : p;
          });
        }else{
          allProducts = [...products, product];
        }
        setProducts(allProducts);
      })
      .catch((e) => setError(e.message));
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {productId ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-bold">
            Name
          </label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold mb-1">
            Description
          </label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={description}
            maxLength={60}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={location}
            maxLength={60}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
  <label className="block font-bold mb-1">Image</label>
  <input
    type="file"
    accept="image/*"
    className="w-full border rounded p-2"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div>

        <div>
          <label className="block font-bold mb-1">
            Category
          </label>
          <select
            className="w-full border rounded p-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={!!productId}
          >
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1">
            Services
          </label>
          <Services services={services} />
        </div>

        {error && <ErrorMessage error={error} />}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {productId ? "Update Product" : "Add Product"}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-600 border border-gray-400 px-4 py-2 ml-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
