const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todos = new schema({
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    }
}, {
        timestamps: true
});


const Todos = mongoose.model("Todo", todos);

module.exports = Todos;