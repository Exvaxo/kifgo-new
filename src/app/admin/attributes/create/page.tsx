import React from "react";
import Form from "./Form";
import { fetchUnits } from "../_actions";

export const revalidate = 0;

const page = async () => {
  const units = await fetchUnits();
  return (
    <div className="p-5">
      <Form units={units} />
    </div>
  );
};

export default page;
