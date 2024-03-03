import Form from "./Form";
import { getProduct } from "./_actions";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="w-full pt-10">
      <div className="px-4 md:px-0">
        <h1 className="text-center text-4xl font-light">Edit listing</h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-[0.6rem] text-gray-600 md:mt-2 md:text-xs">
          Edit some photos and details about your item. Fill out what you can
          for now—you’ll be able to edit this later.
        </p>
      </div>

      <div className="mt-10 w-full">
        <Form product={product || null} />
      </div>
    </div>
  );
}
