let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    { 'id': 6035512059, 'name': 'Arima', 'surname': 'Aimer', 'Major': 'CoE', 'GPA': 4.00 },
    { 'id': 6035512060, 'name': 'Aimer', 'surname': 'Arima', 'Major': 'CoE', 'GPA': 4.00 },
    { 'id': 6035512061, 'name': 'Arim', 'surname': 'Aimer', 'Major': 'CoE', 'GPA': 4.00 }
];

router.route('/students')
    // get all students
    .get((req, res) => res.json(students))
    // insert a new student
    .post((req, res) => {
        var student = {};
        student.id = students.length > 0 ? students[students.length - 1].id + 1 : 0;
        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname
        student.Major = req.body.Major
        student.GPA = req.body.GPA
        students.push(student);
        res.json({ message: 'student created!' })
    })

router.route('/students/:student_id')
    .get((req, res) => {
        let id = req.params.student_id
        let index = students.findIndex(student => (student.id === +id))
        res.json(students[index])                   // get a student
    })
    .put((req, res) => {                               // Update a student
        let id = req.params.student_id
        let index = students.findIndex(student => (student.id === +id))
        students[index].id = req.body.id;
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;
        students[index].Major = req.body.Major;
        students[index].GPA = req.body.GPA
        res.json({ message: 'student updated!' + req.params.student_id });
    })
    .delete((req, res) => {                   // Delete a student
        // delete     students[req.params.student_id]
        let id = req.params.student_id
        let index = students.findIndex(student => student.id === +id)
        students.splice(index, 1)
        res.json({ message: 'student deleted: ' + req.params.student_id });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log("Server is running"));