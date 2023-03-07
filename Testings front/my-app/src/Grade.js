
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddGradeModal} from './AddGradeModal';
import {EditGradeModal} from './EditGradeModal';

export class Grade extends Component{

    constructor(props){
        super(props);
        this.state={grades:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:54326/api/grade',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({grades:data});
        });
    }


    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    deleteGrade(gradeId){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:54326/api/grade/'+gradeId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {grades, gradeId, gradeName}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});


        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Grade Id</th>
                        <th>Grade Name</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(gr=>
                            <tr key={gr.Id}>
                                <td>{gr.Id}</td>
                                <td>{gr.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            gradeId:gr.Id,gradeName:gr.Name})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteGrade(gr.Id)}>
                                                Delete
                                        </Button>

                                        <EditGradeModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            gradeId={gradeId}
                                            gradeName={gradeName}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button class="mt-5" variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Grade</Button>

                    <AddGradeModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}