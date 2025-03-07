import "./trackUserCard.css";

function TrackUserCard({ singleTrack }) {
  return (
    <div className="single-track-container-user">
      <div className="user-prod-img-progress-cont">
        <img
          src={singleTrack.img}
          alt="product_img"
          className="prod-user-image-1"
        />
        <p className="progress-tt">
          Progress: <span>{singleTrack.progress}</span>
        </p>
      </div>
      <div className="some-some-cont">
        <span className="p-s-cont">
          <span className="some-margin">
            Price: <span>{singleTrack?.price}</span>
          </span>
          <span className="some-margin">
            Size: <span>{singleTrack?.size ? singleTrack?.size : "N/A"}</span>
          </span>
        </span>
        <div className="quantity-track">
          Quantity: <span>{singleTrack?.quantity}</span>
        </div>
      </div>
    </div>
  );
}

export default TrackUserCard;
