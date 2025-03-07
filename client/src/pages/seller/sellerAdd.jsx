import { useNavigate } from "react-router-dom";
import "./sellerAdd.css";

function SellerAdd() {
  const navigate = useNavigate();

  return (
    <div className="sellerDetailsContAdd">
      <div className="sellerDetailsSideBarAdd">
        <div
          className="sellerNameAdd"
          onClick={() => navigate("/seller/details")}
        >
          {`Hi, ${sessionStorage.getItem("sellerName") || "UserName"}`}
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/add")}
        >
          <div className="head-head">Add Products</div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/shirt");
            }}
          >
            Shirt
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/tshirt");
            }}
          >
            T-Shirt
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/pant");
            }}
          >
            Pant
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/gen");
            }}
          >
            General Clothing
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/books");
            }}
          >
            Books
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/footwear");
            }}
          >
            FootWear
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/eyewear");
            }}
          >
            EyeWear
          </div>
          <div
            className="seller-opt-gen"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/seller/details/add/watches");
            }}
          >
            Watches
          </div>
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/view")}
        >
          View Listed Products
        </div>
        <div
          className="sellerNameAdd"
          onClick={() => navigate("/seller/settings")}
        >
          Settings
        </div>
        {/* <div className="sellerNameAdd">Logout</div> */}
      </div>
      <div className="sellerDetailsMainAdd">
        <p className="info-head-1">
          <strong>Things to Keep in Mind While Adding Product Details</strong>
        </p>

        <p className="info-sub-head">
          <strong>Allowed:</strong>
        </p>
        <ul className="info-cont-2">
          <li>
            Upload multiple high-quality images of the product from different
            angles.
          </li>
          <li>
            Provide a clear and concise description, including material, color,
            and key features.
          </li>
          <li>Ensure all fields are correctly filled with accurate details.</li>
          <li>Specify available sizes and quantity in stock.</li>
          <li>Use proper pricing, including discount prices if applicable.</li>
        </ul>

        <p className="info-sub-head">
          <strong>Not Allowed:</strong>
        </p>
        <ul className="info-cont-2">
          <li>Uploading images with watermarks, logos, or low resolution.</li>
          <li>Providing misleading or false information about the product.</li>
          <li>Leaving mandatory fields empty.</li>
          <li>
            Using offensive or inappropriate words in the product description.
          </li>
          <li>
            Adding contact details or external website links in the description.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SellerAdd;
