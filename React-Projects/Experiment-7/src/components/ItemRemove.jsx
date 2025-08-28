import { useState } from "react";

export default function RemoveStudent() {
  const [students, setStudents] = useState(["Student-1", "Student-2", "Student-3"]);

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="remove-item-container">
      <h2>Remove Student</h2>
      <ul>
        {students.map((student, i) => (
          <li key={i}>
            {student} 
            <button onClick={() => removeStudent(i)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
