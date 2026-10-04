"use strict";

const { addStudent, filterStudents } = window.StudentUtils;

let students = [
  { id: "S001", name: "Maya Chen", program: "Computer Science" },
  { id: "S002", name: "Noah Williams", program: "Business" },
  { id: "S003", name: "Amina Patel", program: "Data Science" },
];

const form = document.querySelector("#student-form");
const idInput = document.querySelector("#student-id");
const nameInput = document.querySelector("#student-name");
const programInput = document.querySelector("#student-program");
const searchInput = document.querySelector("#search-input");
const tableBody = document.querySelector("#student-table-body");
const count = document.querySelector("#student-count");
const message = document.querySelector("#form-message");

function renderStudents(records) {
  tableBody.textContent = "";
  count.textContent = `${records.length} student${records.length === 1 ? "" : "s"}`;

  if (records.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.className = "empty-state";
    cell.textContent = "No students match this search.";
    row.append(cell);
    tableBody.append(row);
    return;
  }

  records.forEach((student) => {
    const row = document.createElement("tr");

    [student.id, student.name, student.program].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    tableBody.append(row);
  });
}

function renderCurrentStudents() {
  renderStudents(filterStudents(students, searchInput.value));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    students = addStudent(students, {
      id: idInput.value,
      name: nameInput.value,
      program: programInput.value,
    });

    form.reset();
    message.textContent = "Student added.";
    message.className = "status success";
    renderCurrentStudents();
  } catch (error) {
    message.textContent = error.message;
    message.className = "status error";
  }
});

searchInput.addEventListener("input", renderCurrentStudents);
renderCurrentStudents();