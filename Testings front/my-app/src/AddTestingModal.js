import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTestingModal extends Component{
    constructor(props){
        super(props);
        this.state={testings:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:54326/api/testing')
        .then(response=>response.json())
        .then(data=>{
            this.setState({testings:data});
        });
    }


    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:54326/api/testing',{
            method:'POST',
            mode: 'cors',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:event.target.testingName.value,
                Grade:event.target.testingGrade.value,
                Date:event.target.testingDate.value,
                Subject:event.target.testingSubject.value,
                NumberOfPases:event.target.testingNumberOfPases.value,
                User:event.target.testingUser.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Testing
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="testingName">
                        <Form.Label>Testing name</Form.Label>
                        <Form.Control type="text" name="testingName" required 
                        placeholder="Testing name"/>
                    </Form.Group>

                    <Form.Group controlId="testingGrade">
                        <Form.Label>Testing grade</Form.Label>
                        <Form.Control as="select">
                        {this.state.testings.map(test=>
                            <option key={test.Id}>{test.Name}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="testingDate">
                        <Form.Label>Testing date</Form.Label>
                        <Form.Control type="date" name="testingDate" required 
                        placeholder="Testing date"/>
                    </Form.Group>

                    <Form.Group controlId="testingSubject">
                        <Form.Label>Testing subject</Form.Label>
                        <Form.Control type="text" name="testingSubject" required 
                        placeholder="Testing subject"/>
                    </Form.Group>

                    <Form.Group controlId="testingNumberOfPases">
                        <Form.Label>Testing number of passes</Form.Label>
                        <Form.Control type="text" name="testingNumberOfPases" required 
                        placeholder="Testing number of passes"/>
                    </Form.Group>

                    <Form.Group controlId="testingUser">
                        <Form.Label>Testing author</Form.Label>
                        <Form.Control type="text" name="testingUser" required 
                        placeholder="Testing author"/>
                    </Form.Group>



                    <Form.Group>
                        
                        <Button class="mt-5" variant="primary" type="submit">
                            Add Testing
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}