import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create schema for todo
const TodoSchema = new Schema({
    action: {
        type: String,
        required: [true, 'The todo text field is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create model for todo
const Todo = mongoose.model('todo', TodoSchema);

export default Todo;
