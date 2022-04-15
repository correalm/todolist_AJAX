import {Task} from './Model/Task.model.js'
import {creatXmlRequest} from './creatXML.js'
import TasksService from './Services/tasks.service.js'
import TasksController from './Controllers/Tasks.controller.js'
import TasksView from './Views/Tasks.view.js'

// const url = "https://jsonplaceholder.typicode.com/users/1/todos/"
const urlUsers = "http://localhost:3000/users"
const urlTasks = "http://localhost:3000/tasks"
const userId = 1

//ARMAZENAR O DOM EM VARIAVEIS
const itemInput = document.getElementById("item-input")
const todoAddForm = document.getElementById("todo-add")
const ul = document.getElementById("todo-list")
const lis = ul.getElementsByTagName("li")

const taskService = new TasksService()
const tasksView = new TasksView(ul)
const taskController = new TasksController(taskService, tasksView)


taskService.getTasks(userId, init)

// FORM
todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault()
    taskController.add(itemInput.value, userId)

    itemInput.value = ""
    itemInput.focus()
});




// when the data is ready, run the init function
// cb will recived the return of GET

function init(arrInstancesTasks){
    if(arrInstancesTasks.error) return
    tasksView.render(taskService.tasks)

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
                taskController.remove(currentLi.getAttribute("data-id"), userId)

            },
            containerEditButton: function () {
                const val = currentLi.querySelector(".editInput").value
                arrInstancesTasks[currentLiIndex].setTitle(val)
                renderTasks()
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getTitle()
            },
            checkButton: function () {

                // DEVE USAR O MÉTODO toggleDone do objeto correto
                arrInstancesTasks[currentLiIndex].toggleDone()
                renderTasks()
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }
    
    ul.addEventListener("click", clickedUl)

}



   