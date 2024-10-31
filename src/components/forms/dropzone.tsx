/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type {
  DragEventHandler,
  MouseEventHandler,
  InputHTMLAttributes,
  ReactNode,
  ReactElement,
} from "react";
import React, { useEffect, useRef, forwardRef, useState } from "react";
import Image from "next/image";
import Icon from "~/components/icon";

export type DropzoneProps = {
  children: ReactNode;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  defaultFiles?: Blob | Blob[];
  remover?: ReactElement;
  className?: string;
  onDragEnter?: DragEventHandler;
  onDragLeave?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onClear?: () => void;
};

export function Dropzone(props: DropzoneProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    children,
    remover,
    defaultFiles,
    className,
    inputProps,
    onClear,
    ...attrs
  } = props;

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.files = null;
      inputRef.current.value = "";
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (onClear) onClear();
  };

  /**
   * Use defaultFiles prop to set "defaultValue" of
   * file input
   */

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement && defaultFiles) {
      const data = new DataTransfer();

      if (defaultFiles instanceof Blob) {
        if (defaultFiles.size > 0) {
          data.items.add(defaultFiles as File);
        }
      } else {
        for (const item of defaultFiles) {
          if (item.size > 0) {
            data.items.add(item as File);
          }
        }
      }

      inputElement.files = data.files;
    }
  }, [defaultFiles, inputRef]);

  const onDrop: DragEventHandler = (e) => {
    if (inputRef.current) {
      e.preventDefault();

      if (e.dataTransfer.files) {
        inputRef.current.files = e.dataTransfer.files;
        inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    setIsDragging(false);

    if (attrs.onDrop) attrs.onDrop(e);
  };

  const onDragEnter: DragEventHandler = (e) => {
    setIsDragging(true);
    onDragOver(e);

    if (attrs.onDragEnter) attrs.onDragEnter(e);
  };

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();

    if (attrs.onDragOver) attrs.onDragOver(e);
  };

  const onDragLeave: DragEventHandler = (e) => {
    setIsDragging(false);

    if (attrs.onDragLeave) attrs.onDragLeave(e);
  };

  const onClick: MouseEventHandler = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <>
      <input ref={inputRef} className="sr-only" type="file" {...inputProps} />
      <section
        className={className}
        {...attrs}
        data-is-dragging={isDragging || null}
        onClick={onClick}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {children}
        {remover && React.cloneElement(remover, { onClick: handleClear })}
      </section>
    </>
  );
}

interface SingleImageDropzoneProps extends Omit<DropzoneProps, "children"> {
  preview?: string;
  onChange?: (image?: Blob) => void;
}

export default function SingleImageDropzone(
  {
    preview,
    className,
    onChange: userOnChange,
    inputProps: parentProps,
    ...parentHandlers
  }: SingleImageDropzoneProps,
) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(preview)
  const [requestImageRemove, setRequestImageRemove] = useState<boolean>(false);

  const inputName = parentProps.name ?? "image";

  const acceptedMimeTypes = parentProps.accept
    ? parentProps.accept
        .split(",")
        .filter((m) => m.includes("image"))
        .join(",")
    : "image/*";

  if (!acceptedMimeTypes)
    throw new Error("SingleImageDropzone input accepts only image types.");

  const inputProps: DropzoneProps["inputProps"] = {
    ...parentProps,
    name: inputName,
    multiple: false,
    accept: acceptedMimeTypes,
    onChange: (e) => {
      let image : Blob | undefined = undefined
      if (e.target.files?.length) {
        for (const file of e.target.files) {
          if (file.size) {
            image = file
            setRequestImageRemove(false);
            setPreviewImage(URL.createObjectURL(image))
            break;
          }
        }
      }

      if (parentProps.onChange) parentProps.onChange(e);

      if (userOnChange) userOnChange(image)
    },
  };

  const onClear = () => {
    setRequestImageRemove(true);
    setPreviewImage(undefined)

    if (parentHandlers.onClear) parentHandlers.onClear();
  };

  return (
    <Dropzone
      className={`flex items-center justify-center rounded-lg border border-dashed border-blue-3 px-7 py-8 font-medium text-blue-3 data-[has-image]:w-max data-[has-image]:border-gray-3 data-[is-dragging]:border-blue-5 data-[is-dragging]:bg-blue-1 data-[has-image]:py-5 data-[is-dragging]:text-blue-4 ${className}`}
      inputProps={inputProps}
      {...parentHandlers}
      onClear={onClear}
      data-has-image={!!previewImage || null}
      remover={
        previewImage ? (
          <button type="button" className="font-medium text-gray-5 underline">
            Remove Image
          </button>
        ) : undefined
      }
    >
      <input
        type="checkbox"
        id={`remove_${inputName}`}
        name={`remove_${inputName}`}
        readOnly
        hidden
        checked={requestImageRemove}
      />

      {!previewImage ? (
        <div
          className="pointer-events-none flex flex-col gap-2 text-center"
          role="tooltip"
        >
          <Icon name="upload" className="text-xl" />

          <p>Click or drop to upload</p>
        </div>
      ) : (
        <Image
          alt=""
          className="mr-7"
          src={previewImage}
          onLoad={() => URL.revokeObjectURL(previewImage)}
          height={144}
          width={144}
        />
      )}
    </Dropzone>
  );
};
