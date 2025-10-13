import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [course, setCourse] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRollNo(initialData.rollNo);
      setCourse(initialData.course);
      setAge(initialData.age);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, rollNo, course, age });
    setName('');
    setRollNo('');
    setCourse('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" required />
      <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
      <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Age" />
      <button type="submit">{initialData ? 'Update' : 'Add'} Student</button>
    </form>
  );
};

export default StudentForm;
