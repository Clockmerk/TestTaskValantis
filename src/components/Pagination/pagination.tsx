import { FormEvent } from "react";
import { useAppDispatch } from "../../redux/store";
import { setPage } from "../../redux/slices/pageSlice";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";

export const Pagination = ({
  page,
  isLoading,
  isError,
  limit,
}: {
  page: number;
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
    dispatch(setPage(Number(data.get("page"))));
  };
  if (totalPages) {
    return (
      <div className="flex justify-center">
        <button
          disabled={page === 1 || isLoading || isError}
          onClick={() => {
            dispatch(setPage(page - 1));
          }}
        >
          Previous
        </button>
        <form onSubmit={changePage}>
          <input
            name="page"
            type="number"
            min={1}
            max={totalPages && Math.floor(totalPages?.result.length / limit)}
            placeholder={page.toString()}
            disabled={isLoading || isError}
          />
        </form>

        <button
          disabled={ isLoading || isError}
          onClick={() => {
            dispatch(setPage(page + 1));
          }}
        >
          Next
        </button>
      </div>
    );
  }
};
