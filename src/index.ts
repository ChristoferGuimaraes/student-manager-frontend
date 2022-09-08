const tableContent: any = document.getElementById('content');

class Table {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    async onInit(): Promise<void> {
        await this.getAll();
    }

    async getAll(): Promise<void> {
        await fetch(`http://localhost:9090/api/${this.path}`)
            .then(res => res.json())
            .then((data) => {
                this.generateTable(data.content);
            })
    }

    generateElement(tag: any, text?: string) {
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
    };

    appendElement(parent: HTMLTableElement, child: HTMLTableElement) {
        parent.appendChild(child);
        return parent;
    };

    generateTable(data: string[]): void {
        if (data.length === 0) {
            return;
        }
        let objectKeysParameters = Object.keys(data[0]);
        let table = this.generateElement('table');

        //header
        this.appendElement(table,
            objectKeysParameters.slice(0, 5)
                .map(objParam => this.generateElement('th', objParam))
                .reduce(this.appendElement, this.generateElement('tr'))
        );

        //values
        const makeRow = (acc: HTMLTableElement, row: any) =>
            this.appendElement(acc,
                objectKeysParameters.slice(0, 5)
                    .map(objParam => this.generateElement('td', row[objParam]))
                    .reduce(this.appendElement, this.generateElement('tr'))
            );

        data.reduce(makeRow, table);
        tableContent?.appendChild(table);
    };

}

let myTable = new Table("students");
myTable.onInit();


//functions
let tableStudent = document.querySelector("#table-students");
tableStudent?.addEventListener('click', selectTableStudent);

let tableCourse = document.querySelector("#table-courses");
tableCourse?.addEventListener('click', selectTableCourse);

let tableName: any = document.querySelector('.table-title');

function clearField(): void {
    tableContent.innerHTML = "";
    tableName.innerHTML = "";
}

function selectTableStudent(): void {
    clearField();
    tableName.innerHTML = "Students";
    
    new Table("students").onInit();

}

function selectTableCourse(): void {
    clearField();
    tableName.innerHTML = "Courses";

    new Table("courses").onInit();
    
}
