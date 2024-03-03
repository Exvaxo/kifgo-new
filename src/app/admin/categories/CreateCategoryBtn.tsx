"use client";
import { Button } from "@/components/Button";
import { useState } from "react";
import { createRootCategory } from "./_actions";

const CreateCategoryBtn = () => {
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  return (
    <Button
      isSpinning={isCreateLoading}
      onClick={async () => {
        try {
          setIsCreateLoading(true);
          await createRootCategory();
        } catch (error) {
        } finally {
          setIsCreateLoading(false);
        }
      }}
      className={"w-max"}
    >
      Create new category
    </Button>
  );
};

export default CreateCategoryBtn;
