import { useId } from "react";
import { cn } from "../utilities/cn";
import Checkbox from "./form-elements/Checkbox";

interface ITable
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  tableBodyClass?: string;
  tableClass?: string;
  tableHeadClass?: string;
  tdClass?: string;
  headings: string[];
  datas:
    | (
        | React.FC<
            React.DetailedHTMLProps<
              React.HTMLAttributes<HTMLDivElement>,
              HTMLDivElement
            >
          >
        | JSX.Element
      )[][]
    | null;

  onEntireTableSelectChange?: (val: boolean) => void;
  isEntireTableSelected?: boolean;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}
const Table = ({
  headings,
  datas,
  className,
  tableBodyClass,
  tableHeadClass,
  tableClass,
  tdClass,
  onEntireTableSelectChange,
  isEntireTableSelected,
  TopRightContainer,
}: ITable) => {
  if (datas && datas.length > 0 && headings.length !== datas[0].length)
    throw new Error("Headings and data length mismatch.");

  const id = useId();

  return (
    <div className="relative">
      {TopRightContainer && (
        <div className="absolute right-0 top-0 z-10">
          <>
            <TopRightContainer />
          </>
        </div>
      )}
      {datas && (
        <div
          className={`${cn(
            `relative overflow-auto border border-gray-300 shadow-md`,
            className,
          )}`}
        >
          <table
            className={cn(`w-full text-left text-sm text-gray-800`, tableClass)}
          >
            <thead
              className={cn(
                `sticky top-0 z-10 w-full border-b border-gray-300 bg-white text-xs uppercase text-gray-800`,
                tableHeadClass,
              )}
            >
              <tr>
                {headings.map((heading, idx) =>
                  heading.includes("_") ? (
                    heading.toLowerCase().includes("checkbox") ? (
                      <th
                        key={`${idx}_${heading}`}
                        scope="col"
                        className="w-10 whitespace-nowrap px-6 py-3"
                      >
                        <Checkbox
                          name={`${id}_all_select`}
                          value={isEntireTableSelected ? "true" : ""}
                          onChange={(e) => {
                            onEntireTableSelectChange &&
                              onEntireTableSelectChange(e);
                          }}
                        />
                      </th>
                    ) : (
                      <div className="" key={`${idx}_${heading}`}></div>
                    )
                  ) : heading.toLowerCase().includes("r-") ? (
                    <th
                      key={`${idx}_${heading}`}
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-right"
                    >
                      {heading.split("r-")[1]}
                    </th>
                  ) : (
                    <th
                      key={`${idx}_${heading}`}
                      scope="col"
                      className="whitespace-nowrap px-6 py-3"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className={cn(``, tableBodyClass)}>
              {datas.map((rows, row_idx) => (
                <tr
                  key={`table_row_${row_idx}`}
                  className={`${
                    row_idx < datas.length - 1 && "border-b border-gray-300"
                  }  hover:bg-gray-50 ${
                    row_idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  {rows.map((Data, data_idx) =>
                    headings[data_idx]?.includes("_") ? (
                      <td
                        key={`table_col_${row_idx}_${data_idx}`}
                        className={`${cn(`px-6 py-4 text-right`)}`}
                      >
                        {typeof Data === "function" ? <Data /> : Data}
                      </td>
                    ) : data_idx === 0 ? (
                      <th
                        key={`table_col_${row_idx}_${data_idx}`}
                        scope="row"
                        className={`${cn(
                          `whitespace-nowrap  px-6 py-4 font-medium text-gray-800`,
                          tdClass,
                        )}`}
                      >
                        {typeof Data === "function" ? <Data /> : Data}
                      </th>
                    ) : (
                      <td
                        key={`table_col_${row_idx}_${data_idx}`}
                        className={`${cn(`px-6 py-4 text-gray-800`, tdClass)}`}
                      >
                        {typeof Data === "function" ? <Data /> : Data}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
