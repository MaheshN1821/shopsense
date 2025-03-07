import { useContext } from "react";
import CartPageNav from "../../components/cartPageNav/cartPageNav";
import "./cartAddress.css";
import { FilterContext } from "../../components/context/context";
import api from "../../utils/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function CartAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const { cartInfo } = useContext(FilterContext);
  const totalPrice = cartInfo.reduce(
    (sum, item) => sum + item.cartOffPrice * item.quantity,
    0
  );
  const userName = sessionStorage.getItem("username");

  if (totalPrice === 0) {
    Navigate("/cart");
  }

  // const paymentOptions = {
  //   address: {
  //     required: "Address is required",
  //   },
  //   pincode: {
  //     required: "pincode is required",
  //   },
  //   phone: {
  //     required: "phone number is required",
  //   },
  // };

  const paymentOptions = {
    address: {
      required: "Address is required",
      validate: (value) =>
        value.trim().split(/\s+/).length >= 10 ||
        "Address must be at least 10 words",
    },
    pincode: {
      required: "Pincode is required",
      pattern: {
        value: /^\d{6}$/,
        message: "Pincode must be exactly 6 digits",
      },
    },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Phone number must be exactly 10 digits",
      },
    },
  };

  const handleOrder = async (singleCartData, address, phone, paymentId) => {
    try {
      const data = {
        userId: singleCartData.userId,
        prodId: singleCartData.prodId,
        sellerId: singleCartData.sellerId,
        size: singleCartData.size,
        quantity: singleCartData.quantity,
        price: singleCartData.cartOffPrice,
        address: address,
        phone: phone,
        paymentId: paymentId,
        dept: singleCartData.dept,
        progress: "Ordered",
        img: singleCartData.cartImage[0],
      };
      const value = await api.post("/cart/order/confirmation/v1", data);
      console.log(value);
    } catch (err) {
      console.log(err);
      alert("something went wrong!");
    }
  };

  const handlePostOrder = async (address, phone, paymentId) => {
    cartInfo.forEach(
      async (singleCartData) =>
        await handleOrder(singleCartData, address, phone, paymentId)
    );
  };

  const handlePayment = async (address, phone) => {
    if (totalPrice == "0" || totalPrice == 0) {
      Navigate("/cart");
      return;
    }

    const MUID = "MUID" + Date.now();
    const transactionId = "T" + Date.now();
    // setPaymentId(transactionId);

    const newData = {
      name: userName,
      number: phone,
      amount: totalPrice,
      MUID: MUID,
      transactionId: transactionId,
    };

    let res = await api
      .post("/payment/order", { ...newData })
      .then(async (res) => {
        console.log(res);

        if (res.data.success === true) {
          await handlePostOrder(address, phone, transactionId);
        }

        if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href =
            res.data.data.instrumentResponse.redirectInfo.url;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(res);
  };

  const handlePrePayment = async (data) => {
    await handlePayment(data.address + " " + data.pincode, data.phone);
  };

  return (
    <div className="total-complete-cont">
      <CartPageNav />
      <div className="cart-address-cont">
        <form onSubmit={handleSubmit(handlePrePayment)} className="paypage">
          <div className="cart-some-name">
            <label>Enter Full Delivery Address: </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder=" "
              required
              {...register("address", paymentOptions.address)}
            />
            {errors.address && (
              <p className="error-cart">{errors.address.message}</p>
            )}
          </div>
          <div className="cart-some-name">
            <label>Enter the Pin-Code: </label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              required
              placeholder=" "
              {...register("pincode", paymentOptions.pincode)}
            />
            {errors.pincode && (
              <p className="error-cart">{errors.pincode.message}</p>
            )}
          </div>
          <div className="cart-some-name">
            <label>Enter Phone Number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              placeholder=" "
              {...register("phone", paymentOptions.phone)}
            />
            {errors.phone && (
              <p className="error-cart">{errors.phone.message}</p>
            )}
          </div>
          <div className="cart-some-name-one">
            <p className="cart-note">
              Note: Products will be delivered to above address!
            </p>
            <button type="submit" className="payBtn">
              Proceed To Pay {totalPrice}!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CartAddress;
