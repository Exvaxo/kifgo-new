import Image from "next/image";
import lanka from "../../public/Lanka.png";
import HandleUser from "./HandleUser";
import Cta from "./user/Cta";

export default async function Home() {
  return (
    <>
      <main className="h-full overflow-y-auto">
        {process.env.NODE_ENV === "development" ? (
          // <HandleUser />
          <section className="min-h-[100dvh] bg-gray-950 p-2">
            <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
              <main className="mx-auto flex min-h-[100dvh] w-full items-center justify-center gap-10 p-10">
                <div className="relative z-20 flex w-full max-w-2xl flex-col items-start justify-center">
                  {/* logo */}
                  <div className="flex items-start justify-start gap-1">
                    <div className="aspect-square rounded-full bg-[#cd0a5d] p-1">
                      <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 218 132"
                      >
                        <g clip-path="url(#a)" fill="#F2F2F2">
                          <path d="M104.668 49.036V0H49.123c-1.07 0-2.9.347-4.245.554a49.338 49.338 0 0 0-7.595 1.699 51.656 51.656 0 0 0-7.595 2.98 33.05 33.05 0 0 0-3.107 1.629 46.989 46.989 0 0 0-4.487 2.876 50.28 50.28 0 0 0-5.8 4.748 23.799 23.799 0 0 0-1.864 1.871A50.385 50.385 0 0 0 9.7 22.11a47.23 47.23 0 0 0-2.796 4.505 33.27 33.27 0 0 0-1.622 3.119 52.101 52.101 0 0 0-2.969 7.624A52.968 52.968 0 0 0 0 52.606c-.007 2.552.177 5.1.553 7.624.37 2.58.936 5.13 1.691 7.624a53.628 53.628 0 0 0 2.969 7.624 37.568 37.568 0 0 0 1.622 3.084 47.706 47.706 0 0 0 2.866 4.61 53.21 53.21 0 0 0 4.729 5.718 32.206 32.206 0 0 0 1.864 1.906 49.99 49.99 0 0 0 5.73 4.712 55.264 55.264 0 0 0 4.488 2.912 65.077 65.077 0 0 0 3.107 1.628 51.648 51.648 0 0 0 7.595 2.981 49.417 49.417 0 0 0 7.595 1.663 49.63 49.63 0 0 0 7.594.555c2.542.007 5.08-.178 7.595-.555a51.209 51.209 0 0 0 7.594-1.663 53.224 53.224 0 0 0 7.595-2.981l3.072-1.629a55.86 55.86 0 0 0 4.522-2.91 52.783 52.783 0 0 0 7.595-6.62 52.913 52.913 0 0 0 4.695-5.718 56.193 56.193 0 0 0 2.9-4.54 86.973 86.973 0 0 0 1.622-3.084 53.647 53.647 0 0 0 2.969-7.624 49.85 49.85 0 0 0 2.106-15.317c0-1.248.069-2.391 0-3.57ZM91.239 60.23c-.242 1.213-.518 2.426-.863 3.465-.345 1.04-.897 2.703-1.415 4.02a41.983 41.983 0 0 1-4.212 7.624 45.86 45.86 0 0 1-1.968 2.565 38.714 38.714 0 0 1-5.04 5.267 45.796 45.796 0 0 1-2.554 1.976 41.721 41.721 0 0 1-7.595 4.228 54.955 54.955 0 0 1-4.004 1.42c-1.346.416-2.382.624-3.452.867a39.44 39.44 0 0 1-7.595.728 38.927 38.927 0 0 1-7.594-.728c-1.243-.243-2.417-.52-3.453-.867-1.035-.346-2.727-.9-4.004-1.42a40.582 40.582 0 0 1-7.595-4.228 36.46 36.46 0 0 1-2.589-1.976 38.424 38.424 0 0 1-5.005-5.06 46.587 46.587 0 0 1-2.002-2.564 39.825 39.825 0 0 1-4.177-7.624 34.735 34.735 0 0 1-1.416-4.02 57.534 57.534 0 0 1-.897-3.465 39.898 39.898 0 0 1-.725-7.624 39.376 39.376 0 0 1 .448-7.763c.242-1.247.553-2.426.898-3.465a30.699 30.699 0 0 1 1.415-4.02 38.824 38.824 0 0 1 4.177-7.832c.622-.901 1.312-1.768 2.003-2.6a38.05 38.05 0 0 1 5.005-5.024c.829-.693 1.692-1.386 2.59-2.01a38.581 38.581 0 0 1 7.594-4.194 30.444 30.444 0 0 1 4.004-1.42 50.99 50.99 0 0 1 3.452-.901c1.105-.243 2.866-.45 4.316-.59 1.45-.138 2.174 0 3.279 0 2.549-.003 5.092.24 7.595.728 1.208.243 2.416.555 3.452.901 1.362.391 2.7.865 4.004 1.421a39.577 39.577 0 0 1 7.595 4.193 46.479 46.479 0 0 1 2.554 2.01 38.4 38.4 0 0 1 5.386 4.887c.69.831 1.346 1.698 1.967 2.599a40.835 40.835 0 0 1 4.212 7.624 45.809 45.809 0 0 1 1.415 4.02c.415 1.386.622 2.356.863 3.465.489 2.512.732 5.065.725 7.624v2.08a36.841 36.841 0 0 1-.794 5.683ZM217.482 45.051a54.28 54.28 0 0 0-1.691-7.624 52.138 52.138 0 0 0-2.969-7.624c-.518-1.074-1.036-2.114-1.623-3.119a54.924 54.924 0 0 0-2.865-4.505 54.446 54.446 0 0 0-4.66-5.822l-1.864-1.871a53.442 53.442 0 0 0-5.731-4.748 47.365 47.365 0 0 0-4.626-2.807 37.248 37.248 0 0 0-3.072-1.629 51.669 51.669 0 0 0-7.595-2.98 52.345 52.345 0 0 0-30.378 0 51.669 51.669 0 0 0-7.595 2.98 37.41 37.41 0 0 0-3.072 1.63 47.437 47.437 0 0 0-4.522 2.875 53.44 53.44 0 0 0-5.731 4.748l-1.76 1.802a54.176 54.176 0 0 0-4.833 5.753 55.203 55.203 0 0 0-2.866 4.505c-.586 1.005-1.104 2.045-1.622 3.119a52.134 52.134 0 0 0-2.969 7.624 54.408 54.408 0 0 0-1.519 7.693 55.094 55.094 0 0 0-.552 7.624c.009 2.551.194 5.099.552 7.624a56.59 56.59 0 0 0 1.692 7.624 53.612 53.612 0 0 0 2.969 7.624c.517 1.04 1.035 2.08 1.622 3.085.898 1.56 1.83 3.084 2.865 4.54a57.615 57.615 0 0 0 4.661 5.648l1.864 1.906a53.092 53.092 0 0 0 5.73 4.713 55.804 55.804 0 0 0 4.523 2.911l3.072 1.63a51.615 51.615 0 0 0 7.595 2.979 53.365 53.365 0 0 0 30.378 0 51.659 51.659 0 0 0 7.595-2.98l3.072-1.629a55.96 55.96 0 0 0 4.522-2.91 53.2 53.2 0 0 0 5.731-4.714l1.864-1.906a57.801 57.801 0 0 0 4.626-5.648c1.035-1.456 1.967-2.98 2.865-4.54.587-1.005 1.105-2.045 1.622-3.085a53.612 53.612 0 0 0 2.969-7.624 56.59 56.59 0 0 0 1.692-7.624c.358-2.525.543-5.073.552-7.624a55.079 55.079 0 0 0-.518-7.624Zm-12.289 7.624a39.971 39.971 0 0 1-.725 7.624c-.242 1.213-.518 2.426-.863 3.466a42.626 42.626 0 0 1-1.416 4.02 39.945 39.945 0 0 1-4.211 7.624 45.962 45.962 0 0 1-1.968 2.564 40.683 40.683 0 0 1-5.04 5.198 36.254 36.254 0 0 1-2.589 1.976 40.582 40.582 0 0 1-7.595 4.228 49.576 49.576 0 0 1-4.004 1.42c-1.381.416-2.382.624-3.452.867-5.017.97-10.172.97-15.189 0-1.209-.243-2.417-.52-3.452-.866-1.036-.347-2.693-.901-4.005-1.421a40.542 40.542 0 0 1-7.594-4.228 36.5 36.5 0 0 1-2.59-1.976 40.726 40.726 0 0 1-5.005-5.06 45.962 45.962 0 0 1-1.968-2.564 40 40 0 0 1-4.211-7.624 42.704 42.704 0 0 1-1.588-4.089 32.007 32.007 0 0 1-.863-3.465 39.81 39.81 0 0 1-.725-7.624 39.33 39.33 0 0 1 .725-7.624c.219-1.172.507-2.329.863-3.466a36.623 36.623 0 0 1 1.415-4.02 38.957 38.957 0 0 1 4.212-7.624 36.588 36.588 0 0 1 1.967-2.599 40.44 40.44 0 0 1 5.006-5.025c.828-.693 1.691-1.386 2.589-2.01a38.572 38.572 0 0 1 7.595-4.193 32.33 32.33 0 0 1 4.004-1.421 57.1 57.1 0 0 1 3.452-.901 39.996 39.996 0 0 1 15.189 0c1.209.243 2.417.554 3.452.901 1.365.385 2.702.86 4.005 1.42a38.564 38.564 0 0 1 7.594 4.194c.898.624 1.761 1.317 2.59 2.01a40.363 40.363 0 0 1 5.005 5.025c.69.832 1.346 1.698 1.968 2.6a38.953 38.953 0 0 1 4.211 7.623 36.818 36.818 0 0 1 1.692 3.743 51.08 51.08 0 0 1 .863 3.465c.463 2.56.671 5.161.621 7.763l.035.07ZM97.073 117.583a61.116 61.116 0 0 1-3.97 2.669 154.567 154.567 0 0 1-2.727 1.663 86.298 86.298 0 0 1-7.595 3.812c-1.83.797-3.693 1.49-5.592 2.149l-2.002.658a81.16 81.16 0 0 1-7.595 1.941 69.253 69.253 0 0 1-7.594 1.144c-2.52.242-5.04.381-7.595.381-2.555 0-5.11 0-7.595-.381a68.046 68.046 0 0 1-7.594-1.144 76.11 76.11 0 0 1-7.595-1.941l-2.002-.658c-1.864-.659-3.728-1.352-5.558-2.149a81.704 81.704 0 0 1-7.595-3.812c-.932-.554-1.864-1.074-2.761-1.663a69.237 69.237 0 0 1-4.523-3.084l6.456-11.229.828.624a57.69 57.69 0 0 0 7.595 4.852l2.313 1.213c1.726.832 3.452 1.629 5.282 2.287a55.192 55.192 0 0 0 7.594 2.391c2.5.613 5.037 1.065 7.595 1.352 5.045.6 10.144.6 15.189 0a62.267 62.267 0 0 0 7.595-1.352 58.378 58.378 0 0 0 7.594-2.391c1.795-.658 3.452-1.455 5.248-2.287l2.347-1.213a62.581 62.581 0 0 0 7.594-4.852l.242-.173 6.421 11.193Z" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h218v132H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <svg
                      fill="none"
                      className="w-20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 197 96"
                    >
                      <g clip-path="url(#a)" fill="#000">
                        <path d="m9.06 45.45 22.81-22.91a3.89 3.89 0 0 1 2.74-1.14 3.87 3.87 0 0 1 2.74 6.6L20.51 44.77l18.94 24.07a4.14 4.14 0 0 1-3.25 6.7A4.14 4.14 0 0 1 33 74L14.11 50.34l-5 4.79V71a4.53 4.53 0 0 1-4.53 4.53A4.532 4.532 0 0 1 0 71V5a4.53 4.53 0 1 1 9.06 0v40.45ZM53.08 12.29a5.41 5.41 0 0 1-4-1.67 5.4 5.4 0 0 1-1.66-4 5.371 5.371 0 0 1 1.66-4 5.46 5.46 0 0 1 4-1.64 5.53 5.53 0 0 1 4 1.64 5.37 5.37 0 0 1 1.66 4 5.4 5.4 0 0 1-1.66 4 5.482 5.482 0 0 1-4 1.67ZM48.55 71V25.93a4.53 4.53 0 1 1 9.06 0V71a4.529 4.529 0 0 1-9.06 0ZM69.56 71V28.84h-3.83A3.73 3.73 0 0 1 62 25.12a3.72 3.72 0 0 1 3.72-3.72h3.83v-6c0-5.207 1.223-9.07 3.67-11.59C75.667 1.29 79.393.02 84.4 0c.67 0 1.34 0 2 .05a3.7 3.7 0 0 1 3.52 3.7 3.689 3.689 0 0 1-3.74 3.7h-.38c-4.82 0-7.23 2.667-7.23 8v6h7.36a3.71 3.71 0 0 1 3.72 3.72 3.72 3.72 0 0 1-3.72 3.72h-7.31V71a4.531 4.531 0 0 1-9.06 0ZM115.56 96a25.88 25.88 0 0 1-15.31-4.51A19.52 19.52 0 0 1 95.6 87a4.37 4.37 0 0 1 3.54-7h.17a4.43 4.43 0 0 1 3.74 2.11 11.836 11.836 0 0 0 4.07 3.89 16.79 16.79 0 0 0 8.8 2.24c4.667 0 8.333-1.23 11-3.69a12.656 12.656 0 0 0 4-9.79v-8.54h-.21a18.87 18.87 0 0 1-7.13 7.11A20.192 20.192 0 0 1 113.42 76c-6.9 0-12.433-2.517-16.6-7.55-4.167-5.034-6.25-11.764-6.25-20.19 0-8.467 2.09-15.217 6.27-20.25 4.18-5.034 9.777-7.55 16.79-7.55a20.19 20.19 0 0 1 10.31 2.65 19.7 19.7 0 0 1 7.29 7.4h.15v-4.79a4.32 4.32 0 0 1 4.32-4.32 4.32 4.32 0 0 1 4.3 4.32v48.73c0 6.493-2.223 11.697-6.67 15.61-4.447 3.913-10.37 5.893-17.77 5.94Zm-.31-28a13.876 13.876 0 0 0 11.4-5.41c2.9-3.614 4.35-8.39 4.35-14.33 0-5.94-1.44-10.737-4.32-14.39a13.858 13.858 0 0 0-11.4-5.45A13.483 13.483 0 0 0 104 33.81c-2.8 3.6-4.197 8.416-4.19 14.45.007 6.033 1.403 10.83 4.19 14.39A13.522 13.522 0 0 0 115.25 68ZM171 76.48c-7.567 0-13.64-2.527-18.22-7.58-4.58-5.053-6.87-11.863-6.87-20.43 0-8.573 2.29-15.387 6.87-20.44 4.58-5.053 10.653-7.577 18.22-7.57 7.527 0 13.583 2.523 18.17 7.57 4.587 5.047 6.877 11.86 6.87 20.44 0 8.54-2.29 15.343-6.87 20.41s-10.637 7.6-18.17 7.6ZM159.45 63.2a15.291 15.291 0 0 0 23.14 0c2.84-3.52 4.263-8.44 4.27-14.76.007-6.32-1.417-11.24-4.27-14.76a15.272 15.272 0 0 0-23.14 0c-2.867 3.54-4.3 8.45-4.3 14.73 0 6.28 1.433 11.21 4.3 14.79Z" />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 0h196.07v95.95H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {/* logo */}

                  <h2 className="mt-5 text-left text-5xl font-extrabold uppercase text-gray-800 md:text-7xl">
                    Stay tuned for the{" "}
                    <span className="text-skin-primary"> grand</span> opening!
                  </h2>

                  <p className="mt-2 max-w-lg text-base text-gray-600">
                    Sellers, unleash your creativity and add your unique
                    handmade products to our platform NOW!
                  </p>

                  <Cta />
                </div>

                <div className="absolute inset-0 z-10 flex items-center justify-center md:static md:block">
                  <div className="relative inset-x-0 z-30 h-[400px] w-[230px] opacity-20 md:h-[600px] md:w-[350px] md:opacity-100">
                    <Image
                      fill
                      src={lanka}
                      className="object-fit h-full w-full  rounded-lg"
                      alt="Screenshot of the landing page of motionridge.com"
                    />
                  </div>
                </div>
              </main>
            </div>
          </section>
        ) : (
          <section className="min-h-[100dvh] bg-gray-950 p-2">
            <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
              <main className="mx-auto flex min-h-[100dvh] w-full items-center justify-center gap-10 p-10">
                <div className="relative z-20 flex w-full max-w-2xl flex-col items-start justify-center">
                  {/* logo */}
                  <div className="flex items-start justify-start gap-1">
                    <div className="aspect-square rounded-full bg-[#cd0a5d] p-1">
                      <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 218 132"
                      >
                        <g clip-path="url(#a)" fill="#F2F2F2">
                          <path d="M104.668 49.036V0H49.123c-1.07 0-2.9.347-4.245.554a49.338 49.338 0 0 0-7.595 1.699 51.656 51.656 0 0 0-7.595 2.98 33.05 33.05 0 0 0-3.107 1.629 46.989 46.989 0 0 0-4.487 2.876 50.28 50.28 0 0 0-5.8 4.748 23.799 23.799 0 0 0-1.864 1.871A50.385 50.385 0 0 0 9.7 22.11a47.23 47.23 0 0 0-2.796 4.505 33.27 33.27 0 0 0-1.622 3.119 52.101 52.101 0 0 0-2.969 7.624A52.968 52.968 0 0 0 0 52.606c-.007 2.552.177 5.1.553 7.624.37 2.58.936 5.13 1.691 7.624a53.628 53.628 0 0 0 2.969 7.624 37.568 37.568 0 0 0 1.622 3.084 47.706 47.706 0 0 0 2.866 4.61 53.21 53.21 0 0 0 4.729 5.718 32.206 32.206 0 0 0 1.864 1.906 49.99 49.99 0 0 0 5.73 4.712 55.264 55.264 0 0 0 4.488 2.912 65.077 65.077 0 0 0 3.107 1.628 51.648 51.648 0 0 0 7.595 2.981 49.417 49.417 0 0 0 7.595 1.663 49.63 49.63 0 0 0 7.594.555c2.542.007 5.08-.178 7.595-.555a51.209 51.209 0 0 0 7.594-1.663 53.224 53.224 0 0 0 7.595-2.981l3.072-1.629a55.86 55.86 0 0 0 4.522-2.91 52.783 52.783 0 0 0 7.595-6.62 52.913 52.913 0 0 0 4.695-5.718 56.193 56.193 0 0 0 2.9-4.54 86.973 86.973 0 0 0 1.622-3.084 53.647 53.647 0 0 0 2.969-7.624 49.85 49.85 0 0 0 2.106-15.317c0-1.248.069-2.391 0-3.57ZM91.239 60.23c-.242 1.213-.518 2.426-.863 3.465-.345 1.04-.897 2.703-1.415 4.02a41.983 41.983 0 0 1-4.212 7.624 45.86 45.86 0 0 1-1.968 2.565 38.714 38.714 0 0 1-5.04 5.267 45.796 45.796 0 0 1-2.554 1.976 41.721 41.721 0 0 1-7.595 4.228 54.955 54.955 0 0 1-4.004 1.42c-1.346.416-2.382.624-3.452.867a39.44 39.44 0 0 1-7.595.728 38.927 38.927 0 0 1-7.594-.728c-1.243-.243-2.417-.52-3.453-.867-1.035-.346-2.727-.9-4.004-1.42a40.582 40.582 0 0 1-7.595-4.228 36.46 36.46 0 0 1-2.589-1.976 38.424 38.424 0 0 1-5.005-5.06 46.587 46.587 0 0 1-2.002-2.564 39.825 39.825 0 0 1-4.177-7.624 34.735 34.735 0 0 1-1.416-4.02 57.534 57.534 0 0 1-.897-3.465 39.898 39.898 0 0 1-.725-7.624 39.376 39.376 0 0 1 .448-7.763c.242-1.247.553-2.426.898-3.465a30.699 30.699 0 0 1 1.415-4.02 38.824 38.824 0 0 1 4.177-7.832c.622-.901 1.312-1.768 2.003-2.6a38.05 38.05 0 0 1 5.005-5.024c.829-.693 1.692-1.386 2.59-2.01a38.581 38.581 0 0 1 7.594-4.194 30.444 30.444 0 0 1 4.004-1.42 50.99 50.99 0 0 1 3.452-.901c1.105-.243 2.866-.45 4.316-.59 1.45-.138 2.174 0 3.279 0 2.549-.003 5.092.24 7.595.728 1.208.243 2.416.555 3.452.901 1.362.391 2.7.865 4.004 1.421a39.577 39.577 0 0 1 7.595 4.193 46.479 46.479 0 0 1 2.554 2.01 38.4 38.4 0 0 1 5.386 4.887c.69.831 1.346 1.698 1.967 2.599a40.835 40.835 0 0 1 4.212 7.624 45.809 45.809 0 0 1 1.415 4.02c.415 1.386.622 2.356.863 3.465.489 2.512.732 5.065.725 7.624v2.08a36.841 36.841 0 0 1-.794 5.683ZM217.482 45.051a54.28 54.28 0 0 0-1.691-7.624 52.138 52.138 0 0 0-2.969-7.624c-.518-1.074-1.036-2.114-1.623-3.119a54.924 54.924 0 0 0-2.865-4.505 54.446 54.446 0 0 0-4.66-5.822l-1.864-1.871a53.442 53.442 0 0 0-5.731-4.748 47.365 47.365 0 0 0-4.626-2.807 37.248 37.248 0 0 0-3.072-1.629 51.669 51.669 0 0 0-7.595-2.98 52.345 52.345 0 0 0-30.378 0 51.669 51.669 0 0 0-7.595 2.98 37.41 37.41 0 0 0-3.072 1.63 47.437 47.437 0 0 0-4.522 2.875 53.44 53.44 0 0 0-5.731 4.748l-1.76 1.802a54.176 54.176 0 0 0-4.833 5.753 55.203 55.203 0 0 0-2.866 4.505c-.586 1.005-1.104 2.045-1.622 3.119a52.134 52.134 0 0 0-2.969 7.624 54.408 54.408 0 0 0-1.519 7.693 55.094 55.094 0 0 0-.552 7.624c.009 2.551.194 5.099.552 7.624a56.59 56.59 0 0 0 1.692 7.624 53.612 53.612 0 0 0 2.969 7.624c.517 1.04 1.035 2.08 1.622 3.085.898 1.56 1.83 3.084 2.865 4.54a57.615 57.615 0 0 0 4.661 5.648l1.864 1.906a53.092 53.092 0 0 0 5.73 4.713 55.804 55.804 0 0 0 4.523 2.911l3.072 1.63a51.615 51.615 0 0 0 7.595 2.979 53.365 53.365 0 0 0 30.378 0 51.659 51.659 0 0 0 7.595-2.98l3.072-1.629a55.96 55.96 0 0 0 4.522-2.91 53.2 53.2 0 0 0 5.731-4.714l1.864-1.906a57.801 57.801 0 0 0 4.626-5.648c1.035-1.456 1.967-2.98 2.865-4.54.587-1.005 1.105-2.045 1.622-3.085a53.612 53.612 0 0 0 2.969-7.624 56.59 56.59 0 0 0 1.692-7.624c.358-2.525.543-5.073.552-7.624a55.079 55.079 0 0 0-.518-7.624Zm-12.289 7.624a39.971 39.971 0 0 1-.725 7.624c-.242 1.213-.518 2.426-.863 3.466a42.626 42.626 0 0 1-1.416 4.02 39.945 39.945 0 0 1-4.211 7.624 45.962 45.962 0 0 1-1.968 2.564 40.683 40.683 0 0 1-5.04 5.198 36.254 36.254 0 0 1-2.589 1.976 40.582 40.582 0 0 1-7.595 4.228 49.576 49.576 0 0 1-4.004 1.42c-1.381.416-2.382.624-3.452.867-5.017.97-10.172.97-15.189 0-1.209-.243-2.417-.52-3.452-.866-1.036-.347-2.693-.901-4.005-1.421a40.542 40.542 0 0 1-7.594-4.228 36.5 36.5 0 0 1-2.59-1.976 40.726 40.726 0 0 1-5.005-5.06 45.962 45.962 0 0 1-1.968-2.564 40 40 0 0 1-4.211-7.624 42.704 42.704 0 0 1-1.588-4.089 32.007 32.007 0 0 1-.863-3.465 39.81 39.81 0 0 1-.725-7.624 39.33 39.33 0 0 1 .725-7.624c.219-1.172.507-2.329.863-3.466a36.623 36.623 0 0 1 1.415-4.02 38.957 38.957 0 0 1 4.212-7.624 36.588 36.588 0 0 1 1.967-2.599 40.44 40.44 0 0 1 5.006-5.025c.828-.693 1.691-1.386 2.589-2.01a38.572 38.572 0 0 1 7.595-4.193 32.33 32.33 0 0 1 4.004-1.421 57.1 57.1 0 0 1 3.452-.901 39.996 39.996 0 0 1 15.189 0c1.209.243 2.417.554 3.452.901 1.365.385 2.702.86 4.005 1.42a38.564 38.564 0 0 1 7.594 4.194c.898.624 1.761 1.317 2.59 2.01a40.363 40.363 0 0 1 5.005 5.025c.69.832 1.346 1.698 1.968 2.6a38.953 38.953 0 0 1 4.211 7.623 36.818 36.818 0 0 1 1.692 3.743 51.08 51.08 0 0 1 .863 3.465c.463 2.56.671 5.161.621 7.763l.035.07ZM97.073 117.583a61.116 61.116 0 0 1-3.97 2.669 154.567 154.567 0 0 1-2.727 1.663 86.298 86.298 0 0 1-7.595 3.812c-1.83.797-3.693 1.49-5.592 2.149l-2.002.658a81.16 81.16 0 0 1-7.595 1.941 69.253 69.253 0 0 1-7.594 1.144c-2.52.242-5.04.381-7.595.381-2.555 0-5.11 0-7.595-.381a68.046 68.046 0 0 1-7.594-1.144 76.11 76.11 0 0 1-7.595-1.941l-2.002-.658c-1.864-.659-3.728-1.352-5.558-2.149a81.704 81.704 0 0 1-7.595-3.812c-.932-.554-1.864-1.074-2.761-1.663a69.237 69.237 0 0 1-4.523-3.084l6.456-11.229.828.624a57.69 57.69 0 0 0 7.595 4.852l2.313 1.213c1.726.832 3.452 1.629 5.282 2.287a55.192 55.192 0 0 0 7.594 2.391c2.5.613 5.037 1.065 7.595 1.352 5.045.6 10.144.6 15.189 0a62.267 62.267 0 0 0 7.595-1.352 58.378 58.378 0 0 0 7.594-2.391c1.795-.658 3.452-1.455 5.248-2.287l2.347-1.213a62.581 62.581 0 0 0 7.594-4.852l.242-.173 6.421 11.193Z" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h218v132H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <svg
                      fill="none"
                      className="w-20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 197 96"
                    >
                      <g clip-path="url(#a)" fill="#000">
                        <path d="m9.06 45.45 22.81-22.91a3.89 3.89 0 0 1 2.74-1.14 3.87 3.87 0 0 1 2.74 6.6L20.51 44.77l18.94 24.07a4.14 4.14 0 0 1-3.25 6.7A4.14 4.14 0 0 1 33 74L14.11 50.34l-5 4.79V71a4.53 4.53 0 0 1-4.53 4.53A4.532 4.532 0 0 1 0 71V5a4.53 4.53 0 1 1 9.06 0v40.45ZM53.08 12.29a5.41 5.41 0 0 1-4-1.67 5.4 5.4 0 0 1-1.66-4 5.371 5.371 0 0 1 1.66-4 5.46 5.46 0 0 1 4-1.64 5.53 5.53 0 0 1 4 1.64 5.37 5.37 0 0 1 1.66 4 5.4 5.4 0 0 1-1.66 4 5.482 5.482 0 0 1-4 1.67ZM48.55 71V25.93a4.53 4.53 0 1 1 9.06 0V71a4.529 4.529 0 0 1-9.06 0ZM69.56 71V28.84h-3.83A3.73 3.73 0 0 1 62 25.12a3.72 3.72 0 0 1 3.72-3.72h3.83v-6c0-5.207 1.223-9.07 3.67-11.59C75.667 1.29 79.393.02 84.4 0c.67 0 1.34 0 2 .05a3.7 3.7 0 0 1 3.52 3.7 3.689 3.689 0 0 1-3.74 3.7h-.38c-4.82 0-7.23 2.667-7.23 8v6h7.36a3.71 3.71 0 0 1 3.72 3.72 3.72 3.72 0 0 1-3.72 3.72h-7.31V71a4.531 4.531 0 0 1-9.06 0ZM115.56 96a25.88 25.88 0 0 1-15.31-4.51A19.52 19.52 0 0 1 95.6 87a4.37 4.37 0 0 1 3.54-7h.17a4.43 4.43 0 0 1 3.74 2.11 11.836 11.836 0 0 0 4.07 3.89 16.79 16.79 0 0 0 8.8 2.24c4.667 0 8.333-1.23 11-3.69a12.656 12.656 0 0 0 4-9.79v-8.54h-.21a18.87 18.87 0 0 1-7.13 7.11A20.192 20.192 0 0 1 113.42 76c-6.9 0-12.433-2.517-16.6-7.55-4.167-5.034-6.25-11.764-6.25-20.19 0-8.467 2.09-15.217 6.27-20.25 4.18-5.034 9.777-7.55 16.79-7.55a20.19 20.19 0 0 1 10.31 2.65 19.7 19.7 0 0 1 7.29 7.4h.15v-4.79a4.32 4.32 0 0 1 4.32-4.32 4.32 4.32 0 0 1 4.3 4.32v48.73c0 6.493-2.223 11.697-6.67 15.61-4.447 3.913-10.37 5.893-17.77 5.94Zm-.31-28a13.876 13.876 0 0 0 11.4-5.41c2.9-3.614 4.35-8.39 4.35-14.33 0-5.94-1.44-10.737-4.32-14.39a13.858 13.858 0 0 0-11.4-5.45A13.483 13.483 0 0 0 104 33.81c-2.8 3.6-4.197 8.416-4.19 14.45.007 6.033 1.403 10.83 4.19 14.39A13.522 13.522 0 0 0 115.25 68ZM171 76.48c-7.567 0-13.64-2.527-18.22-7.58-4.58-5.053-6.87-11.863-6.87-20.43 0-8.573 2.29-15.387 6.87-20.44 4.58-5.053 10.653-7.577 18.22-7.57 7.527 0 13.583 2.523 18.17 7.57 4.587 5.047 6.877 11.86 6.87 20.44 0 8.54-2.29 15.343-6.87 20.41s-10.637 7.6-18.17 7.6ZM159.45 63.2a15.291 15.291 0 0 0 23.14 0c2.84-3.52 4.263-8.44 4.27-14.76.007-6.32-1.417-11.24-4.27-14.76a15.272 15.272 0 0 0-23.14 0c-2.867 3.54-4.3 8.45-4.3 14.73 0 6.28 1.433 11.21 4.3 14.79Z" />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 0h196.07v95.95H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {/* logo */}

                  <h2 className="mt-5 text-left text-5xl font-extrabold uppercase text-gray-800 md:text-7xl">
                    Stay tuned for the{" "}
                    <span className="text-skin-primary"> grand</span> opening!
                  </h2>

                  <p className="mt-2 max-w-lg text-base text-gray-600">
                    Sellers, unleash your creativity and add your unique
                    handmade products to our platform NOW!
                  </p>

                  <Cta />
                </div>

                <div className="absolute inset-0 z-10 flex items-center justify-center md:static md:block">
                  <div className="relative inset-x-0 z-30 h-[400px] w-[230px] opacity-20 md:h-[600px] md:w-[350px] md:opacity-100">
                    <Image
                      fill
                      src={lanka}
                      className="object-fit h-full w-full  rounded-lg"
                      alt="Screenshot of the landing page of motionridge.com"
                    />
                  </div>
                </div>
              </main>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
