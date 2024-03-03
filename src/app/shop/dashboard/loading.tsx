import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size={"sm"} className="text-gray-800" />
    </div>
  );
}
