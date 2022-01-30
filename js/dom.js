    
function createForm() {
    //wrapper
    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");

    // countainer outer
    let containerOuter = document.createElement("div");
    containerOuter.setAttribute("class", "container-header text-center");

    // container header outer
    let containerHeaderOuter = document.createElement("h2");
    containerHeaderOuter.setAttribute("class", "container-header text-center");
    containerHeaderOuter.appendChild(document.createTextNode("New Todo :"));

    // form
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "#");
    form.setAttribute("id", "form");


    //div for title
    let divClassInputTitle = document.createElement("div");
    divClassInputTitle.setAttribute("class", "form-group form-title");

    //div for date
    let divClassInputDate = document.createElement("div");
    divClassInputDate.setAttribute("class", "form-group form-title");


    // label for title
    let labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.appendChild(document.createTextNode("Masukan Hal yang akan Dilakukan"));
    
    // label for date
    let labelDate = document.createElement("label");
    labelDate.setAttribute("for", "date");
    labelDate.appendChild(document.createTextNode("Masukkan tanggal harus selesai"));

    // create input title
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "title");
    inputTitle.required;

    // create input date
    let inputDate = document.createElement("input");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("id", "date");
    inputDate.required;

    // Create a submit button
    let s = document.createElement("input");
    s.setAttribute("type", "Submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("name", "Submit");
    s.setAttribute("class", "btn-submit");

    divClassInputTitle.appendChild(labelTitle);
    divClassInputTitle.appendChild(inputTitle);

    divClassInputDate.appendChild(labelDate);
    divClassInputDate.appendChild(inputDate);

    form.appendChild(divClassInputTitle);
    form.appendChild(divClassInputDate);
    form.appendChild(s);

    containerOuter.appendChild(containerHeaderOuter);
    containerOuter.appendChild(form);

    wrapper.appendChild(containerOuter);
    
    return document.body.append(wrapper);
}

function createHeader() {
    let header = document.createElement("header");
    let headerText = document.createElement("h1");
    headerText.appendChild(document.createTextNode("Todo-List"));

    header.appendChild(headerText);
    document.body.append(header);
}


function listTodoUnchecked() {
    let container = document.createElement("div");
    container.setAttribute("class", "container");

    let containerHeader = document.createElement("h2");
    containerHeader.setAttribute("class", "container-header");
    containerHeader.appendChild(document.createTextNode("Yang Harus Dilakukan"));

    let containerList = document.createElement("div");
    containerList.setAttribute("class", "list-item");
    containerList.setAttribute("id", "todos");

    container.append(containerHeader);
    container.append(containerList);

    let wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(container);

}


function listTodoChecked() {
    let container = document.createElement("div");
    container.setAttribute("class", "container");

    let containerHeader = document.createElement("h2");
    containerHeader.setAttribute("class", "container-header");
    containerHeader.appendChild(document.createTextNode("Yang Sudah Dilakukan"));

    let containerList = document.createElement("div");
    containerList.setAttribute("class", "list-item");
    containerList.setAttribute("id", "completed-todos");

    container.append(containerHeader);
    container.append(containerList);

    let wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(container);

}
  

const UNCOMPLETED_LIST_TODO_ID = "todos";
function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID );

    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const todo = makeTodo(textTodo, timestamp, false);
    uncompletedTODOList.append(todo);
 
}

function makeTodo(data, timestamp, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;
 
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);
 
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    if (isCompleted){
        container.append(createUndoButton(),createTrashButton());
    }else {
        container.append(createCheckButton());
    }
    
    return container;
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

const COMPLETED_LIST_TODO_ID = "completed-todos"; 
function addTaskToCompleted(taskElement) {
    console.log(taskElement);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle,taskTimestamp,false);
    listUncompleted.append(newTodo);
    taskElement.remove();
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}


function removeTaskFromCompleted(taskElement) {
    taskElement.remove();
}


function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}


