import { useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setQuery } from "../../redux/slices/querySlice";
import { setFilter } from "../../redux/slices/filterSlice";

export const Search = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => {
  const filter = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounce(filter.value, 1500);

  useEffect(() => {
    if (
      typeof debouncedSearch === "number" &&
      filter.type === "price" &&
      debouncedSearch
    ) {
      dispatch(
        setQuery({
          action: "filter",
          params: { price: debouncedSearch },
        })
      );
    }

    if (
      typeof debouncedSearch === "string" &&
      filter.type === "name" &&
      debouncedSearch
    ) {
      dispatch(
        setQuery({ action: "filter", params: { product: debouncedSearch } })
      );
    }
  }, [debouncedSearch, dispatch, filter]);

  return (
    <>
      {filter.type === "price" && (
        <input
          className="max-[376px]:w-[120px]"
          onChange={(e) =>
            dispatch(setFilter({ ...filter, value: parseInt(e.target.value) }))
          }
          type="number"
          value={filter.value}
          min={0}
          placeholder="Search price"
          disabled={isLoading || isError}
        />
      )}
      {filter.type === "name" && (
        <input
          className="max-[376px]:w-[120px]"
          onChange={(e) =>
            dispatch(setFilter({ ...filter, value: e.target.value }))
          }
          type="text"
          placeholder="Search name"
          disabled={isLoading || isError}
        />
      )}
    </>
  );
};
