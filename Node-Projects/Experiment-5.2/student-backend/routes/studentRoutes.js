import { Router } from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController';

const router = Router();

router.post('/', createStudent);          // Create
router.get('/', getStudents);             // Read all
router.get('/:id', getStudentById);        // Read one
router.put('/:id', updateStudent);         // Update
router.delete('/:id', deleteStudent);      // Delete

export default router;
