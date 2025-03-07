import "./pl.css";
import image1 from "../../assets/images/plane1.jpg";
import image2 from "../../assets/images/plane2.jpg";
import image3 from "../../assets/images/plane3.jpg";
import image4 from "../../assets/images/plane4.jpg";
import image5 from "../../assets/images/plane5.jpg";
import { useNavigate } from "react-router-dom";

function ProductsLane() {
  const Navigate = useNavigate();

  return (
    <div className="pContainer">
      <div className="playout">
        <img
          src={image1}
          alt="clothing"
          className="prod"
          onClick={() => Navigate("/products/clothing")}
        />
        <span>Clothing</span>
      </div>
      <div className="playout">
        <img
          src={image2}
          alt="watches"
          className="prod"
          onClick={() => Navigate("/products/watches")}
        />
        <span>Watches</span>
      </div>
      <div className="playout">
        <img
          src={image3}
          alt="Books"
          className="prod"
          onClick={() => Navigate("/products/books")}
        />
        <span>Books</span>
      </div>
      <div className="playout">
        <img
          src={image4}
          alt="Eyewear"
          className="prod"
          onClick={() => Navigate("/products/eyewear")}
        />
        <span>Eyewear</span>
      </div>
      <div className="playout">
        <img
          src={image5}
          alt="Footwear"
          className="prod"
          onClick={() => Navigate("/products/footwear")}
        />
        <span>Footwear</span>
      </div>
    </div>
  );
}

export default ProductsLane;
