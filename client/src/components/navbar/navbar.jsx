import "./navbar.css";
import logo from "../../assets/images/logo.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

function Navbar() {
  const { register, handleSubmit } = useForm();
  const [showOption, setShowOption] = useState(false);
  const [cartNum, setCartNum] = useState(0);
  const [wishlistNum, setWishlistNum] = useState(0);
  const Navigate = useNavigate();

  const submit = (data) => {
    let res = data.query;
    res = res.toLowerCase();
    if (
      res.includes("shirt") ||
      res.includes("pant") ||
      res.includes("clothes") ||
      res.includes("clothing") ||
      res.includes("tshirt")
    ) {
      Navigate("/products/clothing");
    } else if (res.includes("book") || res.includes("books")) {
      Navigate("/products/books");
    } else if (
      res.includes("eye") ||
      res.includes("eyewear") ||
      res.includes("goggles") ||
      res.includes("spectacles")
    ) {
      Navigate("/products/eyewear");
    } else if (
      res.includes("foot") ||
      res.includes("footwear") ||
      res.includes("shoe") ||
      res.includes("shoes") ||
      res.includes("slipper") ||
      res.includes("slippers")
    ) {
      Navigate("/products/footwear");
    } else if (
      res.includes("watch") ||
      res.includes("watches") ||
      res.includes("digital") ||
      res.includes("analogue")
    ) {
      Navigate("/products/watches");
    }
  };

  const uId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    Navigate("/login");
  };

  useEffect(() => {
    async function getCartItems() {
      try {
        const c_num = await api.post("/count/cart", {
          userId: uId,
        });
        setCartNum(c_num.data.num);
      } catch (err) {
        console.log(err);
      }
    }

    async function getWishlistItems() {
      try {
        const w_num = await api.post("/count/wishlist", {
          userId: uId,
        });
        setWishlistNum(w_num.data.num);
      } catch (err) {
        console.log(err);
      }
    }

    getCartItems();
    getWishlistItems();
  }, [uId]);

  return (
    <nav className="nav-bar-769-1024">
      <div className="nav-top-contents">
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => Navigate("/")}
        />
        <div>
          <form onSubmit={handleSubmit(submit)} className="search">
            <input
              type="text"
              name="query"
              id="query"
              placeholder="Search here!"
              {...register("query")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26px"
              height="26px"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              onClick={handleSubmit(submit)}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </form>
        </div>
      </div>
      <div className="nav-top-other-contents">
        <div className="login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="22"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          {username ? (
            <>
              {" "}
              <span
                className="uName"
                onClick={() => setShowOption(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowOption(false);
                  }, 3000)
                }
              >
                {username}
              </span>
              <div
                className="extraaa-con"
                style={{ display: showOption ? "block" : "none" }}
              >
                <div
                  className="track-navbar"
                  onClick={() => Navigate("/cart/track")}
                >
                  Track Your Order
                </div>
                <div className="navbar-logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            </>
          ) : (
            <span onClick={() => Navigate("/login")}>Login</span>
          )}
        </div>
        <div className="cart" onClick={() => Navigate("/cart")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="28"
            fill="currentColor"
            className="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <span className="number-of-items">{cartNum}</span>
          <span>Cart</span>
        </div>
        <div className="wish" onClick={() => Navigate("/products/wishlist")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="23"
            // width="22"
            // height="20"
            fill="currentColor"
            className="bi bi-heart fBold"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
          <span className="number-of-items-wish">{wishlistNum}</span>
          <span className="abc">Wishlist</span>
        </div>
        <div className="sell" onClick={() => Navigate("/seller")}>
          <span>Become A Seller</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
