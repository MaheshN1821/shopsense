import "./seller.css";
import sellerLogo from "../../assets/images/logo.jpg";
import sellerHero1 from "../../assets/images/seller1.jpg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Seller() {
  const aboutRef = useRef(null);
  const Navigate = useNavigate();
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="sellerCont">
        <div className="sellerNav">
          <div className="sellerNavLogo">
            <img src={sellerLogo} alt="sellerLogo" className="sellerLogo" />
          </div>
          <div className="sellerNavContents">
            <span className="sellCont">Home</span>
            <span
              className="sellCont"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </span>
            <span
              className="sellCont"
              onClick={() => Navigate("/seller/login")}
            >
              Login
            </span>
            <span
              className="sellCont"
              onClick={() => Navigate("/seller/register")}
            >
              Register
            </span>
          </div>
        </div>
        <div className="sellerHero">
          <div className="extra-shape">
            <p className="sellerText">Become a Partner, Sell Online!</p>
          </div>
          <img src={sellerHero1} alt="hero" className="sellerHeroProp" />
        </div>
        <div className="sellerContent" ref={aboutRef}>
          <div className="seller-white-bg">
            <p className="sellerWhyHead">Why ShopSense?</p>
            <p className="seller-gen">
              Expand your business by showcasing your products to a vast
              audience across different regions. Our easy-to-use platform
              ensures seamless product listing, order management, and payment
              processing.Need help? Our expert support team is available 24/7 to
              assist you at every step. Start selling with no hidden fees or
              setup costs. You only pay a small commission per sale. Build a
              trusted online presence and scale your business with ShopSense.
            </p>
          </div>
        </div>
        {/* <div className="sellerFooter">Footer</div> */}
      </div>
    </>
  );
}

export default Seller;
