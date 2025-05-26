const students=[]
const tableBody=document.querySelector("#studentsTable tbody")
const avarageDiv=document.getElementById("avarage");
const CantidadDiv=document.getElementById("Cantidad");
const aprobadosDiv=document.getElementById("Aprobados");
const desaprobadosDiv=document.getElementById("Reprobados");
let editstudent=null;

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


    if(editstudent!==null){
        const index=students.findIndex(s=> s.id === editstudent);
        if(index!==-1){
            students[index]={id: editstudent, name, lastName, fecha, grade};
            const row=tableBody.querySelector(`tr[data-id="${editstudent}"]`);
            row.querySelector(".name-column").textContent=name;
            row.querySelector(".lastName-column").textContent=lastName;
            row.querySelector(".fecha-column").textContent=fecha;
            row.querySelector(".grade-column").textContent=grade;
        }
        editstudent=null;
    }else{
        const student={id: Date.now(), name, lastName, fecha, grade}; 
        students.push(student);
        addStudentToTable(student);
    }
    promedio()
    this.reset()
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.setAttribute("data-id", student.id);
    row.innerHTML=`
        <td class="name-column">${student.name}</td>
        <td class="lastName-column">${student.lastName}</td>
        <td class="fecha-column">${student.fecha}</td>
        <td class="grade-column">${student.grade}</td>
        <td> <button class="edit-btn">Editar</button></td>
        <td> <button class="delete-btn">Eliminar</button></td>`;
    row.querySelector(".edit-btn").addEventListener("click",function(){
        const estudianteEditado=students.find(s=> s.id === student.id);
        editarEstudiante(estudianteEditado);
        });
    row.querySelector(".delete-btn").addEventListener("click",function(){
        deleteEstudiante(student.id,row);
        });
    CantidadDiv.textContent="Cantidad de Estudiantes: "+students.length;
    tableBody.appendChild(row);
}

function editarEstudiante(student){
    editstudent=student.id;
    document.getElementById("name").value=student.name;
    document.getElementById("lastName").value=student.lastName;
    document.getElementById("fecha").value=student.fecha;
    document.getElementById("grade").value=student.grade;
}

function deleteEstudiante(studentID,row){
    const index=students.findIndex(s=> s.id === studentID);
    if(index!==-1){
        students.splice(index, 1);
        row.remove();
        promedio();
    }
    if (editstudent===studentID){
        editstudent=null;
        document.getElementById("studentForm").reset();
    }
    CantidadDiv.textContent="Cantidad de Estudiantes: "+students.length;
}

function promedio(){
    if(students.length===0){
        avarageDiv.textContent="Promedio General del Curso: N/A"
        aprobadosDiv.textContent="Aprobados: N/A";
        desaprobadosDiv.textContent="Desaprobados: N/A";
        CantidadDiv.textContent="Cantidad de Estudiantes: 0";
        return  
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0)
    const prom=total/students.length;
    avarageDiv.textContent="Promedio General del Curso: "+prom.toFixed(2);

    const aprobados=students.filter(student => student.grade >= 4).length;
    const desaprobados=students.length - aprobados;
    aprobadosDiv.textContent="Aprobados: " + aprobados;
    desaprobadosDiv.textContent="Desaprobados: " + desaprobados;
}