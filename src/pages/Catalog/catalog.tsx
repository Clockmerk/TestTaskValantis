import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Product } from "../../lib/types";
import { Search } from "../../components/Search/search";
import { Brands } from "../../components/Brands/brands";
import { Pagination } from "../../components/Pagination/pagination";
import { setLimit } from "../../redux/slices/limitSlice";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { setQuery } from "../../redux/slices/querySlice";
import { useEffect } from "react";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.page);
  const limit = useAppSelector((state) => state.limit);
  const query = useAppSelector((state) => state.query);

  useEffect(() => {
    dispatch(
      setQuery({
        action: "get_ids",
        params: { offset: (page - 1) * limit, limit },
      })
    );
  }, [dispatch, limit, page]);

  const {
    data: fetchedIds,
    isError: isErrorIds,
    error: errorIds,
    refetch: refetchIds,
  } = useFetchDataQuery(query);

  const {
    data: fetchedItems,
    isFetching,
    isError,
    error,
    refetch,
  } = useFetchDataQuery({
    action: "get_items",
    params: { ids: Array.from(new Set(fetchedIds?.result)) },
  });

  const uniqueArray = fetchedItems?.result.filter(
    (item: Product, index: number) => {
      return (
        fetchedItems?.result.findIndex((obj: Product) => {
          return JSON.stringify(obj.id) === JSON.stringify(item.id);
        }) === index
      );
    }
  );

  return (
    <>
      <div>
        <Search isLoading={isFetching} isError={isError} />
        <select
          value={limit}
          onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <Brands />
      </div>
      <Pagination
        page={page}
        isLoading={isFetching}
        isError={isError}
        limit={limit}
      />
      <div>
        {isErrorIds && errorIds && 'originalStatus' in errorIds && (
          <div>
            <p>
              Возникла ошибка: {`${errorIds.originalStatus}, ${errorIds.error}`}
            </p>
            <button
              onClick={() => {
                refetchIds();
              }}
            >
              Повторить запрос
            </button>
          </div>
        )}

        {isError && error && 'originalStatus' in error && (
          <div>
            <p>
              Возникла ошибка:{" "}
              {`${error.originalStatus}, ${
                error.error
              }`}
            </p>
            <button
              onClick={() => {
                refetch();
              }}
            >
              Повторить запрос
            </button>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {isFetching && !isError && <p>Loading...</p>}
          {uniqueArray?.length === 0 && !isFetching && !isError && (
            <p>Ничего не найдено</p>
          )}

          {!isFetching &&
            !isError &&
            uniqueArray.map((e: Product) => {
              return (
                <div
                  key={e.id}
                  className="border-solid border-2 border-indigo-600"
                >
                  <p>{e.id}</p>
                  <p>{e.product}</p>
                  <p>{e.brand}</p>
                  <p>{e.price}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
