import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ProductT } from "../../lib/types";
import { Search } from "../../components/Search/search";
import { Brands } from "../../components/Brands/brands";
import { Pagination } from "../../components/Pagination/pagination";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { setQuery } from "../../redux/slices/querySlice";
import { useEffect } from "react";
import { setFilter } from "../../redux/slices/filterSlice";
import { Link } from "react-router-dom";
import { setPaginate } from "../../redux/slices/paginateSlice";
import { PaginationF } from "../../components/PaginationF/paginationf";
import { setPaginateF } from "../../redux/slices/paginateFSlice";
import img from "../../assets/images/mock.webp";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const paginate = useAppSelector((state) => state.paginate);
  const paginateF = useAppSelector((state) => state.paginateF);
  const query = useAppSelector((state) => state.query);
  const { type: filter } = useAppSelector((state) => state.filter);

  useEffect(() => {
    if (filter === "all") {
      dispatch(
        setQuery({
          action: "get_ids",
          params: {
            offset: (paginate.page - 1) * paginate.limit,
            limit: paginate.limit,
          },
        })
      );
    }
  }, [dispatch, filter, paginate.limit, paginate.page, query.action]);

  const {
    data: fetchedIds,
    isError: isErrorIds,
    isFetching: isFetchingIds,
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
    params: {
      ids:
        filter === "all"
          ? Array.from(new Set(fetchedIds?.result))
          : Array.from(new Set(fetchedIds?.result)).slice(
              (paginateF.page - 1) * paginateF.limit,
              paginateF.page * paginateF.limit
            ),
    },
  });

  const uniqueArray = fetchedItems?.result.filter(
    (item: ProductT, index: number) => {
      return (
        fetchedItems?.result.findIndex((obj: ProductT) => {
          return JSON.stringify(obj.id) === JSON.stringify(item.id);
        }) === index
      );
    }
  );

  return (
    <>
      <div className="flex justify-center mt-1">
        <select
          value={filter}
          onChange={(e) =>
            dispatch(setFilter({ type: e.target.value, value: "" }))
          }
        >
          <option value="all">All products</option>
          <option value="price">Search by price</option>
          <option value="name">Search by name</option>
          <option value="brand">Filter by brand</option>
        </select>

        <div className="flex flex-col items-center ">
          {filter === "name" || filter === "price" ? (
            <Search isLoading={isFetching} isError={isError} />
          ) : null}
          {filter === "brand" && <Brands />}
        </div>

        {filter === "all" && (
          <select
            value={paginate.limit}
            onChange={(e) =>
              dispatch(
                setPaginate({ ...paginate, limit: Number(e.target.value) })
              )
            }
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        )}

        {filter !== "all" && (
          <select
            value={paginateF.limit}
            onChange={(e) =>
              dispatch(
                setPaginateF({ ...paginateF, limit: Number(e.target.value) })
              )
            }
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        )}
      </div>

      {filter === "all" && (
        <div className="flex flex-col items-center bg-white w-[50vh] border-2 border-white rounded-xl mt-2">
          <Pagination
            paginate={paginate}
            isLoading={isFetching}
            isError={isError}
            limit={paginate.limit}
          />
        </div>
      )}

      {filter !== "all" && (
        <div className="flex flex-col items-center bg-white w-[50vh] border-2 border-white rounded-xl mt-2">
          <PaginationF
            totalPages={fetchedIds?.result}
            length={uniqueArray?.length}
            paginateF={paginateF}
            isLoading={isFetchingIds}
            isError={isError}
          />
        </div>
      )}

      <div className="flex flex-col m-3 justify-center items-center ">
        {isErrorIds && errorIds && "originalStatus" in errorIds && (
          <div className="flex flex-col justify-center items-center *:my-2">
            <p className="error">
              Error: {errorIds.originalStatus}, {errorIds.error}
            </p>
            <button
              className="buttonError"
              onClick={() => {
                refetchIds();
              }}
            >
              Retry request
            </button>
          </div>
        )}

        {isError && error && "originalStatus" in error && (
          <div className="flex flex-col justify-center items-center">
            <p className="error">
              Error: {error.originalStatus}, {error.error}
            </p>
            <button
              className="buttonError"
              onClick={() => {
                refetch();
              }}
            >
              Retry request
            </button>
          </div>
        )}

        {isFetching && !isError && !isErrorIds && <p>Loading...</p>}

        {!isFetching &&
          !isError &&
          !isErrorIds &&
          uniqueArray?.length === 0 && <p>No products</p>}

        <div className="grid max-[321px]:grid-cols-1 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1440px]:grid-cols-4 gap-3">
          {!isFetching &&
            !isError &&
            !isErrorIds &&
            uniqueArray.map((e: ProductT) => {
              return (
                <div key={e.id} className="bg-white border-white rounded-xl">
                  <div className="border-b mx-1">
                    <p className="text-gray-500 text-[13px] absolute">
                      {e.brand}
                    </p>
                    <img src={img} alt={e.product} width={330} />
                  </div>

                  <div className="max-w-[330px] p-2 overflow-hidden">
                    <Link
                      className="hover:underline decoration-red-700 truncate "
                      to={`/product/${e.id}`}
                    >
                      {e.product}
                    </Link>
                    <p className="text-red-700">{e.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
