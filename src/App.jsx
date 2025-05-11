import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import ReviewPage from "./pages/ReviewPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/productPage"
          element={<ProductPage />}
        />
        <Route
          path="/editProduct/:id"
          element={<AddProductPage />}
        />
         <Route
          path="/addProduct/"
          element={<AddProductPage />}
        />
        <Route
          path="/review/:id"
          element={<ReviewPage />}
        />
      </Routes>
    </>
  );
}

export default App;
