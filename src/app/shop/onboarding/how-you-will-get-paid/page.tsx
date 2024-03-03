import Form from "./Form";

const Page = () => {
  return (
    <div className="w-full pt-10">
      <div className="px-4 md:px-0">
        <h1 className="text-center text-4xl font-light">
          How you&apos;ll get paid
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-[0.6rem] text-gray-600 md:mt-2 md:text-xs">
          Don’t sweat it! You can just draft a name now and change it later. We
          find sellers often draw inspiration from what they sell, their style,
          pretty much anything goes.
        </p>
      </div>

      <div className="mt-10 w-full">
        <Form />
      </div>
    </div>
  );
};

export default Page;
