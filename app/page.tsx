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
      creditHours: 1,
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
    const fieldsString = sessionStorage.getItem("fields");
    if (!fieldsString) return;
    const fields = JSON.parse(fieldsString);
    setFields(fields);
  }, []);

  useEffect(() => {
    const aggregate = fields
      .map((field) =>
        field.grade === ""
          ? 0
          : mappings[field.grade] * Number(Math.abs(field.creditHours))
      )
      .reduce((acc, grade) => acc + grade, 0);
    const totalCreditHours = fields.reduce(
      (acc, { creditHours }) => acc + Number(creditHours),
      0
    );
    const gpa = Math.round((aggregate / totalCreditHours) * 1000) / 1000;
    setGpa(gpa);
  }, [fields, mappings]);

  useEffect(() => {
    sessionStorage.setItem("fields", JSON.stringify(fields));
  }, [fields]);

  const addField = function () {
    setFields([
      ...fields,
      {
        name: "",
        creditHours: 1,
        grade: "A",
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
    <div className="container mx-auto grid grid-rows-[5px_1fr_5px] items-center justify-items-center min-h-screen p-2 sm:p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-8 row-start-2 items-center sm:items-start">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <header className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] items-center">
              <div className="px-6 py-3 hidden sm:block">Name</div>
              <div className="px-6 py-3 hidden sm:block">Credits</div>
              <div className="px-6 py-3 hidden sm:block">Grade</div>
              <div className="p-2 flex justify-end items-center w-full">
                <button
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                  onClick={addField}
                >
                  +
                </button>
              </div>
            </header>
            <section className="block w-full overflow-y-auto h-[450px] dark:bg-gray-800">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 grid grid-cols-[1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] justify-between items-center"
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
                      min="1"
                      max="4"
                      value={field.creditHours}
                      onChange={(e) => {
                        handleValueChange(e, index, "creditHours");
                      }}
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
            <div className="flex items-start gap-2 p-4 space-y-3 flex-row">
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
