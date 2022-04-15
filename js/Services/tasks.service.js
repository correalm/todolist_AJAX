import { Task } from './../Model/Task.model.js'
import {creatXmlRequest} from './../creatXML.js'

const urlUsers = "http://localhost:3000/users"

export default class TasksService{
    constructor(){
        this.tasks = []
    }

    add(task, cb, userId){
        if(!task instanceof Task){
            throw TypeError("Task must be an instance of Task")
        }

        const fn = (_task) => {
            const {title, completed, createdAt, updatedAt} = _task
            // this.tasks.push(new Task(title, completed, createdAt, updatedAt))
            this.getTasks(userId, cb) // garante que os dados estão em conformidade com o servidor
            // if(typeof cb === "function") cb()
        }
        creatXmlRequest("POST", `${urlUsers}/${userId}/tasks`, fn, JSON.stringify(task))
        
    }

    getTasks(userId, cb){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            cb(this.tasks)
        }
        creatXmlRequest("GET", `${urlUsers}/${userId}/tasks`, fn)
    }
    remove(id, cb, userId){
        const fn = () => {
            this.getTasks(userId, cb) // garante que os dados estão em conformidade com o servidor
            // if(typeof cb === "function") cb()
        }
        creatXmlRequest("DELETE", `http://localhost:3000/tasks/${id}`, fn)
    }
}