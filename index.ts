let count: number = 0;
let res: any = document.querySelector("#res");
let students: any[] = [];


async function init(): Promise<void> {
    await getAll();
    console.log(students);
}

async function getAll(): Promise<string[]> {
    await fetch("http://localhost:9090/api/students")
        .then(res => res.json())
        .then((data) => {
            students = data.content;
        })
    return students;
}

init();
