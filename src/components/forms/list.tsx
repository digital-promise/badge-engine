/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Icon from "~/components/icon";

export interface ListInputProps {
  onChange: (value: string[]) => void;
  defaultValue?: string[];
}

export default function ListInput(
  { onChange, defaultValue }: ListInputProps
) {
  const [items, setItems] = useState(new Set(defaultValue));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = useCallback(() => onChange(Array.from(items)), [items, onChange])

  useEffect(() => {
    return () => handleChange()
  }, [handleChange])

  const addItems = () => {
    if (inputRef.current) {
      const values = inputRef.current.value.split(",").map((t) => t.trim());
      for (const value of values) {
        if (value) items.add(value);
      }
      setItems(new Set(items));
      inputRef.current.value = "";
    }
  };

  const removeItem = (item: string) => {
    if (items.delete(item)) {
      setItems(new Set(items));
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <input
          ref={inputRef}
          className="basis-[38rem] rounded border border-gray-5 px-4 py-3 placeholder:text-gray-5"
          type="text"
          placeholder="Enter tags separated with a comma"
          onChange={(e) => e.stopPropagation()}
          onKeyUp={(e) => {
            if (e.key === "Enter") addItems();
          }}
        ></input>
        <button
          className="font-bold text-blue-4 underline"
          type="button"
          onClick={() => addItems()}
        >
          <Icon name="plus" /> Add Tag
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {[...items].map((i) => (
          <li
            key={i}
            className="flex gap-3 rounded-[.25rem] bg-gray-1 px-4 py-2 font-medium"
          >
            {i}{" "}
            <button
              onClick={() => removeItem(i)}
              className="font-bold"
              type="button"
            >
              &#x2715;
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};