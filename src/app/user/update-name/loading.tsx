import Spinner from "@/components/Spinner";

function Loading() {
  return (
    <section className="h-[100dvh] bg-gray-950 p-2">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
        <Spinner size={"sm"} className="border-gray-800" />
      </div>
    </section>
  );
}

export default Loading;
