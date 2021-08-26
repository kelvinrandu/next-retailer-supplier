import React, { useState, useContext, createContext } from "react";

const orderContext = createContext();

export function ProvideSearch({ children }) {
  const search = useProvideSearch();
  return (
    <orderContext.Provider value={search}>{children}</orderContext.Provider>
  );
}

export const useOrder = () => {
  return useContext(searchContext);
};

function useProvideSearch() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setcategoryFilter] = useState([
    "food",
    "hardware",
    "textile",
    "electronics",
    "drinks",
  ]);

  const onFilterCategoryType = (newValues) => {
    setcategoryFilter(newValues);
    console.log("here", newValues);
  };

  const onSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.value;
    const valueWithoutSlash = searchValue.replace("/", "");

    setSearch(valueWithoutSlash);
    return valueWithoutSlash;
  };

  return {
    categoryFilter,
    onFilterCategoryType,
    onSearch,
    search,
  };
}
