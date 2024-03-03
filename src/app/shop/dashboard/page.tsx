import { EarlyBirdInfo } from "./EarlyBirdInfo";
import ProductStatCard from "./ProductStatCard";
import SellerStatCard from "./SellerStatCard";
import ShopStatCard from "./ShopStatCard";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-start md:flex-row md:justify-between md:overflow-hidden">
      <div className="h-full w-full p-5 @container md:w-[70%] md:overflow-y-scroll">
        <h3 className="text-3xl font-medium text-gray-800">Dashboard</h3>

        <div className="mt-10 flex flex-col items-start justify-start gap-5 @2xl:flex-row">
          <ShopStatCard />
          <SellerStatCard />
          <ProductStatCard />
        </div>
        <div className="mt-5 flex justify-end @container">
          <EarlyBirdInfo />
        </div>
      </div>

      <div className="mt-96 min-h-full max-w-3xl flex-1 space-y-10 border-l p-5 md:mt-0 md:w-[30%] md:overflow-y-auto">
        <div className="">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-medium text-gray-800">
              Product Photography
            </h3>
            <div className="rounded-full bg-gray-800 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21"
                  opacity="0.5"
                />
                <path
                  fill="currentColor"
                  d="M17.556 9.272a.826.826 0 0 0-.833.819c0 .452.373.818.833.818h1.111c.46 0 .834-.367.834-.818a.826.826 0 0 0-.834-.819z"
                />
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 9.272c-2.3 0-4.166 1.832-4.166 4.091c0 2.26 1.865 4.091 4.167 4.091c2.3 0 4.166-1.831 4.166-4.09c0-2.26-1.865-4.092-4.166-4.092m0 1.637c-1.38 0-2.5 1.099-2.5 2.454c0 1.356 1.12 2.455 2.5 2.455c1.381 0 2.5-1.099 2.5-2.455c0-1.355-1.119-2.454-2.5-2.454"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-2">
            <div className="flex items-start justify-between gap-2">
              <a
                href="https://helpdesk-support.kifgo.lk/product-photography/"
                target="_blank"
                className="text-base font-medium text-gray-800 underline"
              >
                Boost your Brand with Stunning Product Photography
              </a>
              <div className="px-2 text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="currentColor"
                      d="M5.47 17.47a.75.75 0 1 0 1.06 1.06zm1.06 1.06l12-12l-1.06-1.06l-12 12z"
                      opacity="0.5"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M9 6h9v9"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Enhance trust and sales with stunning product photos. Capture
            customer attention and drive sales success.
          </p>
        </div>

        <div className="">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-medium text-gray-800">Guidelines</h3>
            <div className="rounded-full bg-gray-800 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M10.75 2h2c2.828 0 4.243 0 5.121.879c.879.878.879 2.293.879 5.121v8c0 2.828 0 4.243-.879 5.121c-.878.879-2.293.879-5.121.879h-2c-2.828 0-4.243 0-5.121-.879c-.879-.878-.879-2.293-.879-5.121V8c0-2.828 0-4.243.879-5.121C6.507 2 7.922 2 10.75 2M8 13a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 8 13m0-4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 8 9m0 8a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 8 17" />
                  <path
                    d="M1.75 4.25A.75.75 0 0 1 2.5 5v14A.75.75 0 0 1 1 19V5a.75.75 0 0 1 .75-.75m20 0a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-7 w-full space-y-5">
            <div className="w-full">
              <div className="flex w-full items-start justify-between gap-2">
                <a
                  href="https://helpdesk-support.kifgo.lk/seller-guidelines/"
                  target="_blank"
                  className="text-base font-medium text-gray-800 underline"
                >
                  Seller PDF guideline here:
                </a>
                <div className="px-2 text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="currentColor"
                        d="M5.47 17.47a.75.75 0 1 0 1.06 1.06zm1.06 1.06l12-12l-1.06-1.06l-12 12z"
                        opacity="0.5"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 6h9v9"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                A vast library of searchable learning resources.
              </p>
            </div>

            <div className="w-full">
              <div className="flex w-full items-start justify-between gap-2">
                <a
                  href="https://helpdesk-support.kifgo.lk/"
                  target="_blank"
                  className="text-base font-medium text-gray-800 underline"
                >
                  Support Ticket:
                </a>
                <div className="px-2 text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="currentColor"
                        d="M5.47 17.47a.75.75 0 1 0 1.06 1.06zm1.06 1.06l12-12l-1.06-1.06l-12 12z"
                        opacity="0.5"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 6h9v9"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Get 24/7 help from kifgo specialists and automated assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-5 w-full rounded-xl bg-orange-100 p-5">
            <h3 className="text-base font-medium text-gray-800">
              Need quick support?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              To assist you better, contact us via phone call or what’s app.
            </p>

            <p className="mt-5 text-sm font-medium text-gray-800">
              English | Tamil | Sinhala
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              +94 76 631 2366
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
