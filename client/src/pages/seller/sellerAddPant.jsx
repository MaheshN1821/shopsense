import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "./sellerAddPant.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellerAddPant() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const notifyFailure = () => toast.error("Try again Later!");
  const notifySuccess = () =>
    toast.success("Product details is Successfully added!");
  const notifyUploadInfo = () => toast.info("Please select images to upload.");
  const notifyUploadFailure = () => toast.error("Image upload failed.");
  const notifyUploadSuccess = () =>
    toast.success("Images uploaded successfully!");

  const sellerID = sessionStorage.getItem("sellerId");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      notifyUploadInfo();
      return;
    }

    setUploading(true);
    const uploadedUrls = [];
    const uploadedPublicIds = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "shopSense");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/maheshn18/image/upload",
          formData
        );
        uploadedUrls.push(res.data.secure_url);
        uploadedPublicIds.push(res.data.public_id);
      } catch (error) {
        console.error("Error uploading image:", error);
        notifyUploadFailure();
      }
    }

    setUploading(false);
    setValue("img", uploadedUrls.join(","));
    // setValue("publicIds", uploadedPublicIds.join(","));
    setValue("publicIds", uploadedPublicIds);
    notifyUploadSuccess();
  };

  const onSubmit = async (data) => {
    try {
      data.img = data.img.split(",").map((url) => url.trim());
      data.size = data.size.split(",").map((s) => s.trim());
      data.prodInfo = data.prodInfo
        ? data.prodInfo.split(",").map((info) => info.trim())
        : [];
      data.price = Number(data.price);
      data.offPrice = Number(data.offPrice);
      data.quantity = Number(data.quantity);
      data.sellerId = sellerID;

      await axios.post(
        "https://shopsense-backend.vercel.app/products/clothing/pant",
        data,
        { withCredentials: true }
      );
      // alert("Product added successfully!");
      notifySuccess();
      //   navigate("/seller/details/view");
    } catch (error) {
      console.error("Error adding product", error);
      // alert("Failed to add product.");
      notifyFailure();
    }
  };

  return (
    <div className="sellerDetailsContAddShirt">
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
            className="seller-opt-gen seller-active-pant"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.178)",
              margin: "8px 0px",
              color: "white",
            }}
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
      <div className="sellerDetailsMainAddShirt">
        <div>
          <p>*Product Details must be entered one at a time!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="shirt-form">
          <div className="shirt-gender-cont">
            <label className="">Gender</label>
            <select
              {...register("gender", { required: true })}
              className="shirt-gender"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
            {errors.gender && <p className="">Gender is required.</p>}
          </div>
          <div className="size-cont">
            <label className="">Size (comma-separated)</label>
            <input
              {...register("size", { required: true })}
              placeholder="Eg: 32,34,36"
              required
            />
          </div>
          <div className="brandName-cont">
            <label className="">Brand Name</label>
            <input {...register("brandName", { required: true })} required />
          </div>
          <div className="prodDesc-cont">
            <label className="">Product Description</label>
            {/* <textarea
              {...register("prodDesc", { required: true })}
              className=""
            ></textarea> */}
            <input {...register("prodDesc", { required: true })} required />
          </div>
          <div className="prodInfo-cont">
            <label className="">Product Info (comma-separated)</label>
            {/* <input {...register("prodInfo")} className="" /> */}
            <textarea
              {...register("prodInfo", { required: true })}
              required
            ></textarea>
          </div>
          <div className="price-cont">
            <label className="">Price</label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              required
            />
          </div>
          <div className="offer-price-cont">
            <label className="">Offer Price</label>
            <input
              type="number"
              {...register("offPrice", { required: true, min: 0 })}
              required
            />
          </div>
          <div className="dept-cont">
            <label className="">Department</label>
            <select
              {...register("dept", { required: true })}
              className="shirt-gender"
              required
            >
              <option value=""></option>
              <option value="pant">Pant</option>
            </select>
          </div>
          <div className="quantity-cont">
            <label className="">Quantity</label>
            <input
              type="number"
              {...register("quantity", { min: 1 })}
              defaultValue={1}
              required
            />
          </div>
          <div className="image-upload">
            <div>
              <label className="">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="shirt-upload"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="shirt-upload-btn"
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
          <div className="shirt-final-submit-cont">
            <button type="submit" className="shirt-final-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}

export default SellerAddPant;
