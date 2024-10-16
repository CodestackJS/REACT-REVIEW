

import React, { useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap';


interface Student {
  id: number,
  firstName: string,
  lastName: string,
  email: string
}


const App = () => {

  const [studentList, setStudentList] = useState<Student[]>([
    {
      id: 0,
      firstName: 'jacob',
      lastName: 'dekok',
      email: 'jacobdekok@gmail.com'

    },
    {
      id: 1,
      firstName: 'isaiah',
      lastName: 'furguson',
      email: 'isaiahferguson@gmail.com'

    },
    {
      id: 2,
      firstName: 'ken',
      lastName: 'martinez',
      email: 'kenmartinez@gmail.com'

    }

  ]);

  const [student, setStudent] = useState({
    id: 0,
    firstName: '',
    lastName:'',
    email:''
  })
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const addStudent = () => {
    const studentToAdd = {
      ...student,
      id: studentList.length == 0 ? 0 : studentList[studentList.length-1].id + 1
    }

    setStudentList([
      ...studentList,
      studentToAdd
    ])
    
    handleClose();

  }

  return (
    <>
      <h2 className='text-center'>Student Directory</h2>

      <Container className='d-flex justify-content-center'>
        <Button variant="primary" onClick={handleShow}>
          Add student
        </Button>
      </Container>

      {/* Student Display Table - Start */}
      <Table striped hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {
            studentList.map(studentInMap => (
              <tr key={studentInMap.id}>
                <td>{studentInMap.firstName}</td>
                <td>{studentInMap.lastName}</td>
                <td>{studentInMap.email}</td>
                <td>
                  <Button variant='success'>Edit</Button>{' '}
                  <Button variant='danger'>Delete</Button>

                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      {/* Student Display Table - End */}

      {/* Modal - Start */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='mb-3'>
              <label className='form-label'>First name </label>
              <input type='text' placeholder='John' className='form-control' name='firstName'onChange={handleChange}/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input type='text' placeholder='Doe' className='form-control' name='lastName' onChange={handleChange}/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input type='text' placeholder='johndoe@gmail.com' className='form-control' name='email' onChange={handleChange}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addStudent}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal - End */}
    </>
  )
}

export default App