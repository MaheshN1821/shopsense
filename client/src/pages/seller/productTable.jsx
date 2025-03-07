import "./productTable.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../utils/api";

const ProductTable = ({ products, updateProduct, setUpdateProduct }) => {
  const notifyInfo = () =>
    toast.info(
      "This option will be available soon, For more details contact support team."
    );
  const notifyDeleteFailure = () => toast.error("Unable to delete the record!");
  const notifyDeleteSuccess = () =>
    toast.success("Deleted the record Successfully!");

  const handleClick = () => {
    notifyInfo();
  };

  const sellerId = sessionStorage.getItem("sellerId");
  const handleDelete = async (prodId, dept, publicIds) => {
    try {
      const data = {
        sellerId: sellerId,
        prodId: prodId,
        dept: dept,
        publicIds: publicIds,
      };
      const response = await api.post("/products/data/delete", data);
      if (response.status === 200) {
        setUpdateProduct(updateProduct + 1);
      }
      setTimeout(() => {
        if (response.status === 200) {
          notifyDeleteSuccess();
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      notifyDeleteFailure();
    }
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Images</th>
              <th>Price (₹)</th>
              <th>Offer (%)</th>
              <th>Discounted Price (₹)</th>
              <th>Description</th>
              <th>Product Information</th>
              <th>Quantity</th>
              <th>Rating</th>
              <th>Product ID</th>
              <th>Sizes</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 ? (
              <tr
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "600",
                }}
              >
                <td>There</td>
                <td>is</td>
                <td>no</td>
                <td>Data</td>
                <td>to</td>
                <td>Display</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              products?.map((product, index) => (
                <tr key={index + 1}>
                  <td>{product?.brandName}</td>
                  <td>{product?.dept}</td>
                  <td>
                    {product?.for
                      ? product?.for
                      : product?.gender
                      ? product?.gender
                      : "N/A"}
                  </td>
                  <td className="image-cell">
                    {product?.img.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Product ${i + 1}`}
                        className="product-img"
                      />
                    ))}
                  </td>
                  <td>{product?.price}</td>
                  <td>{product?.offer}</td>
                  <td>{product?.offPrice}</td>
                  <td>{product?.prodDesc}</td>
                  <td>{product?.prodInfo?.join(", ")}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.rating} ⭐</td>
                  <td>{product?._id}</td>
                  <td>
                    {product?.size?.join(", ")
                      ? product?.size?.join(", ")
                      : "N/A"}
                  </td>
                  <td className="prod-edit" onClick={handleClick}>
                    Click Here
                  </td>
                  <td
                    className="prod-edit"
                    onClick={() =>
                      handleDelete(
                        product?._id,
                        product?.dept,
                        product?.publicIds
                      )
                    }
                  >
                    Click Here
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
};

export default ProductTable;
