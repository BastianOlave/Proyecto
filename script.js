const students=[]
const tableBody=document.querySelector("#studentsTable tbody")
const avarageDiv=document.getElementById("avarage");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();
    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const fecha=document.getElementById("fecha").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastName || !fecha || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar Datos")
        return
    }

    const student={name,lastName,fecha,grade};

    students.push(student);
    //console.log(students);
    addStudentToTable(student)
    promedio()
    this.reset()
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.fecha}</td>
        <td>${student.grade}</td>`;
    tableBody.appendChild(row);
}

function promedio(){
    if(students.length===0){
        avarageDiv.textContent="Promedio General del Curso: N/A"
        return  
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0)
    const prom=total/students.length;
    avarageDiv.textContent="Promedio General del Curso: "+prom.toFixed(2);
}

