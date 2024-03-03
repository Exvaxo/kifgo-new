import Image from "next/image";
import seller from "../../../public/seller.png";
import Header from "./Header";
import LinkButton from "./LinkButton";

const page = () => {
  return (
    <div className="h-[100dvh] overflow-auto px-5">
      <Header />

      <section className="mx-auto my-20 flex w-full max-w-screen-lg flex-col justify-between gap-10 md:my-32 md:flex-row md:items-center md:p-10">
        <div className="md:w-[50%]">
          <h2 className="text-center text-xl font-bold text-gray-800 md:text-3xl">
            Early bird <br /> gets the worm.
          </h2>
          <div className="mt-5 flex w-full items-center justify-center">
            <svg
              fill="none"
              className="w-52"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 272 306"
            >
              <g clip-path="url(#a)">
                <path
                  d="M0 88.84v127.669a24.998 24.998 0 0 0 12.5 21.65l110.57 63.84a24.992 24.992 0 0 0 25 0l110.56-63.83a25 25 0 0 0 12.5-21.65V88.839a25 25 0 0 0-12.5-21.66L148.07 3.35a25 25 0 0 0-25 0L12.5 67.18A25 25 0 0 0 0 88.84Z"
                  fill="#B41B5D"
                />
                <path
                  d="M215.28 168.639c-6.55 79-79.71 78.07-79.71 78.07s-73.16.92-79.71-78.07c-4.15-49.87 33.9-111 79.71-110 45.81-.98 83.86 60.13 79.71 110Z"
                  fill="#FFFFFD"
                />
                <path
                  d="M135.57 232.64c36.147 0 65.45-29.303 65.45-65.45 0-36.147-29.303-65.45-65.45-65.45-36.147 0-65.45 29.303-65.45 65.45 0 36.147 29.303 65.45 65.45 65.45Z"
                  fill="#FEDF15"
                />
                <path
                  d="m108.5 141.33 1-.17a48.21 48.21 0 0 1 7.52-1c1 0 1.54.41 1.54 1.24a.997.997 0 0 1-.61 1.05 4.297 4.297 0 0 1-1.42.25c-3.253.099-6.48.6-9.61 1.49a61.127 61.127 0 0 0-3.79 7.2 42.89 42.89 0 0 0-2.24 5.69l1.09-.39a51.774 51.774 0 0 1 5.33-1.59 22.761 22.761 0 0 1 4.27-.44c.682-.05 1.367.06 2 .32a1 1 0 0 1 .56 1 1.004 1.004 0 0 1-.68 1 7.085 7.085 0 0 1-1.51.13 25.924 25.924 0 0 0-11.53 3.17 2.47 2.47 0 0 1-1.12.37 1.52 1.52 0 0 1-1.22-.71 1.92 1.92 0 0 1-.47-1.2c.37-1.542.886-3.045 1.54-4.49 1.803-4.44 3.919-8.748 6.33-12.89.79-1.42 2.31-3.8 4.54-7.16.5-.78 1-1.54 1.46-2.29a1.29 1.29 0 0 1-.19-2.44 20.986 20.986 0 0 1 4.88-1.15 62.354 62.354 0 0 1 9.15-.83c1.42 0 2.13.37 2.13 1.12a1.618 1.618 0 0 1-.73 1.32c-.356.21-.768.304-1.18.27h-1.36a51.06 51.06 0 0 0-5.08.36 28.787 28.787 0 0 0-5 .93c.139.168.226.373.25.59a5.3 5.3 0 0 1-1.15 1.9l-1.2 1.79a65.018 65.018 0 0 0-3.5 5.56ZM123.54 155.37a18.436 18.436 0 0 1-1.59 2.39c-1 1.27-2 1.91-3 1.91a2.27 2.27 0 0 1-2.05-1.25 3.712 3.712 0 0 1-.47-1.9 13.063 13.063 0 0 1 1.71-6 15.735 15.735 0 0 1 4.59-5.59 5.787 5.787 0 0 1 3.39-1.27 2.41 2.41 0 0 1 1.71.63 1.73 1.73 0 0 1 .59 1.27 4.024 4.024 0 0 1-.42 1.49c.215.253.344.568.37.9a4.125 4.125 0 0 1-.68 1.69 18.645 18.645 0 0 0-1.42 3.17 10.76 10.76 0 0 0-.76 3.37c-.021.62.197 1.225.61 1.69a5.03 5.03 0 0 0 1 .56.997.997 0 0 1 .61 1 1.006 1.006 0 0 1-.35.76 1.278 1.278 0 0 1-.85.32 2.85 2.85 0 0 1-2.27-1.17 3.678 3.678 0 0 1-.78-2.4c-.04-.28-.01-.82.06-1.57Zm3-8a2.415 2.415 0 0 0-.64-.79 1.144 1.144 0 0 0-.73-.26c-1.24 0-2.574 1.083-4 3.25-1.594 2.393-2.39 4.42-2.39 6.08-.02.323.061.644.23.92a.809.809 0 0 0 .7.32c.78 0 1.69-.83 2.73-2.49.8-1.29 1.525-2.626 2.17-4 .369-.789.786-1.554 1.25-2.29a3.58 3.58 0 0 1 .73-.77l-.05.03ZM133.74 151.369a47.646 47.646 0 0 1 5.52-5 22.83 22.83 0 0 1 2.39-1.63c.244-.174.519-.3.81-.37.24 0 .49.18.73.54.13.147.208.334.22.53 0 .3-.31.7-.93 1.2-1.66 1.32-2.49 2.31-2.49 3 0 .37.21.56.64.56.7 0 1.9-.58 3.61-1.73.21-.167.463-.271.73-.3a.577.577 0 0 1 .39.2.652.652 0 0 1 .22.46c0 .49-.68 1.24-2.05 2.25a6.922 6.922 0 0 1-4.08 1.61 2.714 2.714 0 0 1-1.44-.41 1.327 1.327 0 0 1-.56-1.22c.032-.506.209-.992.51-1.4a24.66 24.66 0 0 0-4.54 4.69 33.442 33.442 0 0 0-3 5.06c-.37.74-.84 1.12-1.39 1.12-.55 0-.9-.29-.9-.86.29-1.531.763-3.022 1.41-4.44a33.588 33.588 0 0 1 4.4-8.32c.94-1.23 1.73-1.84 2.36-1.84.213.002.42.072.59.2a.758.758 0 0 1 .32.61c-.07.372-.239.718-.49 1-.07.08-.5.62-1.29 1.63a12.454 12.454 0 0 0-1.69 2.86ZM148.58 151.289c-.48 1.27-.85 2.3-1.09 3.08a6.405 6.405 0 0 0-.37 1.64.527.527 0 0 0 .348.584c.077.027.16.036.242.026.58 0 1.34-.56 2.27-1.66a30.238 30.238 0 0 0 2-2.91c.34-.55.7-.83 1.07-.83.37 0 .64.2.64.61 0 .666-.807 2.083-2.42 4.25-1.613 2.166-3.167 3.28-4.66 3.34a1.836 1.836 0 0 1-1.52-.78 2.265 2.265 0 0 1-.41-1.36c.08-1.299.36-2.577.83-3.79a56.81 56.81 0 0 1 2.47-5.88 81.222 81.222 0 0 1 8.57-14.53c2.32-3.06 4.247-4.59 5.78-4.59a1.495 1.495 0 0 1 1.2.56c.313.36.487.822.49 1.3 0 2.28-2.037 6.07-6.11 11.37a58.673 58.673 0 0 1-6.54 7.08c-.72.62-1.63 1.45-2.79 2.49Zm1.74-3.88a44.69 44.69 0 0 0 9.08-11c1.38-2.3 2.08-3.82 2.08-4.57 0-.36-.16-.54-.47-.54-.89 0-2.52 1.79-4.88 5.35a76.839 76.839 0 0 0-5.81 10.76ZM164.09 152.56c-1.453 1.707-2.61 2.977-3.47 3.81-1.707 1.627-3.13 2.44-4.27 2.44a1.587 1.587 0 0 1-1.32-.61 2 2 0 0 1-.37-1.22c0-1.75 1.05-4.09 3.13-7s3.64-4.45 4.59-4.45a.89.89 0 0 1 .68.34.895.895 0 0 1 .202.292c.046.11.069.229.068.348.009.335-.089.665-.28.94-.5.626-1.034 1.224-1.6 1.79a25.182 25.182 0 0 0-2.56 3.13 5.999 5.999 0 0 0-1.35 2.78.435.435 0 0 0 .116.379.438.438 0 0 0 .374.131c.65 0 1.87-.88 3.67-2.66 1.12-1.12 2-2.06 2.63-2.83.13-.16.7-.93 1.71-2.32.91-1.22 1.47-1.94 1.69-2.17a2.014 2.014 0 0 1 1.36-.86 1.003 1.003 0 0 1 .71.35 1.004 1.004 0 0 1 .29.73 5.809 5.809 0 0 1-1 2.37c-.78 1.35-1.5 2.61-2.15 3.78a37.418 37.418 0 0 0-2.37 4.88 13.478 13.478 0 0 0 2.86-2.22 13.765 13.765 0 0 0 2.68-3.27c.31-.65.63-1 1-1a.614.614 0 0 1 .665.411c.03.09.038.186.025.279 0 .86-.733 2.147-2.2 3.86a23.506 23.506 0 0 1-6.49 5.22 78.882 78.882 0 0 1-3.88 8.18c-2.28 4-4.633 6-7.06 6a2.877 2.877 0 0 1-2.39-1.15 3.418 3.418 0 0 1-.71-2.22c0-2.54 1.783-5.136 5.35-7.79 1.471-1.061 3-2.039 4.58-2.93.83-.47 1.48-.85 2-1.14.29-.75.74-1.75 1.34-3 .6-1.25 1.24-2.52 1.75-3.6Zm-4.49 9.6a24.673 24.673 0 0 0-5.3 3.76c-1.83 1.67-2.74 3.24-2.74 4.69-.008.284.088.562.27.78a1.195 1.195 0 0 0 .95.44c1.22 0 2.58-1.28 4.06-3.84.24-.42.907-1.826 2-4.22.23-.49.48-1.03.76-1.61ZM121.16 180.189a8.718 8.718 0 0 1 3.46 2.07 6.84 6.84 0 0 1 2 4.89 11.127 11.127 0 0 1-2 6.34 13.874 13.874 0 0 1-4.86 4.37 12.695 12.695 0 0 1-6.13 1.62 13.175 13.175 0 0 1-5.27-1.25 9.023 9.023 0 0 0-.27.88c-.21.76-.55 1.15-1 1.15a1.465 1.465 0 0 1-1.22-.81 2.001 2.001 0 0 1-.37-1.15c.188-1.242.552-2.45 1.08-3.59 1.46-3.74 2.743-6.677 3.85-8.81.69-1.32 2.1-3.82 4.25-7.52 1-1.59 2.3-3.77 4.08-6.52.42-.65.83-1.31 1.22-2a25.6 25.6 0 0 0-3 1.26 8.75 8.75 0 0 1-1.83.74.765.765 0 0 1-.64-.37 1.389 1.389 0 0 1-.27-.85 1.204 1.204 0 0 1 .52-1.1 17.58 17.58 0 0 1 3.32-1.64 22.88 22.88 0 0 1 8.08-2 6.543 6.543 0 0 1 4.2 1.29 4.007 4.007 0 0 1 1.61 3.25c0 2.667-1.557 5-4.67 7a25.997 25.997 0 0 1-6.14 2.75Zm-12.14 16c.389.245.797.459 1.22.64a7.67 7.67 0 0 0 2.79.41 9.925 9.925 0 0 0 8.32-4.12 11.402 11.402 0 0 0 2.66-6.86 4.153 4.153 0 0 0-2-3.64 5.004 5.004 0 0 0-2.81-.78 9.004 9.004 0 0 0-1.81.27 2.174 2.174 0 0 1-.44.05c-.39 0-.71-.29-1-.86a64.045 64.045 0 0 0-4.4 8.33 69.483 69.483 0 0 0-2.55 6.52l.02.04Zm8.47-17.48a22.986 22.986 0 0 0 7.82-2.95c2.827-1.713 4.24-3.413 4.24-5.1a1.998 1.998 0 0 0-1.12-1.83 3.922 3.922 0 0 0-2.05-.44c-.614.004-1.227.065-1.83.18-.705.138-1.399.322-2.08.55a.943.943 0 0 1 .42.78 3.258 3.258 0 0 1-.81 1.71c-.18.24-.5.72-1 1.44-.18.31-.73 1.13-1.64 2.47a36.415 36.415 0 0 0-1.95 3.15v.04ZM134.53 182.779a.849.849 0 0 1 .88.85 3.326 3.326 0 0 1-.7 1.47 44.99 44.99 0 0 0-3.62 6.46 55.035 55.035 0 0 0-2 5.38c-.26.81-.67 1.22-1.23 1.22a.937.937 0 0 1-.78-.39.999.999 0 0 1-.27-.69 26.12 26.12 0 0 1 1.57-4.88 33.875 33.875 0 0 1 3.95-7.23c.395-.61.836-1.189 1.32-1.73a1.245 1.245 0 0 1 .88-.46Zm4.64-9.06a.986.986 0 0 1 .821.293c.106.108.186.238.235.381.048.144.063.296.044.446a3.682 3.682 0 0 1-1.07 2.27 2.794 2.794 0 0 1-2 1.2 1.013 1.013 0 0 1-.76-.34 1.16 1.16 0 0 1-.29-.78c.087-.97.55-1.867 1.29-2.5a2.618 2.618 0 0 1 1.73-.97ZM139.17 189.369a48.619 48.619 0 0 1 5.52-5 23.968 23.968 0 0 1 2.39-1.63c.245-.172.52-.298.81-.37.24 0 .49.18.73.54.133.15.21.34.22.54 0 .29-.31.69-.93 1.19-1.66 1.32-2.49 2.31-2.49 3 0 .37.21.56.64.56.7 0 1.9-.58 3.61-1.73.21-.165.464-.266.73-.29a.551.551 0 0 1 .39.19.652.652 0 0 1 .22.46c0 .49-.68 1.24-2 2.25a6.919 6.919 0 0 1-4.07 1.61 2.676 2.676 0 0 1-1.44-.41 1.32 1.32 0 0 1-.454-.531c-.1-.215-.14-.453-.116-.689.032-.507.213-.994.52-1.4a24.364 24.364 0 0 0-4.54 4.69 34.325 34.325 0 0 0-3 5.06c-.37.74-.84 1.12-1.39 1.12-.55 0-.9-.29-.9-.86.278-1.54.742-3.041 1.38-4.47a33.842 33.842 0 0 1 4.4-8.32c.94-1.23 1.73-1.84 2.37-1.84.21.004.413.074.58.2a.748.748 0 0 1 .32.61c-.065.373-.235.72-.49 1l-1.29 1.63a12.814 12.814 0 0 0-1.72 2.89ZM159.85 183.139c1.627-3.4 3.167-6.36 4.62-8.88a49.066 49.066 0 0 1 2.85-4.62c.56-.667 1.08-1 1.56-1a1.056 1.056 0 0 1 1 1 4.457 4.457 0 0 1-.83 1.88 151.221 151.221 0 0 0-6.5 11.6c-2.28 4.566-3.42 7.993-3.42 10.28a3.88 3.88 0 0 0 .54 2.19c.26.298.556.563.88.79a.6.6 0 0 1 .15.48 1.274 1.274 0 0 1-.38.89 1.163 1.163 0 0 1-.84.41 1.892 1.892 0 0 1-1.25-.69 4.004 4.004 0 0 1-1.17-2.24c0-.36-.11-1-.17-2-1.713 3.066-3.343 4.603-4.89 4.61a2.39 2.39 0 0 1-2.14-1.51 4.732 4.732 0 0 1-.54-2.27 13.105 13.105 0 0 1 2.78-7.67c1.84-2.54 3.817-3.81 5.93-3.81a3.271 3.271 0 0 1 1.82.56Zm-.83 2a2.182 2.182 0 0 0-1.15-.44c-1.36 0-2.66.84-3.88 2.52a10.718 10.718 0 0 0-2.41 6.32 1.58 1.58 0 0 0 .14.69 1.008 1.008 0 0 0 .88.61c.57 0 1.26-.56 2.08-1.66a29.224 29.224 0 0 0 3-5.2c.33-.69.65-1.37 1-2l.22-.47.12-.37Z"
                  fill="#000"
                />
                <path
                  d="M260.13 95.26v114.82a24.995 24.995 0 0 1-12.5 21.65l-99.45 57.42a25.004 25.004 0 0 1-12.61 3.35V12.84a25 25 0 0 1 12.61 3.35l99.45 57.42a25 25 0 0 1 12.5 21.65Z"
                  fill="#000"
                  opacity=".05"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h271.13v305.34H0z" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-10 md:w-[50%]">
          <div className="flex w-full flex-col items-center justify-center border-b border-gray-300 pb-5">
            <h2 className="mt-5 text-center text-3xl font-bold text-gray-800 md:text-left md:text-5xl">
              Benefits for early bird Registrations
            </h2>
            <p className="mt-2 text-center text-base text-gray-600 md:text-left">
              Whoever registers with Kifgo before launch are our lucky early
              birds!
            </p>
          </div>
          <div className="mt-5 space-y-10">
            <div className="flex items-start justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                />
              </svg>

              <div className="">
                <h3 className="text-base font-medium text-gray-800">
                  You will get an Early Bird badge
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  A badge will be provided to recognize our early bird members
                  to have competitive edge and to ensure best service.
                </p>
              </div>
            </div>

            <div className="flex items-start justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                />
              </svg>

              <div className="">
                <h3 className="text-base font-medium text-gray-800">
                  Early Access to All new features
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Exclusive access to our exciting new features and tools for
                  all early bird members.
                </p>
              </div>
            </div>

            <div className="flex items-start justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                />
              </svg>

              <div className="">
                <h3 className="text-base font-medium text-gray-800">
                  No Listing Fees
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Listing fees and related commissions are wiped off for our
                  early bird members.
                </p>
              </div>
            </div>

            <div className="flex items-start justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                />
              </svg>

              <div className="">
                <h3 className="text-base font-medium text-gray-800">
                  Rapid Customer Support
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  All our early bird members&apos; queries will be prioritized
                  for their whole lifetime.
                </p>
              </div>
            </div>

            <div className="flex items-start justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                />
              </svg>

              <div className="">
                <h3 className="text-base font-medium text-gray-800">
                  Support through Training
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Priority allotment is ensured for all our free training
                  sessions and workshops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto my-20 flex w-full max-w-screen-lg flex-col-reverse justify-between gap-10 md:my-32 md:flex-row md:items-center md:p-10">
        <div className="flex flex-col items-start justify-start gap-10 md:w-[50%]">
          <div className="flex items-start justify-start gap-5">
            {/* number */}
            <div className="flex aspect-square w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
              1
            </div>
            {/* number */}
            <div className="">
              <h3 className="-mt-px text-lg font-medium text-gray-800">
                Register and list your products
              </h3>

              <p className="mt-1 text-sm/6 text-gray-600">
                Use your National Identity Card details, bank account
                information, or credit card information to register yourself
                with Kifgo.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-5">
            {/* number */}
            <div className="flex aspect-square w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
              2
            </div>
            {/* number */}
            <div className="">
              <h3 className="-mt-px text-lg font-medium text-gray-800">
                Receive orders and sell your product
              </h3>

              <p className="mt-1 text-sm/6 text-gray-600">
                Use our suite of tools to onboard your inventory and start
                selling your products by receiving orders once registered.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-5">
            {/* number */}
            <div className="flex aspect-square w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
              3
            </div>
            {/* number */}
            <div className="">
              <h3 className="-mt-px text-lg font-medium text-gray-800">
                Package and ship with ease
              </h3>

              <p className="mt-1 text-sm/6 text-gray-600">
                Pack the products and ship them to the customers using a range
                of shipping partners.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-5">
            {/* number */}
            <div className="flex aspect-square w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
              4
            </div>
            {/* number */}
            <div className="">
              <h3 className="-mt-px text-lg font-medium text-gray-800">
                Get payments and grow your business
              </h3>

              <p className="mt-1 text-sm/6 text-gray-600">
                Get paid for your valuable service and take your business to the
                next level by growing your market share.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-[50%]">
          <h2 className="text-left text-5xl font-bold text-gray-800 md:text-right md:text-6xl">
            Grow your business with Kifgo
          </h2>
        </div>
      </section>

      <section className="mx-auto my-20 flex w-full max-w-screen-lg items-center justify-between gap-10 rounded-3xl bg-gray-50 p-10 md:my-32">
        <div className="w-full">
          <h3 className="text-4xl font-medium text-gray-800">
            Simple, transparent, secure
          </h3>

          <div className="mt-16 flex w-full flex-col justify-between md:flex-row md:items-center">
            <div className="space-y-5 md:pr-10">
              <div className="flex items-center justify-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-800"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
                      clip-rule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M2 6.5c0-2.121 0-3.182.659-3.841C3.318 2 4.379 2 6.5 2c2.121 0 3.182 0 3.841.659C11 3.318 11 4.379 11 6.5c0 2.121 0 3.182-.659 3.841C9.682 11 8.621 11 6.5 11c-2.121 0-3.182 0-3.841-.659C2 9.682 2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841C14.318 13 15.379 13 17.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659c-2.121 0-3.182 0-3.841-.659C13 20.682 13 19.621 13 17.5"
                    />
                    <path
                      fill="currentColor"
                      d="M2 17.5c0-2.121 0-3.182.659-3.841C3.318 13 4.379 13 6.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841C9.682 22 8.621 22 6.5 22c-2.121 0-3.182 0-3.841-.659C2 20.682 2 19.621 2 17.5"
                      opacity=".5"
                    />
                  </svg>
                </div>

                <div className="">
                  <h5 className="text-base font-medium text-gray-800">
                    Free of Listing fee
                  </h5>

                  <p className="text-xs text-gray-600">
                    We currently do not charge any fees
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-800"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 20h4c3.771 0 5.657 0 6.828-1.172C22 17.657 22 15.771 22 12c0-.442-.002-1.608-.004-2H2c-.002.392 0 1.558 0 2c0 3.771 0 5.657 1.171 6.828C4.343 20 6.23 20 10 20"
                      opacity=".5"
                    />
                    <path
                      fill="currentColor"
                      d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4M12.5 15.25a.75.75 0 0 0 0 1.5H14a.75.75 0 0 0 0-1.5zm-6.5 0a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
                    />
                  </svg>
                </div>

                <div className="">
                  <h5 className="text-base font-medium text-gray-800">
                    3% Transaction fee, + 3% payment processing fee*
                  </h5>

                  <p className="text-xs text-gray-600">
                    We currently do not charge any fees
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-3 md:mt-0 md:pl-10">
              <div className="flex items-center justify-start gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="m4 12.9l3.143 3.6L15 7.5" opacity=".5" />
                      <path d="m20 7.563l-8.571 9L11 16" />
                    </g>
                  </svg>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  No additional monthly fees
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="m4 12.9l3.143 3.6L15 7.5" opacity=".5" />
                      <path d="m20 7.563l-8.571 9L11 16" />
                    </g>
                  </svg>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  Secure transactions
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="m4 12.9l3.143 3.6L15 7.5" opacity=".5" />
                      <path d="m20 7.563l-8.571 9L11 16" />
                    </g>
                  </svg>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  Automatic deposits
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="m4 12.9l3.143 3.6L15 7.5" opacity=".5" />
                      <path d="m20 7.563l-8.571 9L11 16" />
                    </g>
                  </svg>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  Seller protection
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M6.75 8a5.25 5.25 0 0 1 10.335-1.313a.75.75 0 0 0 1.452-.374A6.75 6.75 0 0 0 5.25 8v2.055c-1.115.083-1.84.293-2.371.824C2 11.757 2 13.172 2 16c0 2.828 0 4.243.879 5.121C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.243 22 18.828 22 16c0-2.828 0-4.243-.879-5.121C20.243 10 18.828 10 16 10H8c-.452 0-.867 0-1.25.004zM8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <p className="w-full max-w-xs text-[0.6rem]/4 text-gray-500">
              We process payments on our secure, SSL-encrypted platform, and
              have security specialists and fraud detection systems to protect
              you and your buyers 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto my-20 flex w-full max-w-screen-lg flex-col items-center justify-start gap-10 md:my-32">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center text-5xl font-bold text-gray-800">
            Help when you need it
          </h3>

          <p className="mt-5 max-w-sm text-center text-xs text-gray-600">
            We&apos;re committed to helping our sellers thrive, with support and
            education for shops big and small.
          </p>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-3 md:grid-cols-4">
          <div className="flex flex-col items-center justify-start rounded-xl bg-gray-50 p-10">
            <div className="rounded-full bg-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.634 1.634 0 0 1 1.149.133A9.958 9.958 0 0 0 12 22"
                  opacity=".5"
                />
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 6.775a.825.825 0 0 0-.825.825v8.8a.825.825 0 0 0 1.65 0V7.6A.825.825 0 0 0 12 6.775m-4.4 2.2a.825.825 0 0 0-.825.825v4.4a.825.825 0 0 0 1.65 0V9.8a.825.825 0 0 0-.825-.825"
                  clip-rule="evenodd"
                />
                <path
                  fill="currentColor"
                  d="M15.575 9.8a.825.825 0 0 1 1.65 0v4.4a.825.825 0 0 1-1.65 0z"
                />
              </svg>
            </div>

            <h4 className="mt-5 text-center text-base font-medium text-gray-800">
              Talk to us
            </h4>

            <p className="mt-3 text-center text-xs text-gray-600">
              Reach our support staff by email or request a phone call whenever
              you have a question.
            </p>
          </div>

          <div className="flex flex-col items-center justify-start rounded-xl bg-gray-50 p-10">
            <div className="rounded-full bg-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"
                />
                <path
                  fill="currentColor"
                  d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
                  opacity=".4"
                />
                <path
                  fill="currentColor"
                  d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"
                />
                <path
                  fill="currentColor"
                  d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5"
                  opacity=".4"
                />
              </svg>
            </div>

            <h4 className="mt-5 text-center text-base font-medium text-gray-800">
              Tips for success
            </h4>

            <p className="mt-3 text-center text-xs text-gray-600">
              Learn best practices for your business with our always-updating
              Seller Handbook.
            </p>
          </div>

          <div className="flex flex-col items-center justify-start rounded-xl bg-gray-50 p-10">
            <div className="rounded-full bg-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M24 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-6.766 2.464l-1.537 1.28c-1.026.856-1.738 1.447-2.34 1.834c-.582.375-.977.5-1.357.5s-.774-.125-1.357-.5c-.601-.386-1.314-.978-2.34-1.834L5.928 6.765a.825.825 0 0 0-1.056 1.268l2.416 2.014c.975.812 1.765 1.47 2.463 1.92c.726.466 1.434.762 2.25.762c.814 0 1.522-.296 2.249-.763c.697-.448 1.487-1.107 2.462-1.92l1.666-1.388a4.524 4.524 0 0 1-1.144-1.194"
                />
                <path
                  fill="currentColor"
                  d="M18.454 6.587a.825.825 0 0 1 .958.959a3.015 3.015 0 0 1-.958-.959"
                />
                <path
                  fill="currentColor"
                  d="M16.958 3.021C16.156 3 15.244 3 14.2 3H9.8C5.652 3 3.577 3 2.289 4.318C1 5.636 1 7.758 1 12c0 4.243 0 6.364 1.289 7.682C3.577 21 5.652 21 9.8 21h4.4c4.148 0 6.223 0 7.511-1.318C23 18.364 23 16.242 23 12c0-1.067 0-2-.02-2.82a4.4 4.4 0 0 1-1.98.468c-2.485 0-4.5-2.06-4.5-4.603c0-.726.165-1.413.458-2.024"
                  opacity=".5"
                />
              </svg>
            </div>

            <h4 className="mt-5 text-center text-base font-medium text-gray-800">
              Seller newsletter
            </h4>

            <p className="mt-3 text-center text-xs text-gray-600">
              Read the Kifgo Success newsletter for tips on improving your shop,
              delivered straight to your inbox.
            </p>
          </div>

          <div className="flex flex-col items-center justify-start rounded-xl bg-gray-50 p-10">
            <div className="rounded-full bg-white p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-800"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 9.674C4 5.436 7.358 2 11.5 2C15.642 2 19 5.436 19 9.674a7.736 7.736 0 0 1-2.499 5.72c-.51.467-.889.814-1.157 1.066a14.926 14.926 0 0 0-.4.39l-.025.027l-.008.01c-.237.298-.288.375-.318.445c-.03.07-.053.16-.113.54c-.023.15-.026.406-.026 1.105v.03c0 .409 0 .762-.025 1.051c-.027.306-.087.61-.248.895a2.07 2.07 0 0 1-.75.767c-.278.165-.575.226-.874.254c-.283.026-.628.026-1.028.026h-.058c-.4 0-.745 0-1.028-.026c-.3-.028-.596-.09-.875-.254a2.07 2.07 0 0 1-.749-.767c-.16-.285-.22-.588-.248-.895c-.026-.29-.026-.642-.026-1.051v-.03c0-.699-.002-.955-.026-1.105c-.06-.38-.081-.47-.112-.54c-.03-.07-.081-.147-.318-.446l-.008-.01a14.896 14.896 0 0 0-.425-.417c-.268-.25-.647-.598-1.157-1.066A7.736 7.736 0 0 1 4 9.674"
                  opacity=".5"
                />
                <path
                  fill="currentColor"
                  d="M13.085 19.675h-3.17c.003.097.007.181.014.258c.018.21.05.285.071.323a.69.69 0 0 0 .25.256c.037.021.111.054.316.072c.214.02.496.021.934.021c.437 0 .72 0 .934-.02c.204-.02.279-.052.316-.073a.69.69 0 0 0 .25-.256c.02-.038.052-.114.07-.323c.007-.076.012-.161.015-.258M12.61 8.177c.307.224.378.66.159.973l-1.178 1.688h1.402a.68.68 0 0 1 .606.378a.711.711 0 0 1-.051.725L11.6 14.73a.672.672 0 0 1-.951.163a.708.708 0 0 1-.159-.973l1.178-1.688h-1.402a.68.68 0 0 1-.606-.379a.711.711 0 0 1 .051-.724l1.948-2.79a.672.672 0 0 1 .951-.163"
                />
              </svg>
            </div>

            <h4 className="mt-5 text-center text-base font-medium text-gray-800">
              Get advice
            </h4>

            <p className="mt-3 text-center text-xs text-gray-600">
              Ask questions and find a community of sellers like you in
              Kifgo&apos;s forums and Teams.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto my-20 w-full max-w-screen-lg md:my-32">
        <h4 className="text-4xl font-medium text-gray-800">Seller FAQs</h4>
        <p className="mt-3 max-w-xl text-sm text-gray-600">
          Have a different question and can&apos;t find the answer you&apos;re
          looking for? Reach out to our{" "}
          <a
            className="font-medium text-skin-primary hover:underline"
            href="https://helpdesk-support.kifgo.lk/seller-guidelines/"
            target="_blank"
          >
            support team
          </a>{" "}
          and we&apos;ll get back to you as soon as we can.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 gap-16 md:grid-cols-3">
          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              What can I sell on Kifgo?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              Kifgo provides a marketplace for crafters,artists, and collectors
              to sell their handmade creations, vintage goods (at least 20 years
              old), and both handmade and non-handmade crafting supplies. that
              is homemade, handmade, and vintage items. We restrict items that
              violate any laws or infringe on intellectual property.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              What do I need to do to create a shop?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              It&apos;s easy to set up a shop on Kifgo. To get started, register
              yourself with Kifgo with just 4 easy steps. Create a Kifgo account
              (if you don&apos;t already have one), set your shop location and
              choose a shop name, create a listing, set a payment method (how
              you want to be paid),and finally set a billing method (how you
              want to pay your Kifgo fees). We&apos;ll help you create and
              verify your account through step-by-step instructions
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              How much does it cost to sell?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              Joining and starting a shop on Kifgo is free.There are three basic
              selling fees involved: a listing fee, a transaction fee,and a
              payment processing fee.
              <br />
              <br />
              Listing on the Kifgo marketplace is fully free for the next two
              years and charges on the listing charges will be reviewed every
              year and be notified. Each listing will last till the item is sold
              and every sale involves a 3% transaction fee and a 3% payment
              processing fee on the total sale price (including the shipping
              price you set)
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              How does Kifgo protect sellers?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              We understand that things can happen that are out of your control
              as a seller. Eligible purchases made using Kifgo Payments qualify
              for Kifgo Purchase Protection. This means that Kifgo will refund
              buyer sand you&apos;ll keep your earnings if a qualifying order is
              damaged or doesn&apos;t arrive.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              What&apos;s the best way to ship my item?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              You can choose a preferred shipping carrier depending on your
              convenience.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              Can I sell Internationally on Kifgo?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              As Kifgo opens its market to foreign customers shortly, when
              creating your listing, you can offer information supporting
              international sales and can start sales immediately after the
              market opens for international consumers.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              How much will it cost to ship my item?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              You can choose the shipping option that offers the greatest value
              and convenience for you.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              How do I get paid?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              With Kigo Payments, our easy-to-use and secure payment system, you
              may accept payments from a wide variety of payment methods
              including credit and debit cards. Funds from your sales are
              deposited directly to your bank account, no matter how or from
              where the buyer pays.
            </p>
          </div>

          <div className="">
            <h3 className="text-base font-bold text-gray-800">
              When will I get paid?
            </h3>
            <p className="mt-3 text-sm/6 text-gray-600">
              After we confirm the buyer&apos;s payment has been received,
              payouts are sent directly to your bank account, Monday through
              Friday(excluding bank holidays), within Five business days. Once a
              payout is initiated, funds are typically available within 4-5
              business days depending on your bank&apos;s normal processing
              time.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-5 mt-20 w-full max-w-screen-lg md:mb-10 md:mt-32">
        <h4 className="text-4xl font-medium text-gray-800">
          Got questions? We&apos;re here to help
        </h4>

        <p className="mt-3 text-sm text-gray-600">
          Here are some resources that sellers new to kifgo find helpful.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 md:grid-cols-4">
          <div className="">
            <div className="gap3 flex items-center justify-start gap-2">
              <a
                href="https://helpdesk-support.kifgo.lk/seller-guidelines/"
                target="_blank"
                className="text-base font-medium text-gray-800 hover:underline"
              >
                Seller Center
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M4 11.25a.75.75 0 0 0 0 1.5zm0 1.5h16v-1.5H4z"
                    opacity=".5"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14 6l6 6l-6 6"
                  />
                </g>
              </svg>
            </div>

            <p className="mt-2 text-xs text-gray-600">
              A vast library of searchable learning resources.
            </p>
          </div>

          <div className="mt-5 md:mt-0">
            <div className="gap3 flex items-center justify-start gap-2">
              <a
                href="https://helpdesk-support.kifgo.lk/"
                target="_blank"
                className="text-base font-medium text-gray-800 hover:underline"
              >
                Customer service
              </a>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M4 11.25a.75.75 0 0 0 0 1.5zm0 1.5h16v-1.5H4z"
                    opacity=".5"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14 6l6 6l-6 6"
                  />
                </g>
              </svg>
            </div>

            <p className="mt-2 text-xs text-gray-600">
              Get 24/7 help from kifgo specialists and automated assistance.
            </p>
          </div>
        </div>

        <div className="relative mt-10 h-96 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 z-30 flex w-full items-center p-10">
            <div className="w-full max-w-sm">
              <h3 className="text-5xl font-bold text-white">
                Open your store on Kifgo
              </h3>

              <p className="mt-3 text-sm text-gray-100">
                Pick a storefront plan that works best for your business needs
                to start building out your brand on Kifgo.
              </p>

              <div className="mt-5">
                <LinkButton />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-20 w-full bg-black/50"></div>

          <Image
            fill
            src={seller}
            placeholder="blur"
            alt="Handcrafting pot"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default page;
