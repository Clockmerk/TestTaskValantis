import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { paginateT } from "../../lib/types";
import { setPaginateF } from "../../redux/slices/paginateFSlice";

export const PaginationF = ({
  length,
  totalPages,
  paginateF,
  isLoading,
  isError,
}: {
  length: number;
  totalPages: string[];
  paginateF: paginateT;
  isLoading: boolean;
  isError: boolean;
}) => {
  const { value } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const changePage = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(setPaginateF({ ...paginateF, page: Number(data.get("page")) }));
  };

  if (Math.ceil(totalPages?.length / paginateF.limit) < paginateF.page) {
    dispatch(
      setPaginateF({
        ...paginateF,
        page: Math.ceil(totalPages?.length / paginateF.limit),
      })
    );
  }

  if (value) {
    return (
      <>
        {!isLoading && (
          <div>
            Total pages: {Math.ceil(totalPages?.length / paginateF.limit)}
          </div>
        )}
        <div className="flex justify-center *:m-2">
          <button
            className="navButton"
            disabled={paginateF.page === 1 || isLoading || isError}
            onClick={() => {
              dispatch(
                setPaginateF({ ...paginateF, page: paginateF.page - 1 })
              );
            }}
          >
            Prev
          </button>
          <form
            onSubmit={changePage}
            className="flex justify-center items-center"
          >
            <input
              name="page"
              type="number"
              min={1}
              max={
                totalPages && Math.floor(totalPages?.length / paginateF.limit)
              }
              placeholder={paginateF.page.toString()}
              disabled={isLoading || isError}
            />
          </form>

          <button
            className="navButton"
            disabled={length < paginateF.limit - 1 || isLoading || isError}
            onClick={() => {
              dispatch(
                setPaginateF({ ...paginateF, page: paginateF.page + 1 })
              );
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
};
