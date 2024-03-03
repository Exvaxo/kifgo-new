"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { nanoid } from "nanoid";

interface IImageComponent extends ComponentProps<"img"> {
  highResSrc: string;
  lowResSrc?: string;
  alt: string;
}

const ImageComponent = ({
  alt,
  lowResSrc,
  highResSrc,
  ...rest
}: IImageComponent) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  return (
    <>
      <AnimatePresence>
        {!hasLoaded && lowResSrc && (
          <motion.div
            key={nanoid(10)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              alt={alt}
              fill
              className="bg-cover object-cover"
              src={lowResSrc}
            />
          </motion.div>
        )}

        <Image
          alt={alt}
          src={highResSrc}
          fill
          className="bg-cover object-cover"
          loading="lazy"
          onLoad={() => {
            setHasLoaded(true);
          }}
        />
      </AnimatePresence>
    </>
  );
};

export default ImageComponent;
