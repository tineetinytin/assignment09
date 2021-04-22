let storage;
let empList = [];
let form = document.querySelector('#addForm');
let table = document.querySelector('#employees');
let tableBody = document.querySelector('#employees tbody');

// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [12345678, 'Christine Akers', 1234, 'ca@vecta.com', 'Administrative'],
    [48593902, 'Jordan Smith', 4358, 'js@vecta.com', 'Marketing'],
    [34535859, 'Misty Miles', 4859, 'mm@vecta.com', 'Sales'],
    [48539859, 'Rollo Rogers', 6940, 'rr@vecta.com', 'Engineering'],
    [34593989, 'Bim George', 5860, 'bg@vecta.com', 'Executive']
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
window.addEventListener('load', () => {

    if(!localStorage.getItem('empList')){
        empList = employees;
        console.log(empList);
        buildGrid(empList);
    }
    else{
        empList = JSON.parse(localStorage.getItem('empList'));
        buildGrid(empList);
    }
   
});

// GET DOM ELEMENTS
const $ = (id) => {
    return document.getElementById(id);
};

let empCount = document.getElementById('empCount');
let count = 0;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
// employees.forEach(emp => {
//     let row = document.createElement('tr');

//     Object.values(emp).forEach(text => {
//         let cell = document.createElement('td');
//         let textNode = document.createTextNode(text);
//         cell.appendChild(textNode);
//         row.appendChild(cell);
//     })
//     table.appendChild(row);
// })


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    //PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    
        let id = document.querySelector('#id').value;
        let name = document.querySelector('#name').value;
        let extension = document.querySelector('#extension').value;
        let email = document.querySelector('#email').value;
        let department = document.querySelector('#department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
        let newEmployee = [id, name, extension, email, department];
        // console.log(newEmployee);
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    empList.push(newEmployee);
    // console.log(empList);
    
    // BUILD THE GRID
    buildGrid(empList);

    // RESET THE FORM
    form.reset(); 

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();
});

// DELETE EMPLOYEE
table.addEventListener('click', (e) => {

    if(e.target.classList.contains('delete')) {
    // CONFIRM THE DELETE
    if(confirm(`Are you sure you want to delete?`)) {

        // // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let rowIndex = e.target.parentNode.rowIndex;

        // // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        table.deleteRow(e.target.parentNode.rowIndex);

        // REMOVE EMPLOYEE FROM ARRAY
        empList.splice(rowIndex - 1, 1);
        }
        // BUILD THE GRID
        buildGrid(empList);
    }   
});

// BUILD THE EMPLOYEES GRID
function buildGrid(employees) {
    let count = 0;
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    document.querySelector('#employees tbody').remove();
        
    // // REBUILD THE TBODY FROM SCRATCH
    let table2 = document.createElement('tbody');
    let row = '';
    
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE

    for(i of employees) {
        ++count;
        row += "<tr>";

        for (j of i) {
            row += "<td>" + j +"</td>";
        }
        row += '<td class="btn btn-danger btn-sm float-right delete">' + "X" +"</td>";
        row += "</tr>";    
    }

    table2.innerHTML = row;
    console.log(table2);


    // BIND THE TBODY TO THE EMPLOYEE TABLE
    table.appendChild(table2);

    // UPDATE EMPLOYEE COUNT
    document.querySelector('#empCount').value = count;
   

    // STORE THE ARRAY IN STORAGE

    localStorage.setItem('empList', JSON.stringify(employees));
};








