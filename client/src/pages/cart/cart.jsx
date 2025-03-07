import api from "../../utils/api.js";
import { useContext, useEffect, useState } from "react";
// import Navbar from "../../components/navbar/navbar";
import CartCard from "../../components/cards/cartCard/cartCard.jsx";
import "./cart.css";
import { FilterContext } from "../../components/context/context.jsx";
import CartPageNav from "../../components/cartPageNav/cartPageNav.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Cart() {
  const { update, setUpdate, setCartInfo } = useContext(FilterContext);
  const Navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [cPrice, setCPrice] = useState(0);
  const [cOffPrice, setCOffPrice] = useState(0);
  const userID = sessionStorage.getItem("userId");

  async function handleRemoveAll() {
    try {
      const response = await api.post("/cart/delete-all", { id: userID });
      console.log(response);
      update < 1000 ? setUpdate(update + 1) : setUpdate(0);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getCartData() {
      try {
        const data = await api.post("/cart/details", { userId: userID });
        setCartData(data.data.response);
        // console.log(data.data);

        const info = data.data.response;
        // console.log(info);

        const cRes = info.reduce(
          (sum, item) => sum + item.quantity * item.cartPrice,
          0
        );
        const cOffRes = info.reduce(
          (sum, item) => sum + item.quantity * item.cartOffPrice,
          0
        );

        setCPrice(cRes);
        setCOffPrice(cOffRes);
        // console.log(data.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getCartData();
  }, [userID, update]);

  const handlePlaceOrder = () => {
    if (!userID) {
      toast.info("Login to Place an Order!");
      return;
    }
    if (cPrice === 0 || cPrice === "0") {
      toast.info("Add some Products to Cart to place an order!");
      return;
    }
    setCartInfo(cartData);
    Navigate("/cart/address");
  };

  return (
    <>
      <CartPageNav />
      <div className="cartContainer">
        <div className="displayProd">
          <span className="cartHeading">
            {cartData.length === 0 ? (
              ""
            ) : (
              <>
                <span className="cartHead">Products in the Cart: </span>{" "}
                <h1 className="remOpt" onClick={handleRemoveAll}>
                  Remove All
                </h1>
              </>
            )}
          </span>
          {cartData.length === 0 ? (
            userID ? (
              <div>
                <p className="alert">
                  Your bag is so empty, Add some Products!
                </p>
              </div>
            ) : (
              <div>
                <p className="alert">
                  There are no products to display, Sign In to your Account for
                  more information!
                </p>
              </div>
            )
          ) : (
            cartData.map((single, index) => (
              <CartCard
                key={index}
                cartimg={single.cartImage[0]}
                cartProdDesc={single.cartProdDesc}
                cartBrandName={single.cartBrandName}
                size={single.size}
                cartPrice={single.cartPrice}
                cartOffPrice={single.cartOffPrice}
                cartOffer={single.cartOffer}
                dept={single.dept}
                userID={single.userId}
                prodID={single.prodId}
                // cartData={cartData}
                // setCartData={setCartData}
                quantity={single.quantity}
                totalAvailable={single.totalAvailable}
                // setTotalAvail={setTotalAvail}
                // totalAvail={totalAvail}
              />
            ))
          )}
        </div>
        <div className="orderSummary">
          <p className="cHead">Order Summary </p>
          <div>
            <p className="pHead">Price Details </p>
            <div className="billDetails">
              <p className="forPosition">
                {/* Total MRP <span className="end">&#8377;{cOffPrice}</span> */}
                Total MRP <span className="end">&#8377;{cPrice}</span>
              </p>
              <p className="forPosition">
                Discount on MRP{" "}
                {/* <span className="end">- &#8377;{cOffPrice - cPrice}</span> */}
                <span className="end">- &#8377;{cPrice - cOffPrice}</span>
              </p>
              <p className="forPosition">
                Platform Fee
                <span className="end">
                  <del className="toBeDeleted">&#8377;40</del>
                  <span className="toBeGreen">FREE</span>
                </span>
              </p>
              <p className="forPosition">
                Shipping Fee{" "}
                <span className="end">
                  <del className="toBeDeleted">&#8377;40</del>
                  <span className="toBeGreen">FREE</span>
                </span>
              </p>
            </div>
          </div>
          <div className="ending">
            <div className="forPosition">
              <span>Total Amount</span>
              <span className="end">&#8377;{cOffPrice}</span>
            </div>
            <p className="placeOrder" onClick={handlePlaceOrder}>
              PLACE ORDER
            </p>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </>
  );
}

export default Cart;
