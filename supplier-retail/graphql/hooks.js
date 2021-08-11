import { useQuery } from "@apollo/react-hooks";
import { GET_ITEMS_QUERY, GET_CATEGORIES_QUERY } from "./queries";

export const useItems = () => {
  const { loading, error, data } = useQuery(GET_ITEMS_QUERY);

  if (!loading && data) {
    return {
      loading,
      error,
      data: {
        items: data.items,
      },
    };
  }

  return {
    loading,
    error,
    data,
  };
};
export const useCategories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

  if (!loading && data) {
    return {
      loading,
      error,
      data: {
        categories: data.categories,
      },
    };
  }

  return {
    loading,
    error,
    data,
  };
};