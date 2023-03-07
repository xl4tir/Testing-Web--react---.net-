import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditGradeModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:54326/api/grade',{
            method:'PUT',
            mode: 'cors',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.IdGrade.value, 
                Name:event.target.NameGrade.value
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
            Edit Grade
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="IdGrade">
                        <Form.Label>Grade ID</Form.Label>
                        <Form.Control type="text" name="IdGrade" required 
                        disabled
                        defaultValue={this.props.gradeId}
                        />
                    </Form.Group>


                    <Form.Group controlId="NameGrade">
                        <Form.Label>Change Grade Name</Form.Label>
                        <Form.Control type="text" name="NameGrade" required
                        defaultValue={this.props.gradeName} 
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group>
                        
                        <Button class="mt-5" variant="primary" type="submit">
                            Edit Grade
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