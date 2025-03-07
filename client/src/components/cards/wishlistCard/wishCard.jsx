import { useContext } from "react";
import "./wishCard.css";
import { FilterContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

function WishCard({
  key,
  prodId,
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
  setWishListPage,
  wishListPage,
  sellerId,
}) {
  const { setSingleProdData, update, setUpdate } = useContext(FilterContext);
  const Navigate = useNavigate();
  const uID = sessionStorage.getItem("userId");

  async function handleRemove(e) {
    e.stopPropagation();
    try {
      const data = {
        usersId: uID,
        productId: prodId,
      };
      const response = await api.post("/products/wishlist/delete", data);
      console.log(response);
      // setWishListPage(wishListPage.filter((item) => item));
      update < 1000 ? setUpdate(update + 1) : setUpdate(0);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleWishListCardClick() {
    const info = {
      prodId: prodId,
      img: images,
      prodDesc: prodDesc,
      brandName: brandName,
      price: price,
      offPrice: offPrice,
      offer: offer,
      rating: rating,
      dept: dept,
      for: forGender,
      prodType: prodType,
      size: size,
      prodInfo: prodInfo,
      sellerId: sellerId,
    };
    setSingleProdData(info);
    Navigate("/products/details");
  }

  function dummyWish() {}

  return (
    <div
      className={quantity === 0 ? "removeWishProd" : "wishProd"}
      key={key}
      onClick={quantity === 0 ? dummyWish : handleWishListCardClick}
    >
      <img src={img} alt="image" className="wishImageProp" loading="lazy" />
      <div className="wishRating">
        <span className="num">{rating}</span>
        <span className="symbol">&#9733;</span>
      </div>
      <div className="wishProdContent">
        <div className="prodDesc">
          <p className="brand">{brandName}</p>
          <p className="desc">{prodDesc}</p>
        </div>
        <div className="prodPrice">
          <span className="mainPrice">&#8377;{price}</span>
          <span className="discount">
            <del>&#8377;{offPrice}</del>
          </span>
          <span className="offer">({offer}% OFF)</span>
        </div>
        <p className="free">Free Delivery</p>
        <div className="remove" onClick={(e) => handleRemove(e)}>
          Remove from Wishlist
        </div>
      </div>
    </div>
  );
}

export default WishCard;
