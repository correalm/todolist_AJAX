import TasksService from './Services/tasks.service.js'
import TasksController from './Controllers/Tasks.controller.js'
import TasksView from './Views/Tasks.view.js'
 

//ARMAZENAR O DOM EM VARIAVEIS
const itemInput = document.getElementById("item-input")
const todoAddForm = document.getElementById("todo-add")
const ul = document.getElementById("todo-list")
const lis = ul.getElementsByTagName("li")

const taskService = new TasksService()
const tasksView = new TasksView(ul)
const taskController = new TasksController(taskService, tasksView)


taskController.getTasks()

// FORM
todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault()
    taskController.add(itemInput.value)

    itemInput.value = ""
    itemInput.focus()
});

// clicked Ul
    function clickedUl(e) {
        const dataAction = e.target.getAttribute("data-action")
        console.log(e.target)
        if (!dataAction) return

        let currentLi = e.target
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)

        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");

                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer.style.display = "flex";


            },
            deleteButton: function () {
                // arrInstancesTasks.splice(currentLiIndex, 1)
                // renderTasks()
                taskController.remove(currentLi.getAttribute("data-id"))

            },
            containerEditButton: function () {
                const title = currentLi.querySelector(".editInput").value
                const id = currentLi.getAttribute("data-id")
                taskController.edit({title, id})
            },
            containerCancelButton: function () {
                const id = currentLi.getAttribute("data-id")
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[id].title()
            },
            checkButton: function () {

                // DEVE USAR O MÉTODO toggleDone do objeto correto
                const id = currentLi.getAttribute("data-id")
                taskController.toogleDone(id)
                
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }
    
    ul.addEventListener("click", clickedUl)



   