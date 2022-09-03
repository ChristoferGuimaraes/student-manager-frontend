const tableContent: HTMLElement | null = document.getElementById('content');


async function init(): Promise<void> {
    await getAll();
}

async function getAll(): Promise<void> {
    await fetch("http://localhost:9090/api/students")
        .then(res => res.json())
        .then((data) => {
            generateTable(data.content);
        })
}

function generateElement(tag: any, text?: any) {
    let elementTag = document.createElement(tag);
    if (text) {
        elementTag.innerText = text;
    }
    return elementTag;
};

function appendElement(parent: any, child: any) {
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
    const makeRow = (acc: any, row: any) =>
        appendElement(acc,
            objectKeysParameters.slice(0, 5)
                .map(objParam => generateElement('td', row[objParam]))
                .reduce(appendElement, generateElement('tr'))
        );
    data.reduce(makeRow, table);
    tableContent?.appendChild(table);
};

init();
