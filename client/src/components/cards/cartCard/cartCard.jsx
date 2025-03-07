import { useContext, useState } from "react";
import api from "../../../utils/api";
import Modal from "@mui/material/Modal";
import "./cartCard.css";
import { FilterContext } from "../../context/context";

function CartCard({
  cartimg,
  cartProdDesc,
  cartBrandName,
  size,
  cartPrice,
  cartOffPrice,
  cartOffer,
  dept,
  userID,
  prodID,
  // cartData,
  // setCartData,
  quantity,
  totalAvailable,
  // setTotalAvail,
  // totalAvail,
}) {
  // const [counter, setCounter] = useState(quantity);
  const [openDecModal, setOpenDecModal] = useState(false);
  const [openIncModal, setOpenIncModal] = useState(false);
  const { update, setUpdate } = useContext(FilterContext);

  const handleDecModalClose = () => setOpenDecModal(false);
  const handleIncModalClose = () => setOpenIncModal(false);

  async function updateQuan(val) {
    try {
      let data = {
        quant: val,
        dept: dept,
        userId: userID,
        prodId: prodID,
      };
      let res = await api.post("/cart/details/quantity", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      update < 1000 ? setUpdate(update + 1) : setUpdate(0);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCounterDec = async () => {
    if (quantity > 1) {
      updateQuan(quantity - 1);
    }
    setOpenDecModal(false);
  };

  const handleCounterInc = () => {
    if (quantity < totalAvailable) {
      updateQuan(quantity + 1);
    }
    setOpenIncModal(false);
  };

  // const handleCounterInc = () => {
  //   if (counter < 10) setCounter(counter + 1);
  //   counter == 9 ? updateQuan(10) : updateQuan(counter + 1);
  //   setOpenIncModal(false);
  // };

  const handleSingleProdDeletion = async () => {
    try {
      const data = {
        userId: userID,
        prodId: prodID,
      };
      const response = await api.post("/cart/singleProdDelete", data);
      update < 1000 ? setUpdate(update + 1) : setUpdate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    //cartCard
    <div className={quantity === 0 ? "removeCartCard" : "cartCard"}>
      <img src={cartimg} alt="cardImage" className="cartImg" />
      <div className="cardCont">
        <p className="brandDes">{cartProdDesc}</p>
        <p className="brandNam">{cartBrandName}</p>
        <span className="sizeAndQuant">
          <span className="size">
            Size: {dept === "books" || dept === "eyewear" ? "N/A" : size}
          </span>
          <div className="number-control">
            <div className="number-left" onClick={() => setOpenDecModal(true)}>
              -
            </div>
            <Modal
              className="mainModal"
              open={openDecModal}
              onClose={handleDecModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="Mstyle">
                {quantity === 1 ? (
                  <>
                    <p className="bg_color">
                      This is the minimum limit cannot reduce more!
                    </p>
                    <span className="back" onClick={handleDecModalClose}>
                      GO BACK
                    </span>
                  </>
                ) : (
                  <>
                    <p className="bg_color">
                      Do you want to Reduce the quantity by One[1]?
                    </p>
                    <span className="mCont">
                      <span className="yes" onClick={handleCounterDec}>
                        YES
                      </span>
                      <span className="back" onClick={handleDecModalClose}>
                        GO BACK
                      </span>
                    </span>
                  </>
                )}
              </div>
            </Modal>
            <span className="numCount">{quantity}</span>
            <div className="number-right" onClick={() => setOpenIncModal(true)}>
              +
            </div>
            <Modal
              className="mainModal"
              open={openIncModal}
              onClose={handleIncModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="Mstyle">
                <p className="bg_color">
                  {quantity === totalAvailable
                    ? `There are only ${totalAvailable} available!`
                    : "Do you want to Increase the quantity by One[1]?"}
                </p>
                <span className="mCont">
                  <span
                    className="yes"
                    style={{
                      display: quantity !== totalAvailable ? "block" : "none",
                    }}
                    onClick={handleCounterInc}
                  >
                    YES
                  </span>
                  <span className="back" onClick={handleIncModalClose}>
                    GO BACK
                  </span>
                </span>
              </div>
            </Modal>
          </div>
        </span>
        <div className="cartPrice">
          <span className="mainCartPrice">Price: &#8377;{cartOffPrice}</span>
          <span className="cartDiscount">
            <del>&#8377;{cartPrice}</del>
          </span>
          <span className="cartOffer">({cartOffer}% OFF)</span>
        </div>
        <p className="terrible">
          <span className="seven">7 days</span> return available
        </p>
        <span className="close" onClick={handleSingleProdDeletion}>
          X
        </span>
        {totalAvailable > 0 && totalAvailable < 5 ? (
          <span className="remainWarning">{`Only ${totalAvailable} Available!`}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CartCard;

// import { useState } from "react";
// import api from "../../../utils/api";
// import Modal from "@mui/material/Modal";
// import "./cartCard.css";

// function CartCard({
//   cartimg,
//   cartProdDesc,
//   cartBrandName,
//   size,
//   cartPrice,
//   cartOffPrice,
//   cartOffer,
//   dept,
//   userID,
//   prodID,
//   cartData,
//   setCartData,
// }) {
//   const [counter, setCounter] = useState(1);
//   const [open, setOpen] = useState(false);

//   const handleClose = () => setOpen(false);

//   const handleCounterDec = () => {
//     counter >= 2 ? setCounter(counter - 1) : setCounter(1);
//     setOpen(false);
//   };

//   const handleCounterInc = () => {
//     counter <= 9 ? setCounter(counter + 1) : setCounter(10);
//     setOpen(false);
//   };

//   const handleSingleProdDeletion = async () => {
//     try {
//       const data = {
//         userId: userID,
//         prodId: prodID,
//       };
//       const response = await api.post("/cart/singleProdDelete", data);
//       // response.status === 200 ? window.location.reload() : "";
//       response.status === 200
//         ? setCartData(cartData.filter((item) => item.prodId !== prodID))
//         : "";
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="cartCard">
//       <img src={cartimg} alt="cardImage" className="cartImg" />
//       <div className="cardCont">
//         <p className="brandDes">{cartProdDesc}</p>
//         <p className="brandNam">{cartBrandName}</p>
//         <span className="sizeAndQuant">
//           <span className="size">
//             Size: {dept === "books" || dept === "eyewear" ? "N/A" : size}
//           </span>
//           <div className="number-control">
//             <div className="number-left" onClick={() => setOpen(true)}>
//               -
//             </div>
//             <Modal
//               className="mainModal"
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <div className="Mstyle">
//                 <p className="bg_color">
//                   Do you want to Reduce the quantity by One[1]?
//                 </p>
//                 <span className="mCont">
//                   <span className="yes" onClick={handleCounterDec}>
//                     YES
//                   </span>
//                   <span className="back" onClick={handleClose}>
//                     GO BACK
//                   </span>
//                 </span>
//               </div>
//             </Modal>
//             <span className="numCount">{counter}</span>
//             <div className="number-right" onClick={() => setOpen(true)}>
//               +
//             </div>
//             <Modal
//               className="mainModal"
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <div className="Mstyle">
//                 <p className="bg_color">
//                   Do you want to Increase the quantity by One[1]?
//                 </p>
//                 <span className="mCont">
//                   <span className="yes" onClick={handleCounterInc}>
//                     YES
//                   </span>
//                   <span className="back" onClick={handleClose}>
//                     GO BACK
//                   </span>
//                 </span>
//               </div>
//             </Modal>
//           </div>
//         </span>
//         <div className="cartPrice">
//           <span className="mainCartPrice">Price: &#8377;{cartPrice}</span>
//           <span className="cartDiscount">
//             <del>&#8377;{cartOffPrice}</del>
//           </span>
//           <span className="cartOffer">({cartOffer}% OFF)</span>
//         </div>
//         <p>
//           <span className="seven">7 days</span> return available
//         </p>
//         <span className="close" onClick={handleSingleProdDeletion}>
//           X
//         </span>
//       </div>
//     </div>
//   );
// }

// export default CartCard;
