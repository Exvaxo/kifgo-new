import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { createUnits } from "./unit.service";

/* 
    CREATE unit
*/
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const units = await createUnits({
        data: [
          {
            name: "Inches",
            si_unit: "in",
          },
          {
            name: "Centimeter",
            si_unit: "cm",
          },
          {
            name: "Millimeter",
            si_unit: "mm",
          },
          {
            name: "Meter",
            si_unit: "m",
          },
          {
            name: "Kilogram",
            si_unit: "kg",
          },
          {
            name: "Gram",
            si_unit: "g",
          },
          {
            name: "Milligram",
            si_unit: "mg",
          },
          {
            name: "Fluid Ounce",
            si_unit: "oz",
          },
          {
            name: "Millilitre",
            si_unit: "ml",
          },
          {
            name: "Litre",
            si_unit: "l",
          },
          {
            name: "Alpha",
          },
          {
            name: "Other",
          },
        ],
      });

      return NextResponse.json({ units });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
