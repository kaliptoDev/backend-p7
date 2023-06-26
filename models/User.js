import {mongoose} from 'mongoose';
userSchema.plugin(uniqueValidator);import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);