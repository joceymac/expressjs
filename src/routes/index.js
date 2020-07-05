
import express from 'express';
import contact_forms from './contact_form';
import users from './users';
import auth from './auth';

let router = express.Router();

router.use('/contact_forms',contact_forms);
router.use('/users', users);
router.use('/auth', auth);

export default router;