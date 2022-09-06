const tableContent: HTMLElement | null = document.getElementById('content');
let element = document.getElementById("btn")
let titleContent: any = document.querySelector('.table-title');
console.log("teste");
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

let myTable = new Table("courses");
myTable.onInit();





