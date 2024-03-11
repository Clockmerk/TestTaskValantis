import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../../redux/slices/apiSlice";
import { useEffect } from "react";
import img from "../../assets/images/mock.webp";

export const Product = () => {
  const { id } = useParams();

  useEffect(() => {
    if (productData) document.title = productData?.product;
  });

  const {
    data: product,
    isFetching,
    isError,
    error,
    refetch,
  } = useFetchDataQuery({
    action: "get_items",
    params: { ids: [id] },
  });

  const productData = product?.result[0];

  return (
    <div className="flex justify-center">
      {isError && "originalStatus" in error && (
        <div>
          <p className="error">
            Error: {error.originalStatus}, {error.error}
          </p>
        </div>
      )}
      {isError && <button onClick={() => refetch()}>Retry</button>}
      {isFetching && <div className="mt-[5vh]">Loading...</div>}
      {!isError && !isFetching && (
        <>
          <div className="flex p-5 max-[425px]:w-[95%] bg-white max-[426px]:gap-1 gap-10 border border-white rounded justify-center items-center mt-[4vh] max-[426px]:flex-col ">
            <div className="max-[321px]:w-[90%] max-[426px]:border-b">
              <img src={img} alt={productData.product} width={330} />
            </div>
            <div className="max-[321px]:w-[90%] *:mt-5 min-[768px]:*:mt-7">
              <p className="text-xl font-medium">{productData.product}</p>
              <p>ID: {productData.id}</p>
              <p>Brand: {productData.brand ?? "No brand"}</p>
              <p>
                Price: <span className="text-red-700">{productData.price}</span>{" "}
                rubles
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
