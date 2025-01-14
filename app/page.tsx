"use client";

import React, { useEffect, useMemo, useState } from "react";

type Field = {
  name: string;
  creditHours: number;
  grade: string;
};

export default function Home() {
  const [fields, setFields] = useState<Field[]>([
    {
      name: "",
      creditHours: 0,
      grade: "A",
    },
  ]);
  const [gpa, setGpa] = useState<number>(0);

  const mappings: { [key: string]: number } = useMemo(
    () => ({
      A: 4,
      "B+": 3.5,
      B: 3,
      "C+": 2.5,
      C: 2,
      "D+": 1.5,
      D: 1,
      F: 0,
    }),
    []
  );

  useEffect(() => {
    setGpa(
      fields
        .map((field) =>
          field.grade === ""
            ? 0
            : mappings[field.grade] * Number(Math.abs(field.creditHours))
        )
        .reduce((acc, grade) => acc + grade, 0)
    );
  }, [fields, mappings]);

  const addField = function () {
    setFields([
      ...fields,
      {
        name: "",
        creditHours: 0,
        grade: "",
      },
    ]);
  };

  const handleValueChange = function (
    e: React.ChangeEvent,
    index: number,
    fieldName: string
  ) {
    setFields([
      ...fields.map((f: Field, i: number): Field => {
        if (i === index) {
          (f[fieldName as keyof Field] as string | number) = (
            e.target as HTMLInputElement
          ).value;
        }
        return f;
      }),
    ]);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <header className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <div className="flex justify-between items-center">
                <div className="px-6 py-3">Name</div>
                <div className="px-6 py-3">Credits</div>
                <div className="px-6 py-3">Grade</div>
                <div className="px-6 py-3">
                  <button
                    type="button"
                    className="text-white transition-all duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    onClick={addField}
                  >
                    +
                  </button>
                </div>
              </div>
            </header>
            <section className="block w-full overflow-y-auto h-[450px] dark:bg-gray-800">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-between items-center"
                >
                  <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                      max="4"
                      value={field.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleValueChange(e, index, "name")
                      }
                      required
                      placeholder="Course name"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Credit Hours"
                      min="0"
                      max="4"
                      value={field.creditHours}
                      onChange={(e) =>
                        handleValueChange(e, index, "creditHours")
                      }
                      required
                    />
                  </div>
                  <div className="px-6 py-4">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={field.grade}
                      onChange={(e) => handleValueChange(e, index, "grade")}
                    >
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <div className="px-6 py-4 text-right"></div>
                </div>
              ))}
            </section>
          </div>
          <div className="w-full relative overflow-hidden bg-white rounded-b-lg shadow-md dark:bg-gray-800 border-t border-t-zinc-600">
            <div className="flex flex-col items-start gap-2 p-4 space-y-3 md:flex-row md:items-center md:space-y-0">
              Your GPA: <span className="">{gpa}</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Developed by{" "}
        <a href="https://github.com/xwhiz/" target="_blank" tabIndex={-1}>
          Muhammad Hamza →
        </a>
      </footer>
    </div>
  );
}
