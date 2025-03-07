import "./cartPageNav.css";
import logo from "../../assets/images/logo.jpg";
import { useNavigate, useLocation } from "react-router-dom";

function CartPageNav() {
  const Navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  return (
    <nav>
      <img
        src={logo}
        alt="logo"
        className="logo"
        onClick={() => Navigate("/")}
      />
      <div className="cartnavhead">
        <span
          style={{
            borderBottom:
              location.pathname === "/cart" ? "1px solid black" : "",
            paddingBottom: location.pathname === "/cart" ? "5px" : "",
          }}
        >
          Order Summary
        </span>
        <span
          style={{
            borderBottom:
              location.pathname === "/cart/address" ? "1px solid black" : "",
            paddingBottom: location.pathname === "/cart/address" ? "5px" : "",
          }}
        >
          Address/Payment
        </span>
        <span onClick={() => Navigate("/cart/track")}>Track Order's</span>
      </div>

      <div className="login-cart-page-nav">
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
          <span className="uName">{username}</span>
        ) : (
          <span onClick={() => Navigate("/login")}>Login</span>
        )}
        {/* <span onClick={() => Navigate("/login")}>Login</span> */}
      </div>
    </nav>
  );
}

export default CartPageNav;
