import ProductCard from "../ProductCard";
import EmptyListing from "./EmptyListing";
import { getProducts } from "./_actions";

export const revalidate = 0;

const page = async () => {
  const products = await getProducts({ page: 1, size: 25 });

  return (
    <div className="flex h-full w-full items-start justify-between">
      {products && products.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!products || (products && products.length <= 0 && <EmptyListing />)}

      {/* <div className="hidden h-full w-72 bg-red-200 md:flex">
        <h3>Filters</h3>
      </div> */}
    </div>
  );
};

export default page;
