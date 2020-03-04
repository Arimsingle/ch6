import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Student.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card } from 'react-bootstrap';
export default () => {

    const [students, setStudent] = useState({})
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [Major, setMajor] = useState('')
    const [GPA, setGpa] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
        console.log(result.data)
        setStudent(result.data)
    }
    const addStudent = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            id,
            name,
            surname,
            Major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }
    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost/api/students/${id}`)
        console.log(result.data.id)
        setId(result.data.id)
        setName(result.data.name)
        setSurname(result.data.surname)
        setMajor(result.data.Major)
        setGpa(result.data.GPA)
    }
    const updateStudent = async (id) => {
        const result = await axios.put(`http://localhost/api/students/${id}`, {
            id,
            name,
            surname,
            Major,
            GPA
        })
        //console.log(result.data.Major)
        setId(result.data.id)
        setName(result.data.name)
        setSurname(result.data.surname)
        setMajor(result.data.Major)
        setGpa(result.data.GPA)
        getStudents()
    }

    const delStudent = async (id) => {
        const result = await axios.delete(`http://localhost/api/students/${id}`)
        getStudents()
    }

    const printStudents = () => {
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <div className="dfr">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Students : {index + 1}</Card.Title>
                                <ul key={index}>
                                    <Card.Text>
                                        <p>ID: {student.id}</p>
                                        <p>NAME: {student.name}</p>
                                        <p>Surname: {student.surname}</p>
                                        <p>Major: {student.Major}</p>
                                        <p>GPA: {student.GPA}</p>
                                    </Card.Text>
                                    <Button onClick={() => getStudent(student.id)} variant="outline-primary">Get</Button>
                                    <Button onClick={() => updateStudent(student.id)} variant="outline-info">Update</Button>
                                    <Button onClick={() => delStudent(student.id)} variant="outline-danger">Delete</Button>
                                </ul>
                            </Card.Body>
                        </Card>
                        <hr />
                    </div>
                )
            })
        else {
            return (<h2> No bear </h2>)
        }
    }
    return (
        <div>
            <div>
                <div className="row">
                    {printStudents()}
                </div>
            </div>
            <div className="row-cnt">
                <div className="dfr2">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>Get Student</Card.Title>
                            <Card.Text>
                                <p>ID: {id}</p>
                                <p>NAME: {name}</p>
                                <p>Surname: {surname}</p>
                                <p>Major: {Major}</p>
                                <p>GPA: {GPA}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="dfr2">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>ADD Student</Card.Title>
                            <Card.Text>
                                <input
                                    placeholder="Enter ID"
                                    type="text"
                                    name="name"
                                    onChange={(e) => setId(Number(e.target.value))}
                                />
                                <br />
                                <input
                                    placeholder="Enter Name"
                                    type="text"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                /> <br />
                                <input
                                    placeholder="Enter Surname"
                                    type="text"
                                    name="Surname"
                                    onChange={(e) => setSurname(e.target.value)}
                                /> <br />
                                <input
                                    placeholder="Enter Major"
                                    type="text"
                                    name="Major"
                                    onChange={(e) => setMajor(e.target.value)}
                                /> <br />
                                <input
                                    placeholder="Enter GPA"
                                    type="number"
                                    name="GPA"
                                    onChange={(e) => setGpa(e.target.value)}
                                /><br />
                                <Button onClick={addStudent} variant="outline-success">Add Student</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}