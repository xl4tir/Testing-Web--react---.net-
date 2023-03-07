import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Testing</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            
        </nav>

        <Navbar  expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav>
                    <NavLink   to="/"><a  class="p-2 text-dark">Головна</a></NavLink>
                    <NavLink to="/Testing"><a  class="p-2 text-dark">Тести</a></NavLink>

                    
                    <NavLink  to="/Grade"><a class=" mr-5 p-2 text-dark">Класи</a></NavLink>
                    
                </Nav>

                </Navbar.Collapse>
            </Navbar>
        
            
        

        
            <a class="btn btn-outline-success mr-2" >Авторизація</a>
            <a class="btn btn-outline-primary mr-2" >Реєстрація</a>
        
    </div>
            
        )
    }
}