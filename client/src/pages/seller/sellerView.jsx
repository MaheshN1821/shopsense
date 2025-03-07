import { useNavigate } from "react-router-dom";
import "./sellerView.css";
import api from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import ProductTable from "./producttable";
import { FilterContext } from "../../components/context/context";

function SellerView() {
  const Navigate = useNavigate();
  const { updateProduct, setUpdateProduct } = useContext(FilterContext);
  const sellerID = sessionStorage.getItem("sellerId");
  const [clothingData, setClothingData] = useState([]);
  const [shirtData, setShirtData] = useState([]);
  const [tShirtData, setTShirtData] = useState([]);
  const [pantData, setPantData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [footWearData, setFootWearData] = useState([]);
  const [eyeWearData, setEyeWearData] = useState([]);
  const [watchData, setWatchData] = useState([]);

  useEffect(() => {
    const getSellerEnteredProductDetails = async () => {
      try {
        const response = await api.get(`/products/all-details/${sellerID}`);
        setClothingData(response.data?.finalData?.clothingData);
        setShirtData(response.data?.finalData?.shirtData);
        setTShirtData(response.data?.finalData?.tshirtData);
        setPantData(response.data?.finalData?.pantData);
        setBookData(response.data?.finalData?.bookData);
        setEyeWearData(response.data?.finalData?.eyeWearData);
        setFootWearData(response.data?.finalData?.footWearData);
        setWatchData(response.data?.finalData?.watchData);
      } catch (err) {
        console.log(err);
      }
    };
    getSellerEnteredProductDetails();
  }, [sellerID, updateProduct]);

  return (
    <div className="sellerDetailsContView">
      <div className="sellerDetailsSideBarView">
        <div
          className="sellerNameView"
          onClick={() => Navigate("/seller/details")}
        >
          {`Hi, ${sessionStorage.getItem("sellerName") || "UserName"}`}
        </div>
        <div
          className="sellerName"
          onClick={() => Navigate("/seller/details/add")}
        >
          Add Products
        </div>
        <div
          className="sellerName"
          onClick={() => Navigate("/seller/details/view")}
        >
          View Listed Products
        </div>
        <div
          className="sellerNameView"
          onClick={() => Navigate("/seller/settings")}
        >
          Settings
        </div>
        {/* <div className="sellerNameView">Logout</div> */}
      </div>
      <div className="sellerDetailsMainView">
        <div className="clothingData">
          <h2>Clothing Data</h2>
          {/* {clothingData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={clothingData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="shirtData">
          <h2>Shirt Data</h2>
          {/* {shirtData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={shirtData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="tshirtData">
          <h2>T-Shirt Data</h2>
          {/* {tShirtData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={tShirtData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="pantData">
          <h2>Pant Data</h2>
          {/* {pantData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={pantData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="booksData">
          <h2>Books Data</h2>
          {/* {bookData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={bookData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="eyewearData">
          <h2>Eye-Wear Data</h2>
          {/* {eyeWearData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={eyeWearData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="footwearData">
          <h2>Foot-Wear Data</h2>
          {/* {footWearData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={footWearData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="watchData">
          <h2>Watch Data</h2>
          {/* {watchData.map((cdata, index) => (
            <ProductTable products={cdata} key={index + 1} />
          ))} */}
          <ProductTable
            products={watchData}
            setUpdateProduct={setUpdateProduct}
            updateProduct={updateProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default SellerView;
