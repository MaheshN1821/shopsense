import Pcard from "../../components/cards/productPageCard/pcard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/filter/filter";
import Navbar from "../../components/navbar/navbar";
import "./products.css";
import { FilterContext } from "../../components/context/context.jsx";
import { useNavigate } from "react-router-dom";

function Books() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filterData, setSingleProdData } = useContext(FilterContext);
  const Navigate = useNavigate();

  useEffect(() => {
    setBookData(filterData);
  }, [filterData]);

  const handleClick = (index) => {
    setSingleProdData(bookData[index]);
    Navigate("/products/details");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/books"
        );
        setBookData(response.data.result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="prodContainer">
        <div className="phead">New Arrivals</div>
        <div className="innerCont">
          <Filter />
          <div className="pdisplay">
            {loading ? (
              <div className="loading-placeholder">Loading...</div>
            ) : bookData.length !== 0 ? (
              bookData.map((value, index) => (
                <Pcard
                  key={index}
                  prodId={value._id}
                  onCardClick={() => handleClick(index)}
                  img={value.img[0]}
                  rating={value.rating}
                  brandName={value.brandName}
                  prodDesc={value.prodDesc}
                  price={value.price}
                  offPrice={value.offPrice}
                  offer={value.offer}
                  images={value.img}
                  dept={value.dept}
                  bookType={value.bookType}
                  quantity={value.quantity}
                  size={value.size}
                  prodInfo={value.prodInfo}
                  sellerId={value.sellerId}
                />
              ))
            ) : (
              <div className="noContent">
                There is no products available to display for the applied
                Filters! Change the Filters!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
