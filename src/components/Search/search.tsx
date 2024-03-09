import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../redux/store";
import { setQuery } from "../../redux/slices/querySlice";

export const Search = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(
        setQuery({ action: "filter", params: { product: debouncedSearch } })
      );
    }
  }, [debouncedSearch, dispatch]);

  return (
    <input
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Search"
      disabled={isLoading || isError}
    />
  );
};
