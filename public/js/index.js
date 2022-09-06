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
let element = document.getElementById("btn");
let titleContent = document.querySelector('.table-title');
console.log("teste");
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
let myTable = new Table("courses");
myTable.onInit();
