"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tableContent = document.getElementById('content');
const modalBody = document.getElementById('modal-id');
class Table {
    constructor(path) {
        this.path = path;
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAll();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`http://localhost:9090/api/${this.path}`)
                .then(res => res.json())
                .then((data) => {
                this.generateTable(data.content);
            });
        });
    }
    generateElement(tag, text) {
        let elementTag = document.createElement(tag);
        if (text) {
            elementTag.innerText = text;
            //Students
            if (text == 'id') {
                elementTag.innerText = "ID";
            }
            if (text == 'firstName') {
                elementTag.innerText = "First Name";
            }
            if (text == 'lastName') {
                elementTag.innerText = "Last Name";
            }
            if (text == 'age') {
                elementTag.innerText = "Age";
            }
            if (text == 'email') {
                elementTag.innerText = "Email";
            }
            //Courses
            if (text == 'name') {
                elementTag.innerText = "Name";
            }
            if (text == 'teacherName') {
                elementTag.innerText = "Teacher Name";
            }
            if (text == 'classNumber') {
                elementTag.innerText = "Class Number";
            }
            if (text == 'startDate') {
                elementTag.innerText = "Start Date";
            }
        }
        return elementTag;
    }
    ;
    appendElement(parent, child) {
        parent.appendChild(child);
        return parent;
    }
    ;
    generateTable(data) {
        if (data.length === 0) {
            return;
        }
        let objectKeysParameters = Object.keys(data[0]);
        let table = this.generateElement('table');
        //header
        this.appendElement(table, objectKeysParameters.slice(0, 5)
            .map(objParam => this.generateElement('th', objParam))
            .reduce(this.appendElement, this.generateElement('tr')));
        //values
        const makeRow = (acc, row) => this.appendElement(acc, objectKeysParameters.slice(0, 5)
            .map(objParam => this.generateElement('td', row[objParam]))
            .reduce(this.appendElement, this.generateElement('tr')));
        data.reduce(makeRow, table);
        tableContent === null || tableContent === void 0 ? void 0 : tableContent.appendChild(table);
    }
    ;
}
let myTable = new Table("students");
myTable.onInit();
//functions
let tableStudent = document.querySelector("#table-students");
tableStudent === null || tableStudent === void 0 ? void 0 : tableStudent.addEventListener('click', selectTableStudent);
let tableCourse = document.querySelector("#table-courses");
tableCourse === null || tableCourse === void 0 ? void 0 : tableCourse.addEventListener('click', selectTableCourse);
let tableName = document.querySelector('.table-title');
function clearField() {
    tableContent.innerHTML = "";
    tableName.innerHTML = "";
    modalBody.innerHTML = "";
}
function selectTableStudent() {
    clearField();
    tableName.innerHTML = "Students";
    new Table("students").onInit();
    new Form('student').generateForm();
}
function selectTableCourse() {
    clearField();
    tableName.innerHTML = "Courses";
    new Table("courses").onInit();
    new Form('course').generateForm();
}
class Form {
    constructor(path) {
        this.formElement = document.getElementById("form");
        this.br = document.createElement("br");
        this.path = "";
        this.student = ["firstName", "lastName", "email", "birthDate"];
        this.course = ["name", "teacherName", "classNumber", "startDate"];
        this.type = [];
        this.path = path;
        this.setType();
    }
    setType() {
        this.path === 'student' ? this.type = this.student : this.type = this.course;
    }
    postData() {
        console.log(JSON.stringify(this.getFieldValues()));
        let myHeaders = new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        fetch(`http://localhost:9090/api/${this.path}`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(this.getFieldValues()),
        }).then(res => res.json())
            .then(data => console.log(data));
    }
    generateForm() {
        // Create a form dynamically
        let form = document.createElement("form");
        form.setAttribute("method", "post");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.getFieldValues();
            this.postData();
        });
        // Create an input element for first name
        for (let i = 0; i < this.type.length; i++) {
            let inputFirstName = document.createElement("input");
            inputFirstName.setAttribute("type", "text");
            inputFirstName.setAttribute("name", `${this.type[i]}`);
            inputFirstName.setAttribute("id", `${this.type[i]}`);
            inputFirstName.setAttribute("placeholder", `${this.type[i]}`);
            form.appendChild(inputFirstName);
            form.appendChild(this.br.cloneNode());
        }
        // Create an input element for last name 
        // let inputLastName = document.createElement("input");
        // inputLastName.setAttribute("type", "text");
        // inputLastName.setAttribute("name", "last-name");
        // inputLastName.setAttribute("id", "last-name");
        // inputLastName.setAttribute("placeholder", "Last Name");
        // Create an input element for email
        // let inputEmail = document.createElement("input");
        // inputEmail.setAttribute("type", "text");
        // inputEmail.setAttribute("name", "email");
        // inputEmail.setAttribute("id", "email");
        // inputEmail.setAttribute("placeholder", "E-Mail");
        // Create an input element for date of birth
        // let inputBirthDate = document.createElement("input");
        // inputBirthDate.setAttribute("type", "text");
        // inputBirthDate.setAttribute("name", "birth-date");
        // inputBirthDate.setAttribute("id", "birth-date");
        // inputBirthDate.setAttribute("placeholder", "Birth Date");
        // create a submit button
        let submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Submit");
        submitBtn.setAttribute("class", "btn btn-primary");
        submitBtn.setAttribute("data-bs-dismiss", "modal");
        let closeBtn = document.createElement("input");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("class", "btn btn-secondary");
        closeBtn.setAttribute("data-bs-dismiss", "modal");
        closeBtn.setAttribute("value", "Close");
        // Append the first name input to the form
        // Append the last name to the form
        // form.appendChild(inputLastName);
        // form.appendChild(this.br.cloneNode());
        // Append the Password to the form
        // form.appendChild(inputEmail);
        // form.appendChild(this.br.cloneNode());
        // Append the birth date to the form
        // form.appendChild(inputBirthDate);
        // form.appendChild(this.br.cloneNode());
        // Append the submit button to the form
        form.appendChild(submitBtn);
        form.appendChild(closeBtn);
        document.getElementsByClassName("modal-body")[0]
            .appendChild(form);
    }
    getFieldValues() {
        let object = {};
        if (this.path === "student") {
            object.firstName = document.getElementById(`${this.type[0]}`).value;
            object.lastName = document.getElementById(`${this.type[1]}`).value;
            object.email = document.getElementById(`${this.type[2]}`).value;
            object.birthDate = document.getElementById(`${this.type[3]}`).value;
            object.courses = [];
        }
        else {
            object.name = document.getElementById(`${this.type[0]}`).value;
            object.teacherName = document.getElementById(`${this.type[1]}`).value;
            object.classNumber = Number(document.getElementById((`${this.type[2]}`)).value);
            object.startDate = document.getElementById(`${this.type[3]}`).value;
        }
        return object;
    }
}
let myForm = new Form('student');
myForm.generateForm();
