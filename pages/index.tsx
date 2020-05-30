import { useState } from "react";
import classNames from "classnames";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxList,
  ListboxOption,
} from "../src/components/Listbox";

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
    <div className="p-48 font-sans antialiased text-gray-900">
      <div className="max-w-xs mx-auto">
        <Listbox value={selectedWrestler} onChange={setSelectedWrestler}>
          {({ isOpen }) => (
            <>
              <ListboxLabel className="sr-only">
                Select a wrestler:
              </ListboxLabel>
              <ListboxButton className="flex items-center justify-between w-full p-3 border rounded">
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
        <div className="pt-24 text-center">
          <a
            href="https://github.com/apkoponen/tailwind-accessible-react-demo"
            className="text-sm text-blue-700 hover:text-blue-900"
          >
            View source on Github
          </a>
        </div>
      </div>
    </div>
  );
}
