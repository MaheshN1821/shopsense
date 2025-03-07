import { useForm } from "react-hook-form";
import "./sellerRegis.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function SellerRegis() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        "http://localhost:3000/auth/seller/register",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      response.status === 201 ? Navigate("/seller/onboard") : "";
    } catch (err) {
      console.log(err);
    }
  };

  const registerOptions = {
    username: {
      required: "Username is required",
      maxLength: { value: 20, message: "Maximum length is 20" },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) ||
          "Password must contain at least 1 uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) ||
          "Password must contain at least 1 lowercase letter",
        hasDigit: (value) =>
          /\d/.test(value) || "Password must contain at least 1 digit",
        hasSpecialChar: (value) =>
          /[@$!%*?&]/.test(value) ||
          "Password must contain at least 1 special character",
        minLength: (value) =>
          value.length >= 8 || "Password must be at least 8 characters long",
      },
    },
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="backg-2">
      <div className="sellerRegContainer-1">
        <div className="SellerRegHeading">SignUp</div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-field contPos">
            <input
              type="text"
              name="username"
              id="username"
              placeholder=" "
              {...register("username", registerOptions.username)}
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
              type="email"
              name="email"
              id="userEmail"
              placeholder=" "
              {...register("email", registerOptions.email)}
            />
            <label htmlFor="userEmail">Email</label>
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
          {errors.email && (
            <span className="SellerErrReg">{errors.email.message}</span>
          )}
          <div className="input-field contPos">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="userPassword"
              placeholder=" "
              {...register("password", registerOptions.password)}
            />
            <label htmlFor="userPassword">Password</label>
            <svg
              className="svgEdit"
              onClick={togglePassVisibility}
              viewBox="0 0 576 512"
              height="20px"
              width="20px"
              style={{ cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
          </div>
          {errors.password && (
            <span className="SellerErrReg">{errors.password.message}</span>
          )}
          <div className="btn-container">
            <button className="btn">SignUp</button>
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

export default SellerRegis;
