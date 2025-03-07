import "./trend.css";
import img1 from "../../assets/images/clothing/men11.jpg";
import img2 from "../../assets/images/watches/watch41.jpg";
import img3 from "../../assets/images/books/book4.jpg";
import img4 from "../../assets/images/eyewear/spec4.jpg";
import img5 from "../../assets/images/footwear/shoe1.jpg";
import { useNavigate } from "react-router-dom";

function Trend() {
  const Navigate = useNavigate();

  return (
    <div className="trendBg">
      <span className="ttitle">Trending!</span>
      <div className="trendContainer">
        <div
          className="trendCard"
          onClick={() => Navigate("/products/clothing")}
        >
          <div className="imgContainer">
            <img
              src={img1}
              alt="trendingCard"
              width="240px"
              height="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="trendCardText">
            <p className="head">Casuals</p>
            <p className="s">Shop Now!</p>
            <p className="off">Up to 40% off</p>
          </div>
        </div>
        <div
          className="trendCard"
          onClick={() => Navigate("/products/watches")}
        >
          <div className="imgContainer">
            <img
              src={img2}
              alt="trendingCard"
              width="240px"
              height="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="trendCardText">
            <p className="head">Watches</p>
            <p className="s">Shop Now!</p>
            <p className="off">Up to 15% off</p>
          </div>
        </div>
        <div className="trendCard" onClick={() => Navigate("/products/books")}>
          <div className="imgContainer">
            <img
              src={img3}
              alt="trendingCard"
              width="240px"
              height="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="trendCardText">
            <p className="head">Books</p>
            <p className="s">Shop Now!</p>
            <p className="off">Up to 200&#8377; off</p>
          </div>
        </div>
        <div
          className="trendCard"
          onClick={() => Navigate("/products/eyewear")}
        >
          <div className="imgContainer">
            <img
              src={img4}
              alt="trendingCard"
              width="240px"
              height="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="trendCardText">
            <p className="head">Eyewear</p>
            <p className="s">Shop Now!</p>
            <p className="off">Up to 30% off</p>
          </div>
        </div>
        <div
          className="trendCard"
          onClick={() => Navigate("/products/footwear")}
        >
          <div className="imgContainer">
            <img
              src={img5}
              alt="trendingCard"
              width="240px"
              height="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="trendCardText">
            <p className="head">Footwear</p>
            <p className="s">Shop Now!</p>
            <p className="off">New Collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trend;
