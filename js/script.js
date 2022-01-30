document.addEventListener("DOMContentLoaded", function () {
    createHeader();
    createForm();
    listTodoUnchecked();
    listTodoChecked();
    const submitForm = document.getElementById("form");
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("date");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
        titleInput.value = "";
        dateInput.value = "";
    });

});


