import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Course</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.rollNo}</td>
            <td>{student.course}</td>
            <td>{student.age}</td>
            <td>
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => onDelete(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
