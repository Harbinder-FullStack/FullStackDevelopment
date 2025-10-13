import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const API_URL = 'http://localhost:5000/api/students';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  const addStudent = async (student) => {
    await axios.post(API_URL, student);
    fetchStudents();
  };

  const updateStudent = async (student) => {
    await axios.put(`${API_URL}/${editingStudent._id}`, student);
    setEditingStudent(null);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  const handleSubmit = (student) => {
    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Management System</h1>
      <StudentForm onSubmit={handleSubmit} initialData={editingStudent} />
      <StudentList students={students} onEdit={setEditingStudent} onDelete={deleteStudent} />
    </div>
  );
};

export default App;
