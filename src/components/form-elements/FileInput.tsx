"use client";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { cn } from "../../utilities/cn";
import { Button } from "../Button";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import Error from "../alerts/Error";

interface IFileInput extends ComponentProps<"div"> {
  name: string;
  maxFiles?: number;
  maxFileSizeInMB?: number;
  control?: any;
  acceptedFileTypes?: { [x: string]: string[] };
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  Title?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  subTitle?: string;
  error?: string;
  onFileSelect?: (files: File[]) => void;
}

const FileInput = ({
  Title = () => <>title</>,
  subTitle,
  className,
  maxFiles = 10,
  maxFileSizeInMB,
  control,
  name,
  error,
  Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-white"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor">
        <path d="M17.29 11.968a1.33 1.33 0 0 1-1.322 1.338a1.33 1.33 0 0 1-1.323-1.338a1.33 1.33 0 0 1 1.323-1.337c.73 0 1.323.599 1.323 1.337Z" />
        <path
          fillRule="evenodd"
          d="M18.132 7.408c-.849-.12-1.942-.12-3.305-.12H9.173c-1.363 0-2.456 0-3.305.12c-.877.125-1.608.392-2.152 1.02c-.543.628-.71 1.396-.716 2.293c-.006.866.139 1.962.319 3.328l.365 2.772c.141 1.068.255 1.933.432 2.61c.185.704.457 1.288.968 1.74c.51.453 1.12.649 1.834.74c.687.089 1.55.089 2.615.089h4.934c1.065 0 1.928 0 2.615-.088c.715-.092 1.323-.288 1.834-.74c.511-.453.783-1.037.968-1.741c.177-.677.291-1.542.432-2.61l.365-2.772c.18-1.366.325-2.462.319-3.328c-.007-.897-.172-1.665-.716-2.293c-.544-.628-1.275-.895-2.152-1.02ZM6.052 8.732c-.726.104-1.094.292-1.34.577c-.248.285-.384.679-.39 1.421c-.005.761.126 1.764.315 3.195l.05.379l.371-.272c.96-.703 2.376-.668 3.288.095l3.384 2.833c.32.268.871.318 1.269.084l.235-.139c1.125-.662 2.634-.592 3.672.19l1.832 1.38c.09-.495.171-1.104.273-1.875l.352-2.675c.189-1.43.32-2.434.314-3.195c-.005-.742-.141-1.136-.388-1.42c-.247-.286-.615-.474-1.342-.578c-.745-.106-1.745-.107-3.172-.107h-5.55c-1.427 0-2.427.001-3.172.107Z"
          clipRule="evenodd"
        />
        <path
          d="M6.88 4.5c-1.252 0-2.279.84-2.621 1.954a2.772 2.772 0 0 0-.02.07c.358-.12.73-.2 1.108-.253c.972-.139 2.201-.139 3.629-.139h6.202c1.428 0 2.657 0 3.63.139c.377.053.75.132 1.108.253a2.773 2.773 0 0 0-.02-.07c-.343-1.114-1.37-1.954-2.62-1.954H6.878Z"
          opacity=".7"
        />
        <path
          d="M8.858 2h6.283c.209 0 .37 0 .51.015a2.623 2.623 0 0 1 2.159 1.672H6.19a2.623 2.623 0 0 1 2.159-1.672c.14-.015.3-.015.51-.015Z"
          opacity=".4"
        />
      </g>
    </svg>
  ),
  acceptedFileTypes = {
    "image/jpeg": [],
    "image/png": [],
  },
  onFileSelect,
}: IFileInput) => {
  let field: ControllerRenderProps<FieldValues, string> | null = null;

  if (control) {
    const controller = useController({
      name,
      control,
    });

    field = controller.field;
  }

  const [files, setFiles] = useState<(File & { ref?: any; url?: any })[]>([]);

  useEffect(() => {
    if (field?.value) {
      setFiles(field.value);
    }
  }, [field?.value]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      //@ts-ignore
      const modifiedFiles: (File & {
        ref?: any;
        url?: any;
      })[] = acceptedFiles.map((file) => {
        return file;
      });

      setFiles((ps) => {
        let files = [...ps, ...modifiedFiles];
        if (files.length > maxFiles) {
          toast(
            <Error
              id="too_many_files"
              body={`You can only add ${maxFiles} files.`}
              title="File limit exceeded."
            />,
            {
              toastId: "too_many_files",
            },
          );
        }
        files = files.splice(0, maxFiles);
        if (field) {
          field.onChange(files);
        }

        if (onFileSelect) {
          onFileSelect(files);
        }
        return files;
      });

      rejectedFiles.forEach((rejectedFiles: FileRejection) => {
        if (rejectedFiles.errors[0].code === "duplicate_file") {
          toast(
            <Error
              id="duplicate file"
              body={rejectedFiles.errors[0].message}
              title="Duplicate file."
            />,
          );
          return;
        } else if (rejectedFiles.errors[0].code === "file_too_large") {
          toast(
            <Error
              id="file_too_large"
              body={rejectedFiles.errors[0].message}
              title="File too large."
            />,
          );
        } else if (rejectedFiles.errors[0].code === "too-many-files") {
          toast(
            <Error
              id="too-many-files"
              body={rejectedFiles.errors[0].message}
              title="File limit exceeded."
            />,
          );
        } else {
          toast(
            <Error
              id="invalid_file_type"
              body={rejectedFiles.errors[0].message}
              title="Invalid file type."
            />,
          );
        }
      });
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,

    validator: (e: File) => {
      if (files.find((file) => file.name === e.name)) {
        return {
          code: "duplicate_file",
          message: `${e.name} already exists`,
        };
      }
      if (maxFileSizeInMB && e.size > maxFileSizeInMB * 1024 * 1024) {
        return {
          code: "file_too_large",
          message: `File is too large, The maximum file size allowed is ${maxFileSizeInMB.toFixed(
            2,
          )}MB`,
        };
      }
      return null;
    },
  });

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      inputRef.current?.scrollIntoView();
    }
  }, [error]);

  return (
    <div ref={inputRef} className={cn(`@container`, className)}>
      <div
        {...getRootProps()}
        className={`mt-1 flex items-center justify-center rounded-xl border-2 border-dashed p-5 ${
          isDragActive ? "animate-wiggle border-blue-600" : "border-gray-300"
        }`}
      >
        <input id="file" {...getInputProps()} className="sr-only" />
        <div className="flex flex-col items-center justify-center pb-16">
          <div className="pointer-events-none relative aspect-square w-32 rounded-xl bg-skin-primary/30">
            <div className="-ml-10 mr-5 mt-3 flex items-center gap-1 rounded-md bg-white p-1 shadow">
              <div className="rounded-md bg-skin-primary p-1 text-white">
                <Icon />
              </div>
              <div className="w-full">
                <div className="h-2 w-1/2 rounded-md bg-skin-primary/50"></div>
                <div className="mt-2 h-2 w-full rounded-md bg-skin-primary/30"></div>
              </div>
            </div>

            <div className="-mr-10 ml-5 mt-3 flex items-center gap-1 rounded-md bg-white p-1 shadow">
              <div className="rounded-md bg-skin-primary p-1 text-white">
                <Icon />
              </div>
              <div className="w-full">
                <div className="h-2 w-1/2 rounded-md bg-skin-primary/50"></div>
                <div className="mt-2 h-2 w-full rounded-md bg-skin-primary/30"></div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-base font-medium text-gray-800">
            {Title && <Title />}
          </div>
          <p className="mt-1 text-center text-xs text-gray-500">
            {subTitle || `You can upload png, jpeg file types`}{" "}
            {!subTitle &&
              maxFileSizeInMB &&
              `, of size less than ${maxFileSizeInMB}MB`}
          </p>

          {/* error */}
          {error && (
            <p className="mt-5 text-center text-xs font-medium text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="-mt-[4.5rem] flex w-full items-center justify-center md:-mt-16">
        <Button
          variant={"secondary"}
          className={"whitespace-nowrap bg-gray-100"}
          type="button"
          onClick={open}
        >
          Select Files
        </Button>
      </div>
    </div>
  );
};

export default FileInput;
