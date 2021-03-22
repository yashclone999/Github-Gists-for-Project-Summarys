const express = require('express');
const router = express.Router();
const Project = require('../Models/Projects');
const authenticate = require('../authenticate');
const cors = require('../cors');

router.route('/')
    .options(cors.validateForCORSSelective, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {
        

        Project.find({author: req.user._id})
            .populate({ path: 'author', select: 'username' })
            .populate('todos')
            .then((projects) => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(projects);

            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })

    })
    .post(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {
        
        Project.create({ ...req.body , author: req.user._id})
            
            .then((project) => {
                
                Project.findById(project._id)
                    .populate({ path: 'author', select: 'username' })
                    .populate('todos')
                    .then((project) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(project);

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



router.route('/:id')
    .options(cors.validateForCORSSelective, (req, res) => {
        res.sendStatus(200);
    })

    .put(cors.validateForCORSSelective, authenticate.verifyUsingToken, (req, res, next) => {

        Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate({ path: 'author', select: 'username' })
            .populate('todos')

            .then((project) => {
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

        Project.findByIdAndRemove(req.user._id)
            .then((project) => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ Success: true });
                
            }, (err) => {
                next(err);
            })
            .catch((err) => {
                next(err);
            })

    })
    




module.exports = router;

