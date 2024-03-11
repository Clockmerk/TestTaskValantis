import { FormEvent } from "react";
import { useAppDispatch } from "../../redux/store";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { paginateT } from "../../lib/types";
import { setPaginate } from "../../redux/slices/paginateSlice";

export const Pagination = ({
  paginate,
  isLoading,
  isError,
  limit,
}: {
  paginate: paginateT;
  isLoading: boolean;
  isError: boolean;
  limit: number;
}) => {
  const dispatch = useAppDispatch();

  const { data: totalPages } = useFetchDataQuery({
    action: "get_ids",
    params: { offset: 0, limit: 10000 },
  });

  const changePage = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(setPaginate({ ...paginate, page: Number(data.get("page")) }));
  };

  if (totalPages) {
    return (
      <>
        {!isLoading && (
          <span>
            Total pages: {Math.ceil(totalPages?.result.length / paginate.limit)}
          </span>
        )}
        <div className="flex justify-center *:m-2">
          <button
            className="navButton"
            disabled={paginate.page === 1 || isLoading || isError}
            onClick={() => {
              dispatch(setPaginate({ ...paginate, page: paginate.page - 1 }));
            }}
          >
            Prev
          </button>
          <form onSubmit={changePage}>
            <input
              name="page"
              type="number"
              min={1}
              max={totalPages && Math.ceil(totalPages?.result.length / limit)}
              placeholder={paginate.page.toString()}
              disabled={isLoading || isError}
            />
          </form>

          <button
            className="navButton"
            disabled={isLoading || isError}
            onClick={() => {
              dispatch(setPaginate({ ...paginate, page: paginate.page + 1 }));
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
};
