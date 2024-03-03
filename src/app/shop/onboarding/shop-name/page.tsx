import Form from "./Form";

const Page = () => {
  return (
    <>
      <h1 className="text-center text-4xl font-light">Name your shop</h1>
      <p className="mt-4 max-w-lg text-center text-[0.6rem] text-gray-600 md:mt-2 md:text-xs">
        Don’t sweat it! You can just draft a name now and change it later. We
        find sellers often draw inspiration from what they sell, their style,
        pretty much anything goes.
      </p>

      <div className="mt-10 w-full max-w-sm">
        <Form />
      </div>
    </>
  );
};

export default Page;
