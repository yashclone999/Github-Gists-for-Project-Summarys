import React, {useState} from 'react';
import {
    DropdownButton, Dropdown
} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import Loading from './Loading';
import { PostProject } from '../redux/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', 
    },
    
    avatar: {
        backgroundColor: red[500],
    },

    LargeIcon: {
        fontSize: "1em"
    }
});

function Projects() {
    
    
    const classes = useStyles();
    
    const projects = useSelector(State => State.Projects);
    const dispatch = useDispatch();


    const [isOpen, SetIsOpen] = useState(false);
    const [cred, setCred] = useState({ author: "", name: "", description: ""});

    const postProject = (creds) => {
        if (creds.name) { dispatch(PostProject(creds)); setCred({ author: "", name: "", description: "" }); SetIsOpen(!isOpen); }
        else { alert("Enter project name!") }
    }
    
    if (projects.err) {
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-3">
                          {projects.err}
                    </div>
                </div>
            </div>
        )
    }

    else if (projects.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Loading/>
                    </div>
                </div>
            </div>
        )
    }

    else if (!projects.PROJECTS || projects.PROJECTS.length === 0) {

        return (
            
            <div className="container top-5 bot-5" align="center">
                <div className="row">
                    <div className="col-3">
                        <button className="close " onClick={() => SetIsOpen(!isOpen)}>Create Project +</button>
                    </div>
                    <div className="col-6 bot-5">
                        {isOpen && (
                            <form className="form">
                                <div className="form-inner">

                                    <div className="form-group">
                                        <input type="text" value={cred.name} placeholder="Project Name" onChange={e => setCred({ ...cred, name: e.target.value })} />
                                        <input type="text" value={cred.description} placeholder="Project Description" onChange={e => setCred({ ...cred, description: e.target.value })} />
                                    </div>
                                    <button className="button" onClick={() => postProject(cred)}>Create</button>

                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

        )
    }
    else {
        
        return (
            <>
                
                <div className="container top-5">
                    <div className="row" align="center">
                        <div className="col-12">
                            <DropdownButton id="dropdown-basic-button" title="Projects">
                                {
                                    projects.PROJECTS.map(p => (
                                            <Dropdown.Item key={p._id}> <button className="dropdown">{p.name}</button></Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                        </div>
                    </div>
                </div>

                <div className="container top-5">
                    
                    <div className="row">
                        <div className="col-sm-12 col-md-6 ">

                            <Grid
                                container
                                spacing={4}
                                className={classes.gridContainer}
                                justify="center"
                            >

                                {projects.PROJECTS.map(project =>

                                    <Grid key={project._id} item xs={12} sm={12} md={12}>
                                        <Link to={`/projects/${project._id}`} >
                                            <Card className={classes.root}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar className={classes.avatar}>
                                                            {project.author.username.charAt(0)}
                                                        </Avatar>
                                                    }

                                                    title={project.name}
                                                    subheader={project.author.username}
                                                />
                                                <CardContent>
                                                    <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(project.createdAt)))}</p>
                                                    <p>{project.description}</p>
                                                </CardContent>
                                                
                                            </Card>
                                        </Link>
                                        
                                    </Grid>)
                                }

                            </Grid>

                        </div>
                    </div>
                </div>
                

                <div className="container top-5 bot-5" align="center">
                    <div className="row">
                        <div className="col-3">
                            <button className="close " onClick={() => SetIsOpen(!isOpen)}>Create Project +</button>
                        </div>
                        <div className="col-6 bot-5">
                            {isOpen && (
                                <form className="form">
                                    <div className="form-inner">

                                        <div className="form-group">
                                            <input type="text" value={cred.name} placeholder="Project Name" onChange={e => setCred({ ...cred, name: e.target.value })} />
                                            <input type="text" value={cred.description} placeholder="Project Description" onChange={e => setCred({ ...cred, description: e.target.value })} />
                                        </div>
                                        <button className="button" onClick={() => postProject(cred)}>Create</button>

                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                
            </>
         )
    }
}

export default Projects;


       