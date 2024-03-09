import { useEffect, useState } from "react";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { useAppDispatch } from "../../redux/store";
import { setQuery } from "../../redux/slices/querySlice";

export const Brands = () => {
  const [brand, setBrand] = useState<string>("");
  const dispatch = useAppDispatch();

  const { data: brands } = useFetchDataQuery({
    action: "get_fields",
    params: { field: "brand", offset: 0, limit: 10000 },
  });

  useEffect(() => {
    dispatch(setQuery({ action: "filter", params: { brand } }));
  },[brand, dispatch])

  return (
    <form >
      {brands?.result
        .filter((item: string, index: number) => brands?.result.indexOf(item) === index)
        .sort()
        .map((e: string) => {
          if (e !== null) {
            return (
              <label key={e}>
                <input type="radio" name="brand" value={e} onClick={() => setBrand(e)} />
                {e}
              </label>
            );
          }
        })}
    </form>
  );
};
