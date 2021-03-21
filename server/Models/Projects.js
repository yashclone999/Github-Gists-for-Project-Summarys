const mongoose = require("mongoose");
const schema = mongoose.Schema;

const projects = new schema({

    name: {
        type: String
    },

    description: {
        type: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },

    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }]
}, {
        timestamps: true
    }
);

const Projects = mongoose.model("Project", projects);
module.exports = Projects;