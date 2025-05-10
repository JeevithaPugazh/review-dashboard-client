import React, { useEffect, useState } from "react";
import { getProducts } from "../../utilities/apis/product-api";
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
    <div>
      <h1>Your Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr>
                <td>
                  <div
                    onClick={() => {
                      console.log("Clicked");
                      nav(`/review/${product._id}`);
                    }}
                  >
                    {product.name}
                  </div>
                </td>
                <td>{product.services}</td>
                <td><button onClick={()=> nav(`/addProduct/${product._id}`)}>edit</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => nav("/addProduct")}>
        Add new product
      </button>
    </div>
  );
}

export default ProductPage;
