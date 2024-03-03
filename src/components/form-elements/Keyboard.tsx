import { Button } from "../Button";

const Keyboard = ({
  currentlyPressed,
  handleBackSpace,
}: {
  currentlyPressed?: any;
  handleBackSpace?: any;
}) => {
  return (
    <div className="disable-highlight grid w-full grid-cols-3 items-center justify-center gap-x-8 ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, -1].map((num: number, idx: number) => (
        <div
          key={idx}
          className={`flex
            ${num === -1 && "pointer-events-none opacity-0"}
            ${(num === 1 || num === 4 || num === 7) && "justify-end"}  
            ${(num === 3 || num === 6 || num === 9) && "justify-start"} 
            ${
              (num === 2 || num === 5 || num === 8 || num === 0) &&
              "justify-center"
            }
          `}
        >
          <Button
            variant={"unstyled"}
            onClick={() => currentlyPressed(num)}
            className={`aspect-square h-[80px] w-[80px] rounded-full p-3 active:bg-gray-100 md:h-[100px] md:w-[100px] md:p-5`}
          >
            <span className="text-2xl font-medium">{num}</span>
          </Button>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          variant={"unstyled"}
          onClick={() => currentlyPressed(0)}
          className={`aspect-square h-[80px] w-[80px] rounded-full p-3 active:bg-gray-100 md:h-[100px] md:w-[100px] md:p-5`}
        >
          <span className="text-2xl font-medium">0</span>
        </Button>
      </div>

      <div className="flex">
        <Button
          variant={"unstyled"}
          onClick={handleBackSpace}
          className={`aspect-square h-[80px] w-[80px] rounded-full p-3 active:bg-gray-100 md:h-[100px] md:w-[100px] md:p-5`}
        >
          <svg className="h-8 w-8 text-gray-800" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.871 19.499c.93.501 2.044.501 4.271.501h2.637c3.875 0 5.813 0 7.017-1.172C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.204-6.828C19.592 4 17.654 4 13.78 4h-2.637c-2.227 0-3.341 0-4.27.501c-.93.502-1.52 1.42-2.701 3.259L3.49 8.82C2.497 10.366 2 11.14 2 12c0 .86.497 1.634 1.49 3.18l.68 1.06c1.181 1.838 1.771 2.757 2.701 3.259Zm4.16-10.53A.75.75 0 0 0 9.97 10.03L11.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L13 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L14.06 12l1.97-1.97a.75.75 0 0 0-1.06-1.06L13 10.94l-1.97-1.97Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Keyboard;
