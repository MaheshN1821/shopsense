import { useNavigate } from "react-router-dom";
import "./sellerDetails.css";

function SellerDetails() {
  const Navigate = useNavigate();
  const handleSellerLogout = () => {
    sessionStorage.clear();
    Navigate("/seller");
  };
  const sellerName = sessionStorage.getItem("sellerName");
  if (!sellerName) {
    return Navigate("/seller/login");
  }
  return (
    <div className="sellerDetailsCont">
      <div className="sellerDetailsSideBar">
        <div className="sellerName" onClick={() => Navigate("/seller/details")}>
          {`Hi, ${sellerName}`}
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
          className="sellerName"
          onClick={() => Navigate("/seller/products/track")}
        >
          Track Products
        </div>
        <div
          className="sellerName"
          onClick={() => Navigate("/seller/settings")}
        >
          Settings
        </div>
        <div className="sellerName" onClick={handleSellerLogout}>
          Logout
        </div>
      </div>
      <div className="sellerDetailsMain">
        <p className="sellerWelcome">Welcome to ShopSense!</p>
      </div>
    </div>
  );
}

export default SellerDetails;
