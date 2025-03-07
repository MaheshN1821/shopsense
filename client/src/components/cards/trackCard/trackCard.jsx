import { useState } from "react";
import "./trackCard.css";
import api from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";

function TrackCard({ singleTrackData }) {
  const [show, setShow] = useState(false);
  const handleTrackClick = () => {
    setShow(!show);
  };

  const handlePacking = async () => {
    try {
      const response = await api.post("/track/update", {
        trackingId: singleTrackData._id,
        msg: "Packing",
      });
      console.log(response);
      toast.success("Progress Updated Successfully! Refresh the page!");
      setShow(false);
    } catch (err) {
      toast.error("Try again later!");
      console.log(err);
    }
  };
  const handleInTransit = async () => {
    try {
      const response = await api.post("/track/update", {
        trackingId: singleTrackData._id,
        msg: "In-Transit",
      });
      console.log(response);
      toast.success("Progress Updated Successfully! Refresh the page!");
      setShow(false);
    } catch (err) {
      toast.error("Try again later!");
      console.log(err);
    }
  };
  const handleDelivered = async () => {
    try {
      const response = await api.post("/track/update", {
        trackingId: singleTrackData._id,
        msg: "Delivered",
      });
      console.log(response);
      toast.success("Progress Updated Successfully! Refresh the page!");
      setShow(false);
    } catch (err) {
      toast.error("Try again later!");
      console.log(err);
    }
  };

  return (
    <div className="some-track-head">
      <div className="some-img-cont">
        <img
          src={singleTrackData.img}
          alt="product_image"
          className="some-track-image"
        />
      </div>
      <p className="some-progress">Progress: {singleTrackData?.progress}</p>
      <div className="some-other-container">
        <p>
          User Id:{" "}
          <span className="some-cont-values-id">{singleTrackData?.userId}</span>
        </p>
        <p>
          Phone Number:{" "}
          <span className="some-cont-values">{singleTrackData?.phone}</span>
        </p>
        <p>
          Address:{" "}
          <span className="some-cont-values">{singleTrackData?.address}</span>
        </p>
        <p>
          Price:{" "}
          <span className="some-cont-values">{singleTrackData?.price}</span>
        </p>
        <p>
          Payment Id:{" "}
          <span className="some-cont-values">{singleTrackData?.paymentId}</span>
        </p>
        <p>
          Quantity:{" "}
          <span className="some-cont-values">{singleTrackData?.quantity}</span>
        </p>
        <p>
          Size:{" "}
          <span className="some-cont-values">
            {singleTrackData?.size ? singleTrackData?.size : "N/A"}
          </span>
        </p>
      </div>
      <div className="update-progress-btn-some" onClick={handleTrackClick}>
        Update Progress
      </div>
      <div
        className="extra-other-options"
        style={{ display: show ? "flex" : "none" }}
      >
        <span className="i-dont-know" onClick={handlePacking}>
          Packing
        </span>
        <span className="i-dont-know" onClick={handleInTransit}>
          In-Transit
        </span>
        <span className="i-dont-know" onClick={handleDelivered}>
          Delivered
        </span>
      </div>
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
    </div>
  );
}

export default TrackCard;
