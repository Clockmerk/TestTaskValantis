import { initialStateReduxT } from "../lib/types";

export const LC_redux = "redux-store";

export const initialState: initialStateReduxT = {
  page: 1,
  limit: 50,
  query: {
    action: "get_ids",
    params: { offset: 0, limit: 50 },
  },
};

export const getInitialState = () => {
  const data = localStorage.getItem(LC_redux);

  return data ? JSON.parse(data) : initialState;
};
