import { useState } from "react";
import axios from "axios";
import "./pcardd.css";
import { ToastContainer, toast } from "react-toastify";

function Pcard({
  key,
  prodId,
  onCardClick,
  img,
  rating,
  brandName,
  prodDesc,
  price,
  offPrice,
  offer,
  images,
  dept,
  forGender,
  prodType,
  quantity,
  size,
  prodInfo,
  sellerId,
}) {
  const [toggleColor, setToggleColor] = useState(false);
  const userId = sessionStorage.getItem("userId");

  async function handleToggleColor(event) {
    event.stopPropagation();

    if (!userId) {
      toast.info("Login to Wishlist the Products!");
      return;
    }

    setToggleColor(!toggleColor);
    const info = {
      wishlistImage: images,
      wishlistRating: rating,
      wishlistBrandName: brandName,
      wishlistProdDesc: prodDesc,
      wishlistPrice: price,
      wishlistOffPrice: offPrice,
      wishListOffer: offer,
      usrID: userId,
      prodID: prodId,
      dept: dept,
      wishListFor: forGender,
      wishListProdType: prodType,
      quantity: quantity,
      size: size,
      prodInfo: prodInfo,
      sellerId: sellerId,
    };
    const response = await axios.post(
      "http://localhost:3000/products/wishlist",
      JSON.stringify(info),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response.status == 200
      ? toast.success("Product is added to Wishlist!")
      : "";
    // console.log(response);
  }

  function dummy() {}
  return (
    <div
      className={quantity === 0 ? "noStock , singleProd" : "singleProd"}
      key={key}
      onClick={quantity === 0 ? dummy : onCardClick}
    >
      <img src={img} alt="image" className="imageProp" loading="lazy" />
      <div
        className="wishlist"
        onClick={quantity === 0 ? dummy : (event) => handleToggleColor(event)}
      >
        <span className="heart" style={{ color: toggleColor ? "red" : "grey" }}>
          &#9829;
        </span>
        <span className={quantity === 0 ? "remove-wish" : "add"}>
          Wishlist?
        </span>
      </div>
      <div className="rating">
        <span className="num">{rating}</span>
        <span className="symbol">&#9733;</span>
      </div>
      <div className="singleProdContent">
        <div className="prodDesc">
          <p className="brand">{brandName}</p>
          <p className="desc">{prodDesc}</p>
        </div>
        <div className="prodPrice">
          <span className="mainPrice">&#8377;{offPrice}</span>
          <span className="discount">
            <del>&#8377;{price}</del>
          </span>
          <span className="offer">({offer}% OFF)</span>
        </div>
        <p className="free">Free Delivery</p>
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
  );
}

export default Pcard;
