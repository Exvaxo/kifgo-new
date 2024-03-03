import Category from "./Categories";
import CreateCategoryBtn from "./CreateCategoryBtn";
import { fetchCategories } from "./_actions";

export const revalidate = 0;

const page = async () => {
  const categories = await fetchCategories();
  return (
    <section className="p-5">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="">
          <h3 className="text-lg font-medium text-gray-800">Categories</h3>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>

        <CreateCategoryBtn />
      </div>

      <Category categories={categories} />
    </section>
  );
};

export default page;
