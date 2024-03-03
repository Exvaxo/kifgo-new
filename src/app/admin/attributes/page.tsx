import AttributeCard from "./AttributeCard";
import CreateAttributeBtn from "./CreateAttributeBtn";
import { fetchAttributes, fetchUnits } from "./_actions";

export const revalidate = 0;

const page = async () => {
  const attributes = await fetchAttributes();
  const units = await fetchUnits();
  return (
    <section className="p-5 pb-10">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="">
          <h3 className="text-lg font-medium text-gray-800">Attributes</h3>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>

        <CreateAttributeBtn />
      </div>
      <div className="mt-10 flex w-full flex-col items-start justify-start gap-10 divide-y">
        {attributes &&
          attributes.map((attr, idx) => (
            <AttributeCard
              key={attr.id}
              className={idx > 0 ? "pt-10" : ""}
              attribute={attr}
              units={units}
            />
          ))}
      </div>
    </section>
  );
};

export default page;
