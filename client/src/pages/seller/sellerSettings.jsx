import { useNavigate } from "react-router-dom";
import "./sellerSettings.css";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm } from "react-hook-form";

function SellerSettings() {
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState([]);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const name = sessionStorage.getItem("sellerName");
  const sellerId = sessionStorage.getItem("sellerId");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getSellerData = async () => {
      try {
        const val = await api.get(`/seller/get-details/${sellerId}`);
        setSellerData(val.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getSellerData();
  }, [sellerId]);

  const onboardOptions = {
    username: {
      required: "UserName is required!",
    },
    email: {
      required: "UserName is required!",
    },
    businessName: {
      required: "Business Name is required",
      maxLength: { value: 20, message: "Maximum length is 20" },
    },
    businessType: {
      required: "Business type is required",
    },
    gstNum: {
      required: "GST Number is required",
    },
    panNum: {
      required: "PAN Number is required",
    },
    permanentAddress: {
      required: "Permanent Address is required",
    },
    businessAddress: {
      required: "Business Address is required",
    },
  };

  const onSubmit = async (data) => {
    try {
      const newData = { ...data, sellerId: sellerId };
      const result = await api.post("/seller/details-updation", newData);
      console.log(result);

      if (result.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sellerDetailsContSettings">
      <div className="sellerDetailsSideBarSettings">
        <div
          className="sellerNameAdd"
          onClick={() => navigate("/seller/details")}
        >
          Hi {name}, Welcome
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/add")}
        >
          <div>Add Products</div>
          {/* <div
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
          </div> */}
        </div>
        <div
          className="sellerName"
          onClick={() => navigate("/seller/details/view")}
        >
          View Listed Products
        </div>
        <div
          className="sellerNameAdd head-head"
          //   className=""
          onClick={() => navigate("/seller/settings")}
        >
          Settings
        </div>
        {/* <div className="sellerNameAdd">Logout</div> */}
      </div>
      <div className="sellerDetailsMainSettings">
        <p className="info-head-1">
          <strong>Settings</strong>
        </p>
        <div className="seller-container">
          <div className="user-info">
            <p>
              <strong>User Name:</strong> {sellerData?.username}
            </p>
            <p>
              <strong>Email:</strong> {sellerData?.email}
            </p>
          </div>
          <div className="seller-info-head">Seller Information</div>
          <div className="seller-info">
            <p>
              <strong>Business Name:</strong>{" "}
              {sellerData?.sellerInfo?.businessName}
            </p>
            <p>
              <strong>Business Type:</strong>{" "}
              {sellerData?.sellerInfo?.businessType}
            </p>
            <p>
              <strong>GST Number:</strong> {sellerData?.sellerInfo?.gstNum}
            </p>
            <p>
              <strong>PAN Number:</strong> {sellerData?.sellerInfo?.panNum}
            </p>
            <p>
              <strong>Business Address:</strong>{" "}
              {sellerData?.sellerInfo?.businessAddress}
            </p>
            <p>
              <strong>Permanent Address:</strong>{" "}
              {sellerData?.sellerInfo?.permanentAddress}
            </p>
          </div>
          <div
            className="update-float"
            onClick={() => setDisplayUpdate(!displayUpdate)}
          >
            Update
          </div>
        </div>
        <div
          className="seller-update-form"
          style={{ display: displayUpdate ? "flex" : "none" }}
        >
          <div className="info-head-1000">Update Your Details</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="input-field contPos">
              <input
                type="text"
                name="username"
                id="username"
                placeholder=" "
                {...register("username", onboardOptions.username)}
              ></input>
              <label htmlFor="username">User Name</label>
            </div>
            {errors.username && (
              <span className="SellerErrReg">{errors.username.message}</span>
            )}
            <div className="input-field contPos">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                {...register("email", onboardOptions.email)}
              ></input>
              <label htmlFor="username">Email</label>
            </div>
            {errors.email && (
              <span className="SellerErrReg">{errors.email.message}</span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="businessName"
                id="businessName"
                placeholder=" "
                {...register("businessName", onboardOptions.businessName)}
              ></input>
              <label htmlFor="businessName">Business Name</label>
            </div>
            {errors.businessName && (
              <span className="SellerErrReg">
                {errors.businessName.message}
              </span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="businessType"
                id="businessType"
                placeholder=" "
                {...register("businessType", onboardOptions.businessType)}
              />
              <label htmlFor="businessType">Business Type</label>
            </div>
            {errors.businessType && (
              <span className="SellerErrReg">
                {errors.businessType.message}
              </span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="gstNum"
                id="gstNum"
                placeholder=" "
                {...register("gstNum", onboardOptions.gstNum)}
              />
              <label htmlFor="gstNum">GST Number</label>
            </div>
            {errors.gstNum && (
              <span className="SellerErrReg">{errors.gstNum.message}</span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="panNum"
                id="panNum"
                placeholder=" "
                {...register("panNum", onboardOptions.panNum)}
              />
              <label htmlFor="panNum">PAN Number</label>
            </div>
            {errors.panNum && (
              <span className="SellerErrReg">{errors.panNum.message}</span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="permanentAddress"
                id="permanentAddress"
                placeholder=" "
                {...register(
                  "permanentAddress",
                  onboardOptions.permanentAddress
                )}
              />
              <label htmlFor="permanentAddress">Permanent Address</label>
            </div>
            {errors.permanentAddress && (
              <span className="SellerErrReg">
                {errors.permanentAddress.message}
              </span>
            )}
            <div className="input-field contPos">
              <input
                type="text"
                name="businessAddress"
                id="businessAddress"
                placeholder=" "
                {...register("businessAddress", onboardOptions.businessAddress)}
              />
              <label htmlFor="businessAddress">Business Address</label>
            </div>
            {errors.businessAddress && (
              <span className="SellerErrReg">
                {errors.businessAddress.message}
              </span>
            )}
            <div className="btn-container">
              <button className="btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerSettings;
