import { useContext, useEffect, useState } from "react";
import api from "../../utils/api.js";
import NavBar from "../../components/navbar/navbar.jsx";
import "./wishlist.css";
import WishCard from "../../components/cards/wishlistCard/wishCard.jsx";
import { FilterContext } from "../../components/context/context.jsx";

function Wishlist() {
  const { update } = useContext(FilterContext);
  const [wishListPage, setWishListPage] = useState([]);
  const [wishListLoading, setWishListLoading] = useState(true);
  const uId = sessionStorage.getItem("userId");

  useEffect(() => {
    async function getWishListData() {
      try {
        const data = {
          usersId: uId,
        };
        const response = await api.post("/products/wishlist/details", data);

        const info = response.data.wishListData;
        console.log(info);

        setWishListPage(info);
      } catch (err) {
        console.log(err);
      } finally {
        setWishListLoading(false);
      }
    }

    getWishListData();
  }, [uId, update]);

  return (
    <>
      <NavBar />
      <div className="wishListContainer">
        <div className="data">
          {wishListLoading ? (
            <div className="loadingWishListPlaceholder">Loading...</div>
          ) : wishListPage.length !== 0 ? (
            wishListPage.map((value, index) => (
              <WishCard
                key={index}
                prodId={value.prodID}
                img={value.wishlistImage[0]}
                rating={value.wishlistRating}
                brandName={value.wishlistBrandName}
                prodDesc={value.wishlistProdDesc}
                price={value.wishlistPrice}
                offPrice={value.wishlistOffPrice}
                offer={value.wishListOffer}
                images={value.wishlistImage}
                dept={value.dept}
                forGender={value.wishListFor}
                prodType={value.wishListProdType}
                quantity={value.quantity}
                setWishListPage={setWishListPage}
                wishListPage={wishListPage}
                size={value.size}
                prodInfo={value.prodInfo}
                sellerId={value.sellerId}
              />
            ))
          ) : (
            <div className="noContentWishList">
              <p>There is no products available to Display!</p>
              <p className="special">
                Login to know more{" "}
                <small>( *Ignore if already logged in!)</small>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
