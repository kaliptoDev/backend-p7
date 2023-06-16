import {Router} from 'express';
import {
    login,
    signup,
    test
} from '../controllers/auth.js';
const router = Router();

router.post('/signup', signup)


router.post('/login', login)

router.get('/test', test);

export default router;