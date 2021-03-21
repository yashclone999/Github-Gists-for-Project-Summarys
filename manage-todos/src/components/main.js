import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Header from './Header';
import Login from './login';
import LoggedIn from './loggedIn';
import RenderProject from './RenderProject';
import Projects from './projects';
import { fetchProject } from '../redux/actionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


const mapStateToProps = state => {
    return {
        Authorization: state.Authorization
    };
}



const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => { dispatch(fetchProject()) }
    }
}


class Main extends Component {
    
    componentDidMount() {
        this.props.fetchProjects();
    }
    

    render() {

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (

                this.props.Authorization.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const Render_Project = ({ match }) => {
            return (
                <RenderProject id={match.params.id} />
            );
        }

        return (

            <React.Fragment>

                <Header />
                <Switch>

                    <Route path="/home" component={() => <Home />} />
                    <Route path="/login" component={() => <Login />} />
                    <PrivateRoute exact path="/projects" component={() => <Projects />} />
                    <PrivateRoute path="/projects/:id" component={Render_Project} />
                    <Route path="/loggedIn" component={() => <LoggedIn />} />
                    <Redirect to="/home" />

                </Switch>
            </React.Fragment>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main) );
