import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterContext } from "../context/context";

function Filter() {
  const { register, handleSubmit, reset } = useForm();
  // const [showFilter, setShowFilter] = useState(false);
  const path = useLocation();
  const Navigate = useNavigate();
  // const { setFilterData, showFilter, setShowFilter } =
  const { setFilterData } = useContext(FilterContext);

  const onSubmit = async (data) => {
    try {
      // as a precaution we con store the path names in an array and use Array.includes method to check if it is present in the array before making a request to prevent crashing the server/DB
      const response = await axios.post(
        `http://localhost:3000${path.pathname}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data;
      console.log(res);

      setFilterData(res);
    } catch (err) {
      console.log(err);
    }
  };

  function handleClear() {
    reset();
  }

  return (
    <div className="filter">
      {/* <div
        onClick={() => setShowFilter(!showFilter)}
        className="icon-fill-filter"
        style={{ margin: showFilter ? "0px" : "-8px" }}
      >
        Filters
      </div> */}
      {/* <div style={{ display: showFilter ? "block" : "none" }}> */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="inputHead">Departments</label>
            <div className="prodCateg">
              <div>
                <label
                  htmlFor="clothing"
                  onClick={() => Navigate("/products/clothing")}
                >
                  Clothing
                </label>
              </div>
              <div>
                <label
                  htmlFor="watch"
                  onClick={() => Navigate("/products/watches")}
                >
                  Watch
                </label>
              </div>
              <div>
                <label
                  htmlFor="book"
                  onClick={() => Navigate("/products/books")}
                >
                  Books
                </label>
              </div>
              <div>
                <label
                  htmlFor="eyewear"
                  onClick={() => Navigate("/products/eyewear")}
                >
                  Eyewear
                </label>
              </div>
              <div>
                <label
                  htmlFor="footwear"
                  onClick={() => Navigate("/products/footwear")}
                >
                  Footwear
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="filterHead">
              <span>Filters</span>
              <span className="clear" onClick={handleClear}>
                Clear Filters
              </span>
            </div>
            <div className="sub-total-some-thing">
              <div>
                <label className="inputHead">Ideal For</label>
                <div className="some-ideal">
                  {path.pathname !== "/products/books" ? (
                    ["men", "women", "boy", "girl"].map((gender) => (
                      <div key={gender}>
                        <input
                          type="checkbox"
                          id={gender}
                          {...register(gender)}
                        />
                        <label htmlFor={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div>
                        {["fiction", "nonFiction"].map((category) => (
                          <div key={category}>
                            <input
                              type="checkbox"
                              id={category}
                              {...register(category)}
                            />
                            <label htmlFor={category}>
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* </div> */}

              {path.pathname === "/products/clothing" ? (
                <div className="some-ideal">
                  <label className="cat" id="cat1">
                    Categories
                  </label>
                  <div>
                    {["shirt", "tshirt", "pant"].map((category) => (
                      <div key={category}>
                        <input
                          type="checkbox"
                          id={category}
                          {...register(category)}
                        />
                        <label htmlFor={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              {path.pathname === "/products/footwear" ? (
                <div className="some-ideal">
                  <label className="cat" id="cat1">
                    Categories
                  </label>
                  <div>
                    {["casual", "sneaker", "sandal"].map((category) => (
                      <div key={category}>
                        <input
                          type="checkbox"
                          id={category}
                          {...register(category)}
                        />
                        <label htmlFor={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              {path.pathname === "/products/watches" ? (
                <div className="some-ideal">
                  <label className="cat" id="cat1">
                    Categories
                  </label>
                  <div>
                    {["analogue", "smartwatch"].map((category) => (
                      <div key={category}>
                        <input
                          type="checkbox"
                          id={category}
                          {...register(category)}
                        />
                        <label htmlFor={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div>
                <div className="inputHead">
                  <details>
                    <summary>Sort</summary>
                    <div>
                      <div>
                        <input type="checkbox" id="asc" {...register("asc")} />
                        <label htmlFor="asc" className="sortText">
                          Price: Low to High
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="desc"
                          {...register("desc")}
                        />
                        <label htmlFor="desc" className="sortText">
                          Price: High to Low
                        </label>
                      </div>
                    </div>
                  </details>
                </div>

                <div className="price-head-some">
                  <label className="inputHead">Price</label>
                  <div>
                    <select
                      name="minprice"
                      id="minprice"
                      {...register("minprice")}
                    >
                      <option value="">Min</option>
                      <option value="300">&#8377;300</option>
                      <option value="400">&#8377;400</option>
                      <option value="500">&#8377;500</option>
                    </select>
                    <span>to</span>
                    <select
                      name="maxprice"
                      id="maxprice"
                      {...register("maxprice")}
                    >
                      <option value="3000">&#8377;3000</option>
                      <option value="2600">&#8377;2600</option>
                      <option value="2200">&#8377;2200</option>
                      <option value="1800">&#8377;1800</option>
                      <option value="1500">&#8377;1500</option>
                      <option value="1200">&#8377;1200</option>
                      <option value="900">&#8377;900</option>
                      <option value="600">&#8377;600</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="inputSubmit">
          <input
            type="button"
            value="Apply Filters"
            className="inputBtn"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
