import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div
      id="page-loader"
      className="absolute inset-0 z-[999999999] flex h-[100dvh] w-full flex-grow bg-black p-2"
    >
      <div className="flex h-full w-full flex-1 items-center justify-center rounded-2xl bg-white">
        <Spinner size={"sm"} className="text-gray-800" />
      </div>
    </div>
  );
}
