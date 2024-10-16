

import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap';


interface Student {
  id: number,
  firstName: string,
  lastName: string,
  email: string
}


const App = () => {
    //creating a local storage
    const [studentList, setStudentList] = useState<Student[]>(localStorage.getItem('studentList') ? JSON.parse(localStorage.getItem('studentList')!) :  []);
  
    //parse definition: converting string to an object
    //"{id:0, firstName: '', lastName:'', email: ''}"

  //dummy Data sample
  // const [studentList, setStudentList] = useState<Student[]>([
  //   {
  //     id: 0,
  //     firstName: 'jacob',
  //     lastName: 'dekok',
  //     email: 'jacobdekok@gmail.com'

  //   },
  //   {
  //     id: 1,
  //     firstName: 'isaiah',
  //     lastName: 'furguson',
  //     email: 'isaiahferguson@gmail.com'

  //   },
  //   {
  //     id: 2,
  //     firstName: 'ken',
  //     lastName: 'martinez',
  //     email: 'kenmartinez@gmail.com'

  //   }
  // ]);

  const [student, setStudent] = useState({
    id: 0,
    firstName: '',
    lastName:'',
    email:''
  })
  
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClose = () => {
    setShow(false);

    setStudent({
      id: 0,
      firstName: '',
      lastName:'',
      email:''
    });

    setEdit(false);

  };

  const handleShow = () => setShow(true);
  const handleEditShow = (studentIndex: number) => {
    setEdit(true);

    setIndex(studentIndex);
    setStudent(studentList[studentIndex]);

    setShow(true)

  }

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
    
    //setItem is built in method for react

    handleClose();

  }

  const editStudent = () => {
    // console.log(student);
    // console.log('studentList[index]:', studentList[index]);

    studentList[index] = student;
    
    //console.log('Edited Student:', studentList[index])
    //setStudentList(student);

    handleClose();

    //this will not trigger our useEffect because it would be saving to itself which wouldn't cause our dependency array to pick up the change
    //studentList already equals studentList
   // setStudentList(studentList);

   //Because we are using the spread operator to create a new array, it triggers the useEffect to run because it is no loger the same array
    setStudentList([...studentList]);

  }

  const deleteStudent = (id: number) => {
    const editedList = studentList.filter((itemtoBeDeleted) => itemtoBeDeleted.id !== id);

      setStudentList(editedList);
  }

  useEffect(() => {
    localStorage.setItem('studentList', JSON.stringify(studentList));
  }, [studentList]);



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
            studentList.length == 0 ? <tr><td colSpan={4} className='text-center'>No Students</td></tr>:
            studentList.map((studentInMap, index) => (
              <tr key={studentInMap.id}>
                <td>{studentInMap.firstName}</td>
                <td>{studentInMap.lastName}</td>
                <td>{studentInMap.email}</td>
                <td>
                  <Button variant='success' onClick={() => handleEditShow(index)}>Edit</Button>{' '}
                  <Button variant='danger' onClick={() => deleteStudent(studentInMap.id)}>Delete</Button>

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
          <Modal.Title>{edit ? 'Edit' : 'Add'}Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='mb-3'>
              <label className='form-label'>First name </label>
              <input type='text' placeholder='John' className='form-control' name='firstName'onChange={handleChange} value={student.firstName}/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input type='text' placeholder='Doe' className='form-control' name='lastName' onChange={handleChange} value={student.lastName}/>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input type='text' placeholder='johndoe@gmail.com' className='form-control' name='email' onChange={handleChange} value={student.email}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={edit ? editStudent : addStudent}>
            {edit ? 'Save Changes' : 'Add Student'}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal - End */}
    </>
  )
}

export default App