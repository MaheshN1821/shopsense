import { createContext, useState } from "react";

export const FilterContext = createContext({
  filterData: [],
  setFilterData: () => {},
  singleProdData: [],
  setSingleProdData: () => {},
  cartInfo: [],
  setCartInfo: () => {},
  update: 0,
  setUpdate: () => 0,
  updateProduct: 0,
  setUpdateProduct: () => 0,
});

export function FilterState({ children }) {
  const [filterData, setFilterData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [singleProdData, setSingleProdData] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [update, setUpdate] = useState(0);
  const [updateProduct, setUpdateProduct] = useState(0);

  return (
    <FilterContext.Provider
      value={{
        filterData,
        setFilterData,
        singleProdData,
        setSingleProdData,
        update,
        setUpdate,
        updateProduct,
        setUpdateProduct,
        cartInfo,
        setCartInfo,
        showFilter,
        setShowFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
