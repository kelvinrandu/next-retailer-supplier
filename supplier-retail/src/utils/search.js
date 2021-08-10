import React, {useState, useContext, createContext} from 'react';

const searchContext = createContext();

export function ProvideSearch({children}) {
    const search = useProvideSearch();
    return <searchContext.Provider value={search}>{children}</searchContext.Provider>;
}

export const useSearch = () => {
    return useContext(searchContext);
};

function useProvideSearch() {
    const [search, setSearch] = useState('');

    const [categoryTypeFilters, setCategoryTypeFilters] = useState([
      "BEER",
      "WINE",
      "LIQUOR",
      "FOOD",
    ]);



    const onFilterCategoryType = (newValues) => {
        setCategoryTypeFilters(newValues);
    };

    const onSearch = (e) => {
        e.preventDefault();

        const searchValue = e.target.value;
        const valueWithoutSlash = searchValue.replace('/', '');

        setSearch(valueWithoutSlash);
        return valueWithoutSlash;
    };

    return {
      categoryTypeFilters,
      onFilterCategoryType,
      onSearch,
      search,
    };
}
