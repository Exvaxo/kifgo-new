import { cn } from "@/utilities/cn";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IExpandableNavLink {
  children: (isOpen: boolean) => React.ReactNode;
  className?: string;
  isOpen?: boolean;
  Sublinks?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}

const ExpandableNavLink = ({
  isOpen = false,
  children,
  className,
  Sublinks,
}: IExpandableNavLink) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen, pathname]);

  return (
    <div
      data-is-open={isOpenState}
      className={cn(
        `rounded-x block w-full rounded-xl px-3 py-2 text-sm font-medium text-gray-600 outline-none ring-skin-primary focus:outline-none focus-visible:ring-2 data-[is-active=true]:text-skin-primary ${
          isOpenState && "bg-skin-primary-light"
        }
    `,
        className,
      )}
    >
      <button
        className="flex w-full items-center justify-between outline-none focus:outline-none"
        onClick={() => setIsOpenState((pv) => !pv)}
      >
        {children(isOpenState)}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`h-5 w-5 text-gray-600 transition-all ${
            isOpenState ? "rotate-180" : "rotate-0"
          } `}
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m19 9l-7 6l-7-6"
          />
        </svg>
      </button>

      {Sublinks && isOpenState && (
        <div className="ml-4 flex flex-col items-start justify-start border-l-2 border-skin-primary/25 py-3">
          <div className="-ml-[0.3rem] space-y-3">
            <Sublinks />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableNavLink;
