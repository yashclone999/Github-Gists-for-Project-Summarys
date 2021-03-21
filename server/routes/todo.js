const authenticate = require('../authenticate');
const cors = require('../cors');
var express = require('express');
var router = express.Router();
const Todos = require('../Models/Todos');
const Projects = require('../Models/Projects');

router.route('/')
    .options(cors.validateForCORS, (req, res) => {
        res.sendStatus(200);
    })

    .post(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {

        Todos.create({ ...req.body, status: false })
            .then((todo) => {

                return Projects.findByIdAndUpdate(
                    todo.project._id,
                    { $push: { todos: todo._id } },
                    { new: true }
                )
                    .populate({ path: 'author', select: 'username' })
                    .populate('todos')
                    

            }, (err) => {
                next(err);
            })

            .then(project => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);

            }, (err) => {
                next(err);
            })

            .catch((err) => {
                next(err);
            })

    });

router.route('/status/:id')
    .options(cors.validateForCORS, (req, res) => {
        res.sendStatus(200);
    })

    .put(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {

        let arr = req.body.statusList;
        let PID = req.params.id;

        arr.forEach((obj) => {

            Todos.findByIdAndUpdate(
                obj._id,
                { $set: { status: obj.status } },
                (err, doc) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        ;
                    }
                }
            );
        })

        Projects.findOne({ _id: PID })
            .populate({ path: 'author', select: 'username' })
            .populate('todos')
            .then(project => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);

            }, (err) => {
                next(err);
            })

            .catch((err) => {
                next(err);
            })


    });


router.route('/:id')
    .options(cors.validateForCORS, (req, res) => {
        res.sendStatus(200);
    })

    .put(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {

        Todos.findByIdAndUpdate(req.params.id, { $set: { description: req.body.description } }, { new: true })
            .then((todo) => {

                return Projects.findById(
                    todo.project._id
                )
                    .populate({ path: 'author', select: 'username' })
                    .populate('todos')



            }, (err) => {
                next(err);
            })

            .then(project => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);

            }, (err) => {
                next(err);
            })

            .catch((err) => {
                next(err);
            })

    })




    .delete(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {

        Todos.findByIdAndRemove(req.params.id, { new: true })

            .then((todo) => {

                return Projects.findByIdAndUpdate(
                    todo.project._id,
                    { $pull: {todos : todo._id} }
                )
                    .populate({ path: 'author', select: 'username' })
                    .populate('todos')
                
            }, (err) => {
                next(err);
            })

            .then(project => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);

            }, (err) => {
                next(err);
            })

            .catch((err) => {
                next(err);
            })

    });

module.exports = router;