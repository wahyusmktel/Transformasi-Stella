import { Router } from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

// Endpoint GET /api/users
router.get('/', getUsers);
router.put('/:id', updateUser);    // Endpoint Edit
router.delete('/:id', deleteUser); // Endpoint Delete

export default router;