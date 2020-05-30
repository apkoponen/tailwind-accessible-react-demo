# Tailwind CSS + React + TypeScript accessible demo

This is a demo of building an accessible React ListBox component. This is mostly a port of [https://github.com/tailwindui/vue].

# Example

```
import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxList,
  ListboxOption,
} from "../src/components/Listbox";
import classNames from "classnames";

const chevronDown = (
  <svg
    className="w-4 h-4"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M19 9l-7 7-7-7"></path>
  </svg>
);

export default function Home() {
  const wrestlers = [
    "The Ultimate Warrior",
    "Randy Savage",
    "Hulk Hogan",
    "Bret Hart",
    "The Undertaker",
    "Mr. Perfect",
    "Ted DiBiase",
    "Bam Bam Bigelow",
    "Yokozuna",
  ];
  const [selectedWrestler, setSelectedWrestler] = useState(wrestlers[0]);
  return (
    <div className="p-48 antialiased font-sans text-gray-900">
      <div className="max-w-xs mx-auto">
        <Listbox value={selectedWrestler} onChange={setSelectedWrestler}>
          {({ isOpen }) => (
            <>
              <ListboxLabel className="sr-only">
                Select a wrestler:
              </ListboxLabel>
              <ListboxButton className="rounded p-3 border flex items-center justify-between w-full">
                {selectedWrestler} {chevronDown}
              </ListboxButton>
              {isOpen && (
                <ListboxList>
                  {wrestlers.map((wrestler) => (
                    <ListboxOption key={wrestler} value={wrestler}>
                      {({ isActive }) => (
                        <div
                          className={classNames("p-3", {
                            "bg-blue-600 text-white": isActive,
                            "bg-white text-gray-900": !isActive,
                          })}
                        >
                          {wrestler}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxList>
              )}
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}

```
