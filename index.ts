const tableContent: HTMLElement | null = document.getElementById('content');
let path: string = "students"

async function init(): Promise<void> {
    await getAll();
    console.log(element)
}

async function getAll(): Promise<void> {
    await fetch(`http://localhost:9090/api/${path}`)
        .then(res => res.json())
        .then((data) => {
            generateTable(data.content);
        })
}

function generateElement(tag: any, text?: string) {
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

function appendElement(parent: HTMLTableElement, child: HTMLTableElement) {
    parent.appendChild(child);
    return parent;
};

function generateTable(data: string[]): void {
    if (data.length === 0) {
        return;
    }
    let objectKeysParameters = Object.keys(data[0]);
    let table = generateElement('table');

    //header
    appendElement(table,
        objectKeysParameters.slice(0, 5)
            .map(objParam => generateElement('th', objParam))
            .reduce(appendElement, generateElement('tr'))
    );

    //values
    const makeRow = (acc: HTMLTableElement, row: any) =>
        appendElement(acc,
            objectKeysParameters.slice(0, 5)
                .map(objParam => generateElement('td', row[objParam]))
                .reduce(appendElement, generateElement('tr'))
        );

    data.reduce(makeRow, table);
    tableContent?.appendChild(table);
};

let element = document.getElementById("btn")
element?.addEventListener("click", changePath);

let title = document.querySelector(".table-title");

function changePath(): void {
    path === 'students' ? path = 'courses' : path = 'students';

    let titleContent = title?.textContent?.toString();
    console.log(titleContent)

    if (tableContent !== null) {
        tableContent.innerHTML = '';
    }
    getAll();
}

init();
