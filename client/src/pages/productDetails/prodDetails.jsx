import api from "../../utils/api.js";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../components/context/context";
import Navbar from "../../components/navbar/navbar";
import "./prodDetails.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ProdDetails() {
  const { singleProdData } = useContext(FilterContext);
  const uID = sessionStorage.getItem("userId");
  const uName = sessionStorage.getItem("username");
  const [size, setSize] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [imgData, setImgData] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange2 = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const notifyInfo = () => toast.info("Select a Size to Continue!");
  const notifyCartSuccess = () =>
    toast.success("Product added to Cart Successfully!");
  const notifyWishlistSuccess = () =>
    toast.success("Product added to Wishlist Successfully!");

  // console.log(singleProdData);

  const handleReviewSubmit = async () => {
    if (!selectedOption || !message || message.trim === "") {
      toast.info("Enter both Message and Ratings to Submit!");
      return;
    }

    try {
      const response = await api.post("/review", {
        userId: uID,
        prodId: singleProdData._id,
        review: message,
        rate: selectedOption,
        userName: uName,
      });
      // console.log(response.data);
      if (response) {
        toast.success("Reviw added Successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Try again later!");
    }
  };

  const handleCart = async () => {
    if (!uID) {
      toast.info("Login to Add Products to Cart!");
      return;
    }
    try {
      const data = { ...singleProdData, size: size, userId: uID };
      const response = await api.post("/cart", data);
      notifyCartSuccess();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await api.post("/review/get-data", {
          id: singleProdData._id,
        });
        console.log(response);

        if (response) {
          setReviewData(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      getReviews();
    }, 2000);
  }, [singleProdData._id]);

  const handleSizeNotSelected = () => {
    notifyInfo();
  };

  const handleImgClick = (index) => {
    setImgData(singleProdData.img[index]);
  };

  const handleSize = (val) => {
    setSize(val);
    setAllowed(true);
    setToggleSubmit(true);
  };

  async function handleWishList() {
    if (!uID) {
      toast.info("Login to Wishlist the Products!");
      return;
    }
    try {
      const data = { ...singleProdData, userId: uID };
      const response = await api.post("/products/wishlist/products-page", data);
      notifyWishlistSuccess();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="ProdDetailsContainer">
        <div className="prodImgAndInfo">
          <div className="pImg">
            <div className="singleImg">
              <img
                src={imgData || singleProdData.img[0]}
                alt="pImage"
                className="imgProps"
              />
            </div>
            <div className="multipleImg">
              {singleProdData.img.length === 1 ? (
                <img
                  src={singleProdData.img[0]}
                  alt="prodImage"
                  className="multiImg"
                />
              ) : (
                singleProdData.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="prodImage"
                    className="multiImg"
                    onClick={() => handleImgClick(index)}
                  />
                ))
              )}
            </div>
          </div>
          <div className="basicInfo">
            <div className="brandDesc">{singleProdData.prodDesc}</div>
            <div className="brandName">{singleProdData.brandName}</div>
            <div className="priceAndRating">
              <div className="prodPrice1">
                <span className="mainPrice1">
                  Price: &#8377;{singleProdData.offPrice}
                </span>
                <span className="discount1">
                  <del>&#8377;{singleProdData.price}</del>
                </span>
                <span className="offer1">({singleProdData.offer}% OFF)</span>
              </div>
              <div className="rating1">
                <span className="num1">Rating: {singleProdData.rating}</span>
                <span className="symbol1">&#9733;</span>
              </div>
            </div>
            <span className="tip">Inclusive of all taxes</span>
            <div className="size1">
              {singleProdData.size?.length > 0 ? (
                <>
                  <p>SELECT SIZE</p>
                  <div className="sizeBox">
                    {singleProdData?.size?.map((s) => (
                      <span
                        key={s}
                        className="sizeP"
                        onClick={() => handleSize(s)}
                        style={{
                          backgroundColor:
                            size === s ? "rgb(141, 139, 139)" : "",
                          color: size === s ? "white" : "",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="cartAndWishContainer">
              <span
                className="cartP"
                // style={{
                //   cursor:
                //     singleProdData.dept === "books" ||
                //     singleProdData.dept === "eyewear"
                //       ? "pointer"
                //       : allowed
                //       ? "pointer"
                //       : "not-allowed",
                // }}
                onClick={
                  singleProdData.dept === "books" ||
                  singleProdData.dept === "eyewear"
                    ? handleCart
                    : allowed
                    ? handleCart
                    : handleSizeNotSelected
                }
              >
                Add to Cart
              </span>
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
              <span className="wishP" onClick={handleWishList}>
                Wishlist
              </span>
            </div>
            {singleProdData.dept === "books" ||
            singleProdData.dept === "eyewear" ? (
              ""
            ) : !toggleSubmit ? (
              <div className="warn">Select a Size to Continue!</div>
            ) : (
              ""
            )}
            <div className="aboutItem">
              <p className="aboutItemHead">About the Item</p>
              {singleProdData?.prodInfo?.map((data, index) => (
                <li key={index + 1}>{data}</li>
              ))}
            </div>
            <div className="aboutItem">
              <p className="aboutItemHead">About the Seller</p>
              <li>
                This product comes from a trusted seller committed to offering
                only genuine and high-quality items.
              </li>
              <li>
                Carefully crafted and inspected, each item ensures durability
                and meets high standards for quality and style.
              </li>
              <li>
                Our seller guarantees authenticity, with every product backed by
                a commitment to excellence and customer satisfaction.
              </li>
              <li>
                Shop with confidence knowing that this selection has been
                curated to meet your expectations for both style and substance.
              </li>
            </div>
            <div className="custReview">
              <span className="reviewTitle">Customer Reviews</span>
              <div className="reviewBody">
                <div>
                  <label className="rev-head">Enter Review: </label>
                  <textarea
                    value={message}
                    className="text-area-review"
                    placeholder="In less than 50 words!"
                    style={{ resize: "none" }}
                    onChange={handleChange}
                  />
                </div>
                <div className="some-random-name">
                  <label className="rev-head">Enter Ratings: </label>
                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={selectedOption === "1"}
                      onChange={handleChange2}
                    />
                    1
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="2"
                      checked={selectedOption === "2"}
                      onChange={handleChange2}
                    />
                    2
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="3"
                      checked={selectedOption === "3"}
                      onChange={handleChange2}
                    />
                    3
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="4"
                      checked={selectedOption === "4"}
                      onChange={handleChange2}
                    />
                    4
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="5"
                      checked={selectedOption === "5"}
                      onChange={handleChange2}
                    />
                    5
                  </label>
                </div>
                <div onClick={handleReviewSubmit} className="review-submit-btn">
                  Submit
                </div>
                <div className="give-some-name">User Reviews</div>
                <div>
                  {reviewData.length > 0 ? (
                    reviewData.map((singleRev, index) => (
                      <div key={index + 9} className="review-display-block">
                        <div key={index}>
                          UserName: {singleRev.userName || "User"}
                        </div>
                        <div key={index + 2}>
                          Rating: {singleRev.rate}
                          <span className="symbol999">&#9733;</span>
                        </div>
                        <div key={index + 1}>Review: {singleRev.review}</div>
                      </div>
                    ))
                  ) : (
                    <h6>No Reviews Available for this Prodcut</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdDetails;
