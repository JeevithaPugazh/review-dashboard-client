import React, { useEffect, useRef, useState } from "react";
import {
  addProduct,
  getCategories,
  getProduct,
} from "../../utilities/apis/product-api";
import { useNavigate } from "react-router-dom";
import {
  getListOfCategories,
  getServices,
} from "../../utilities/data-util";
import ErrorMessage from "../../component/ErrorMessage";
import Services from "../../component/Services";

function AddProductPage() {
  const formRef = useRef();
  const { id: productId } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [services, setServices] = useState([]);
  const loadCategoryInfo = () => {
    getCategories().then((categoryResponse) => {
      setCategoryMap(categoryResponse);
      const categories = getListOfCategories(
        categoryResponse
      );
      setServices(
        getServices(
          categoryResponse,
          productId ? product.category : categories[0].value
        )
      );
      setSelectedCategory(categories[0].value);
      setCategories(categories);
    });
  };
  useEffect(() => {
    !product && loadCategoryInfo();
  }, [product]);

  useEffect(() => {
    if (productId) {
      getProduct(productId).then((product) =>
        setProduct(product)
      );
    } else {
      loadCategoryInfo();
    }
  }, []);
  function changeCategory(e) {
    console.log(e);
    setServices(
      getServices(categoryMap, e.currentTarget.value)
    );
    setSelectedCategory(e.currentTarget.value);
  }
  return (
    <div>
      <h2>Add New Product</h2>
      {categories.length > 0 ? (
        <div>
          Name{" "}
          <input
            type="text"
            name="name"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            maxLength={60}
          ></input>
          Category
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={changeCategory}
          >
            {categories.map(({ value, label }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
          <Services services={services}></Services>
          <button
            onClick={() =>
              addProduct({
                name,
                category: selectedCategory,
                services,
              })
                .then(() => nav("/productPage"))
                .catch((e) => {
                  setError(e.message);
                })
            }
          >
            Submit
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {error != "" ? <ErrorMessage error={error} /> : null}
    </div>
  );
}

export default AddProductPage;
