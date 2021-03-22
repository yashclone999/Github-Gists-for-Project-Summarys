import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, NavItem, Collapse
} from 'reactstrap';
import { NavLink } from 'react-router-dom';




class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggleNav1 = this.toggleNav2.bind(this);

    }


    toggleNav2() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (

            <React.Fragment>
                <Navbar expand="md" dark color="primary">
                    <div className="container">

                        <NavbarToggler onClick={this.toggleNav1} />

                        <NavbarBrand className="mr-auto" href="/"> P&T </NavbarBrand>

                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav navbar>

                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <span className="fa fa-home fa-lg"></span>Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/login">
                                            <span className="fa fa-sign-in fa-lg"></span>LOG-IN
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/projects">
                                            <span className="fa fa-square fa-lg"></span>PROJECTS
                                        </NavLink>
                                    </NavItem>
                                    
                                </Nav>  
                        </Collapse>
                        
                    </div>

                </Navbar>

                <Jumbotron className="jumbotron">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Projects & Todos</h1>
                                <p>Manage Projects-Todos, and create Gists </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

            </React.Fragment>
            
        )
    }
}


export default Header;
