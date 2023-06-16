import {Router} from 'express';
import {
    login,
    signup,
    test
} from '../controllers/auth.js';
const router = Router();

router.post('/signup', await signup)


router.post('/login', await login)

router.get('/test', test);

export default router;