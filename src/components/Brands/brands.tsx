import { useEffect } from "react";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setQuery } from "../../redux/slices/querySlice";
import { setFilter } from "../../redux/slices/filterSlice";
import { setPaginateF } from "../../redux/slices/paginateFSlice";

export const Brands = () => {
  const filter = useAppSelector((state) => state.filter);
  const paginateF = useAppSelector((state) => state.paginateF);
  const dispatch = useAppDispatch();

  const { data: brands } = useFetchDataQuery({
    action: "get_fields",
    params: { field: "brand", offset: 0, limit: 10000 },
  });

  useEffect(() => {
    if (filter.type === "brand" && filter.value) {
      dispatch(setQuery({ action: "filter", params: { brand: filter.value } }));
      setTimeout(() => {
        dispatch(setPaginateF({ ...paginateF, page: 1 }));
      }, 800);
    }
  }, [dispatch, filter.type, filter.value, paginateF]);

  return (
    <form>
      <select
        className="max-[376px]:w-[120px]"
        value={filter.value}
        onChange={(e) =>
          dispatch(setFilter({ ...filter, value: e.target.value }))
        }
      >
        <option defaultValue="" hidden>
          Choose a brand
        </option>
        {brands?.result
          .filter(
            (item: string, index: number) =>
              brands?.result.indexOf(item) === index
          )
          .sort()
          .map((e: string) => {
            if (e !== null) {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            }
          })}
      </select>
    </form>
  );
};
