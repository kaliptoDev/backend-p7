// const mongoose = require('mongoose');
import {mongoose} from 'mongoose';

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// module.exports = mongoose.model('User', userSchema);

export default mongoose.model('User', userSchema);

// export default User;