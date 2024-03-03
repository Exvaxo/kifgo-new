import Form from "./Form";

const Page = () => {
  return (
    <div className="w-full pt-10">
      <div className="px-4 md:px-0">
        <h1 className="text-center text-4xl font-light">Create a listing</h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-[0.6rem] text-gray-600 md:mt-2 md:text-xs">
          Add some photos and details about your item. Fill out what you can for
          now—you’ll be able to edit this later.
        </p>
      </div>

      <div className="mt-10 w-full">
        <Form />
      </div>
    </div>
  );
};

export default Page;
