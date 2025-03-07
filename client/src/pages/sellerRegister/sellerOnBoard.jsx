import { useForm } from "react-hook-form";
import "./sellerOnBoard.css";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function SellerOnBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        "https://shopsense-backend.vercel.app/auth/seller/onboard",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      response.status === 200 ? Navigate("/seller/login") : "";
    } catch (err) {
      console.log(err);
    }
  };

  const onboardOptions = {
    username: {
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

  return (
    <div className="backg-1">
      <div className="sellerRegContainerOnboard">
        <div className="SellerRegHeading">OnBoarding</div>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
          </div>
          {errors.username && (
            <span className="SellerErrReg">{errors.username.message}</span>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
          </div>
          {errors.businessName && (
            <span className="SellerErrReg">{errors.businessName.message}</span>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
          </div>
          {errors.businessType && (
            <span className="SellerErrReg">{errors.businessType.message}</span>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
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
              {...register("permanentAddress", onboardOptions.permanentAddress)}
            />
            <label htmlFor="permanentAddress">Permanent Address</label>
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
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
            <svg
              className="svgEdit"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
          </div>
          {errors.businessAddress && (
            <span className="SellerErrReg">
              {errors.businessAddress.message}
            </span>
          )}
          <div className="btn-container">
            <button className="btn">OnBoard</button>
          </div>
          <span className="link">
            <span>Already have a Seller Account? </span>
            <span
              onClick={() => Navigate("/seller/login")}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Login
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SellerOnBoard;
