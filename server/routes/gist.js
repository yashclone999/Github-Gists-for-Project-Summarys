let { render } = require("mustache");
let fs = require("fs");
let template = fs.readFileSync("./public/template/template.md").toString();
var express = require('express');
var router = express.Router();
const Project = require('../Models/Projects');
const User = require('../Models/Users');
const authenticate = require('../authenticate');
const cors = require('../cors');
const fetch = require('node-fetch');

const postGist = async (A_token, name) => {

    try {
        const filename = `${name}.md`;
        const bearer = 'Bearer ' + A_token;
        const res = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },

            body: JSON.stringify({

                "public": false,
                "files": { "gist.md"  : { "content": fs.readFileSync("./gist.md").toString()}}

            })

        });
        
        const data = await res.json();
        return data;

    }
    catch (e) {
        return e;
    }

}



router.route('/:id')

    .options(cors.validateForCORSSelective, (req, res) => {
        res.sendStatus(200);
    })

    .get(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {
        
        Project.findById(req.params.id)
            .populate('author')
            .populate('todos')
            .then((project) => {
                User.findById(req.user._id)
                    .then(user => {
                        
                        var completed = 0;
                        var total = 0;

                        var pending_todos = new Array();
                        project.todos.map(todo => {
                            if (todo.status === false) {
                                pending_todos.push(todo.description);
                            }
                        });

                        var completed_todos = new Array();
                        project.todos.map(todo => {
                            if (todo.status === true) {
                                completed_todos.push(todo.description);
                            }
                        });

                        project.todos.forEach(todo => {
                            if (todo.status === true) {
                                completed++;
                            }
                            total++;
                        })


                        const PROJECT = {
                            project_name: project.name,
                            completed: completed,
                            total: total,
                            PendingTodo: pending_todos,
                            CompletedTodo: completed_todos
                        }


                        const A_token = user.access_token;
                        let output = render(template, PROJECT);
                        fs.writeFileSync("./gist.md", output);

                        postGist(A_token, project.name)
                            .then(data => {
                                res.statusCode = 200;
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                next(err);
                            })

                    }, (err) => {
                        next(err);
                    })
                    .catch((err) => {
                        next(err);
                    })
                
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })
        
    })




module.exports = router;