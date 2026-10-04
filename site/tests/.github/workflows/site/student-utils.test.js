"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { addStudent, filterStudents } = require("../site/student-utils.js");

test("normalizes a student before adding it", () => {
  const result = addStudent([], {
    id: " s004 ",
    name: " Jordan Lee ",
    program: " Data Science ",
  });

  assert.deepEqual(result, [
    { id: "S004", name: "Jordan Lee", program: "Data Science" },
  ]);
});

test("filters students by ID, name, or program", () => {
  const records = [
    { id: "S001", name: "Maya Chen", program: "Computer Science" },
    { id: "S002", name: "Amina Patel", program: "Data Science" },
  ];

  assert.deepEqual(filterStudents(records, "data"), [records[1]]);
});

test("rejects duplicate student IDs", () => {
  const records = [
    { id: "S001", name: "Maya Chen", program: "Computer Science" },
  ];

  assert.throws(
    () => addStudent(records, {
      id: " s001 ",
      name: "Another Student",
      program: "Business",
    }),
    /Student ID already exists\./,
  );
});