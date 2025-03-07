import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousel.css";
import img1 from "../../assets/images/home3.jpg";
import img2 from "../../assets/images/home2.jpg";
import img3 from "../../assets/images/home1.jpg";

function Carousel() {
  return (
    <CCarousel
      controls
      indicators
      dark
      transition="crossfade"
      className="carouselContainer"
    >
      <CCarouselItem>
        <CImage className="d-block w-100 img" src={img1} alt="slide 1" />
        <CCarouselCaption className="d-md-block ctxt">
          <h5>Exciting Offers!!!</h5>
          <h3>Hurry Up!</h3>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100 img" src={img2} alt="slide 2" />
        <CCarouselCaption className="d-md-block ctxt">
          <h5>Exciting Offers!!!</h5>
          <h3>Hurry Up!</h3>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100 img" src={img3} alt="slide 3" />
        <CCarouselCaption className="d-md-block ctxt">
          <h5>Exciting Offers!!!</h5>
          <h3>Hurry Up!</h3>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
  );
}

export default Carousel;
