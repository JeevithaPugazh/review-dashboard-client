import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "./App.css";
import ProductPage from "./pages/ProductPage/ProductPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import AddProductPage from "./pages/ProductPage/AddProductPage";

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
          path="/addProduct"
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
