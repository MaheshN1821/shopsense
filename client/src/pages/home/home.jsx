import Carousel from "../../components/carousel/carousel";
import Navbar from "../../components/navbar/navbar";
import ProductsLane from "../../components/productsLane/productsLane";
import Trend from "../../components/trendingP/trend";

function Home() {
  return (
    <>
      <Navbar />
      <ProductsLane />
      <Carousel />
      <Trend />
    </>
  );
}

export default Home;
