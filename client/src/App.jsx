import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
// import Products from "./pages/products/products";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Clothing from "./pages/products/clothing";
import Watches from "./pages/products/watches";
import Books from "./pages/products/books";
import EyeWear from "./pages/products/eyewear";
import FootWear from "./pages/products/footwear";
import Wishlist from "./pages/products/wishlist";
import ProdDetails from "./pages/productDetails/prodDetails";
import Cart from "./pages/cart/cart";
import Seller from "./pages/seller/seller";
import SellerRegis from "./pages/sellerRegister/sellerRegis";
import SellerLogin from "./pages/sellerLogin/sellerLogin";
import SellerDetails from "./pages/seller/sellerDetails";
import SellerAdd from "./pages/seller/sellerAdd";
import SellerView from "./pages/seller/sellerView";
import SellerAddShirt from "./pages/seller/sellerAddShirt";
import SellerAddTShirt from "./pages/seller/sellerAddTShirt";
import SellerAddPant from "./pages/seller/sellerAddPant";
import SellerAddGen from "./pages/seller/sellerAddGen";
import SellerOnBoard from "./pages/sellerRegister/sellerOnBoard";
import SellerAddBooks from "./pages/seller/sellerAddBooks";
import SellerAddFootwear from "./pages/seller/sellerAddFootwear";
import SellerAddEyewear from "./pages/seller/sellerAddEyewear";
import SellerAddWatches from "./pages/seller/sellerAddWatches";
import SellerSettings from "./pages/seller/sellerSettings";
import CartAddress from "./pages/cart/cartAddress";
import TrackOrder from "./pages/cart/trackOrder";
import SellerProdUpdate from "./pages/seller/sellerProdUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/products/clothing" element={<Clothing />} />
        <Route path="/products/watches" element={<Watches />} />
        <Route path="/products/books" element={<Books />} />
        <Route path="/products/eyewear" element={<EyeWear />} />
        <Route path="/products/footwear" element={<FootWear />} />
        <Route path="/products/details" element={<ProdDetails />} />
        <Route path="/products/wishlist" element={<Wishlist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/track" element={<TrackOrder />} />
        <Route path="/cart/address" element={<CartAddress />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/seller/register" element={<SellerRegis />} />
        <Route path="/seller/onboard" element={<SellerOnBoard />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/products/track" element={<SellerProdUpdate />} />
        <Route path="/seller/details" element={<SellerDetails />} />
        <Route path="/seller/details/add" element={<SellerAdd />} />
        <Route path="/seller/details/add/shirt" element={<SellerAddShirt />} />
        <Route path="/seller/details/add/gen" element={<SellerAddGen />} />
        <Route path="/seller/details/add/pant" element={<SellerAddPant />} />
        <Route
          path="/seller/details/add/tshirt"
          element={<SellerAddTShirt />}
        />
        <Route path="/seller/details/add/books" element={<SellerAddBooks />} />
        <Route
          path="/seller/details/add/watches"
          element={<SellerAddWatches />}
        />
        <Route
          path="/seller/details/add/eyewear"
          element={<SellerAddEyewear />}
        />
        <Route
          path="/seller/details/add/footwear"
          element={<SellerAddFootwear />}
        />
        <Route path="/seller/details/view" element={<SellerView />} />
        <Route path="/seller/settings" element={<SellerSettings />} />
      </Routes>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
