import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./trackOrder.css";
import api from "../../utils/api";
import TrackUserCard from "../../components/cards/trackCard/trackUserCard";

function TrackOrder() {
  const [trackData, setTrackData] = useState([]);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.post("/track/user/products", {
          userId: userId,
        });
        console.log(response);
        if (response) {
          setTrackData(response.data?.response);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [userId]);

  return (
    <div className="some-cart-complete-margin">
      <Navbar />
      <div className="Track-prod-container">
        {trackData.length > 0 ? (
          trackData.map((singleTrack, index) => (
            <TrackUserCard key={index} singleTrack={singleTrack} />
          ))
        ) : (
          <h1 style={{ height: "60vh" }}>
            All the products are delivered! Shop New products to Track!
          </h1>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
