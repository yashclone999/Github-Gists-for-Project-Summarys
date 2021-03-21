import React, { useState } from 'react';
import Modal from 'react-modal';
import Loading from './Loading';
import { PostTodo, PutTodo, UpdateStatus, gist, DeleteTodo, PutProject } from '../redux/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function RenderProject({ id }) {

    const dispatch = useDispatch();
    const project = useSelector(State => State.Projects.PROJECTS.find(project => project._id === id));
    const todos = useSelector(State => State.Todos);
    const gists = useSelector(State => State.Gists);
     

    const [isModalOpenForPost, setIsModalOpenForPost] = useState(false);
    const [isModalOpenForPut, setIsModalOpenForPut] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [description, setYourTODO] = useState("");
    const [todoID, setTodoID] = useState(null);
    const [ProjectName, setName] = useState("");
    const [EditName, setEditName] = useState(false);
    let [statusMap, setStatusMap] = useState(new Map());

    const edit = () => {
        setIsEditOpen(!isEditOpen);
        if (project) {
            let status = new Map();
            project.todos.forEach((todo) => {
                status.set(todo._id, todo.status);
            });
            setStatusMap(map => status);
        }
    }
    

    function putTodo(id, Description) {
        let data = { _id: id, todo: { description: Description, project: project._id } };
        dispatch(PutTodo(data));
        setYourTODO("");
        setIsModalOpenForPut(false);
    }

    function postTodo(Description) {
        let data = { todo: { description: Description, project: project._id } };
        dispatch(PostTodo(data));
        setYourTODO("");
        setIsModalOpenForPost(false);
    }

    function updateStatus(statusList, projectID) {
        dispatch(UpdateStatus(statusList, projectID));
        setStatusMap(new Map());
        setIsEditOpen(false);
    }


    const updateName = (projectName, id) => {
        if (projectName) {
            let data = { _id: id, name: { name: projectName } };
            dispatch(PutProject(data));
            setEditName(false);
            setName("");
        }
        else { alert("Enter project name!") }
    }


    const Gist = () => {
        dispatch(gist(project._id));
    }

    const EditTodo = (id) => {
        setTodoID(id);
        setIsModalOpenForPut(true);
    }

    if (!project) {
        return (<><Loading /></>)
    }
    else {
        let pending = project.todos.filter(todo => todo.status === false);
        let completed = project.todos.filter(todo => todo.status === true);
        
        return (
            <>

                <div className="container">
                    
                    <div className="row top-5">
                        <div className="col-sm-5 col-md-6 project" align="left">
                            <h1>{project.name}</h1>
                        </div>
                        <div className="col-sm-1 col-md-1" align="left">
                            <button className="edit" onClick={() => setEditName(!EditName)}><span className="fa fa-edit fa-lg"></span></button>
                        </div>
                        <div className="col-sm-6 col-md-5 " align="left">
                            {EditName && (<div><input type="text" value={ProjectName} onChange={e => setName(e.target.value)} /> <button className="submit" onClick={() => updateName(ProjectName, project._id)}><span className="fa fa-paper-plane fa-md"></span></button> </div>)}
                        </div>
                    </div>

                    
                    <div className="row top-5">
                        {!gists.isLoading && (<div className="col-12" align="left"><button className="button-gist" onClick={Gist}>Create Gist</button></div>)}
                        {gists.isLoading && (<div className="col-12" align="left"><Loading /></div>)}
                        {gists.err && (<div className="col-12" align="left">Error with gists</div>)}
                    </div>

                    
                    <div className="row top-5">
                        <div className="col-12">
                            <hr style={{
                                color: '#000000',
                                backgroundColor: '#000000',
                                height: .5,
                                borderColor: '#000000'
                            }} />
                        </div>
                    </div>


                    {todos.isLoading && (<div className="row top5"><div className="col-12" align="center"><h2> <Loading /> </h2></div></div>)}
                    {todos.err && (<div className="row top5"><div className="col-12" align="center"><h2> {todos.err} </h2> </div> </div>)}


                    <div className="container">
                        {project.todos.length > 0 && (

                            <div className="row top-5">
                                <div className="col-6"><h4>Status</h4></div>
                                <div className="col-3" align="left"> <h4>Created</h4> </div>
                                <div className="col-3" align="left"> <h4>Updated</h4> </div>
                            </div>

                        )}
                    </div>

                    {pending.length > 0 && (<div className="container">
                        <div className="row top-5" >
                            <div className="col-6" ><h4> Pending </h4></div>
                        </div>
                        {
                            pending.map(todo => {

                                return (
                                        <div key={todo._id} className="row top-5">

                                            <div className="col-1">
                                                {isEditOpen && (<input type="checkbox" checked={statusMap.get(todo._id)} onChange={() => setStatusMap(new Map(statusMap.set(todo._id, !statusMap.get(todo._id))))} />)}
                                            </div>

                                            <div className="col-4" align="left">
                                                <span className="todo">{todo.description} </span>
                                            </div>
                                            <div className="col-.5" align="right">
                                                <button className="edit" onClick={() => EditTodo(todo._id)}><span className="fa fa-edit fa-md"></span></button>
                                            </div>
                                            <div className="col-.5" align="right">
                                                <button className="delete" onClick={() => dispatch(DeleteTodo(todo._id))}><span className="fa fa-trash fa-md"></span></button>
                                            </div>


                                            <div className="col-3" align="center">
                                                <span className="todo">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(todo.createdAt)))}</span>
                                            </div>

                                            <div className="col-3" align="center">
                                                <span className="todo">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(todo.updatedAt)))}</span>
                                            </div>

                                        </div>
                                    )
                            }
                        )}

                    </div>)}
                    

                    {completed.length > 0 && (<div className="container">
                        <div className="row top-5" >
                            <div className="col-6" ><h4> Completed </h4></div>
                        </div>
                        {
                            completed.map(todo => {

                                return (

                                    <div key={todo._id} className="row top-5">

                                        <div className="col-1">
                                            {isEditOpen && (<input type="checkbox" checked={statusMap.get(todo._id)} onChange={() => setStatusMap(new Map(statusMap.set(todo._id, !statusMap.get(todo._id))))} />)}
                                        </div>

                                        <div className="col-4" align="left">
                                            <span className="todo">{todo.description} </span>
                                        </div>

                                        <div className="col-.5" align="right">
                                            <button className="edit" onClick={() => EditTodo(todo._id)}><span className="fa fa-edit fa-md"></span></button>
                                        </div>
                                        <div className="col-.5" align="right">
                                            <button className="delete" onClick={() => dispatch(DeleteTodo(todo._id))}><span className="fa fa-trash fa-md"></span></button>
                                        </div>

                                        <div className="col-3" align="center">
                                            <span className="todo">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(todo.createdAt)))}</span>
                                        </div>

                                        <div className="col-3" align="center">
                                            <span className="todo">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(todo.updatedAt)))}</span>
                                        </div>

                                    </div>

                                )

                            }
                            )}

                    </div>)}


                    <div>

                        <Modal
                            isOpen={isModalOpenForPut}
                            onRequestClose={() => setIsModalOpenForPut(!isModalOpenForPut)}
                            style={customStyles}
                        >
                            <div>
                                <button className="button" onClick={() => setIsModalOpenForPut(false)}>Cancel</button>

                                <form>
                                    <TextField
                                        id=""
                                        label="Todo Description"
                                        value={description}
                                        onChange={e => setYourTODO(e.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </form>

                                <button className="button" onClick={() => putTodo(todoID, description)} >Update</button>
                            </div>
                        </Modal>

                    </div>

                    
                    <div className="row top-5 bot-5">
                        
                        <div className="col-6" align="left">

                                <button className="button" onClick={() => setIsModalOpenForPost(true)}>Create Todo</button>
                                <Modal

                                isOpen={isModalOpenForPost}
                                onRequestClose={() => setIsModalOpenForPost(!isModalOpenForPost)}
                                style={customStyles}
                                >
                                    <div >
                                    <button className="button" onClick={() => setIsModalOpenForPost(false)}>Cancel</button>

                                    <form>
                                        <TextField
                                            id=""
                                            label="Todo Description"
                                            value={description}
                                            onChange={e => setYourTODO(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </form>

                                    <button className="button" onClick={() => postTodo(description)  } >Create</button>
                                    </div>
                                </Modal>

                        </div>

                        <div className="col-6" align="right"><button className="button" onClick={edit}>Edit Status</button>{isEditOpen && (<button className="button" onClick={() => updateStatus(statusMap, id)}>Update Status</button>)}</div>
                        
                    </div>



                </div>

            </>
        )
    }
    
}

export default RenderProject;


