
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddTestingModal} from './AddTestingModal';
import {EditTestingModal} from './EditTestingModal';

export class Testing extends Component{

    constructor(props){
        super(props);
        this.state={testing:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:54326/api/testing',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({testing:data});
        });
    }


    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    deleteTesting(testingId){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:54326/api/testing/'+testingId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {testing, testingId, testingName, testingDate,testingGrade, testingSubject, testingNumberOfPasses, testingUser}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});


        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Testing Id</th>
                        <th>Name</th>
                        <th> Date</th>
                        <th> Grade</th>
                        <th> Subject</th>
                        <th> Author</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testing.map(test=>
                            <tr key={test.Id}>
                                <td>{test.Id}</td>
                                <td>{test.Name}</td>
                                <td>{test.Date}</td>
                                <td>{test.Grade}</td>
                                <td>{test.Subject}</td>
                                <td>{test.User}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            testingId:test.Id, testingName:test.Name, testingGrade:test.Grade, testingDate:test.Date
                                            , testingSubject:test.Subjec, testingNumberOfPasses:test.NumberOfPases, testingUser:test.User})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteTesting(test.Id)}>
                                                Delete
                                        </Button>

                                        <EditTestingModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            testingId={testingId}
                                            testingName={testingName}
                                            testingGrade={testingGrade}
                                            testingDate={testingDate}
                                            testingSubject={testingSubject}
                                            testingNumberOfPasses={testingNumberOfPasses}
                                            testingUser={testingUser}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button class="mt-5" variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Testing</Button>

                    <AddTestingModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}