import { useNavigate } from "react-router-dom";
import "./sellerProdUpdate.css";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import TrackCard from "../../components/cards/trackCard/trackCard";

function SellerProdUpdate() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("sellerName");
  const sellerId = sessionStorage.getItem("sellerId");
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await api.post("/track", { sellerId: sellerId });
        console.log(value);

        setTrackData(value?.data?.response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [sellerId]);

  return (
    <div className="sellerDetailsTrackCont">
      <div className="sellerDetailsSideBarAdd">
        <div
          className="sellerNameAdd"
          onClick={() => navigate("/seller/details")}
        >
          {`Hi, ${username}`}
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/add")}
        >
          Add Products
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/view")}
        >
          View Listed Products
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/products/track")}
        >
          Track Products
        </div>
        <div
          className="sellerNameAdd"
          onClick={() => navigate("/seller/settings")}
        >
          Settings
        </div>
      </div>
      <div className="sellerDetailsTrack">
        {trackData.length > 0 ? (
          trackData.map((singleTrackData, index) => (
            <TrackCard key={index} singleTrackData={singleTrackData} />
          ))
        ) : (
          <h1>There are No Products to Track</h1>
        )}
      </div>
    </div>
  );
}

export default SellerProdUpdate;
