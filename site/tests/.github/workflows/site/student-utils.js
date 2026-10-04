(function exposeStudentUtils(global) {
  "use strict";

  function normalizeStudent(student) {
    return {
      id: String(student.id).trim().toUpperCase(),
      name: String(student.name).trim(),
      program: String(student.program).trim(),
    };
  }

  function addStudent(students, student) {
    const normalized = normalizeStudent(student);

    if (!normalized.id || !normalized.name || !normalized.program) {
      throw new Error("All student fields are required.");
    }

    return [...students, normalized];
  }

  
  function filterStudents(students, query) {
    const term = String(query).trim().toLowerCase();

    if (!term) {
      return [...students];
    }

    return students.filter((student) =>
      [student.id, student.name, student.program].some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }

  const api = { addStudent, filterStudents };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.StudentUtils = api;
})(typeof globalThis !== "undefined" ? globalThis : this);