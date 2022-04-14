import { Task } from './../Model/Task.model.js'
import {creatXmlRequest} from './../creatXML.js'

const urlUsers = "http://localhost:3000/users"

export default class TasksService{
    constructor(){
        this.tasks = []
    }

    add(task){
        if(!task instanceof Task){
            throw TypeError("Task must be an instance of Task")
        }
        this.tasks.push(task)
    }

    getTasks(userId, cb){
        creatXmlRequest("GET", `${urlUsers}/${userId}/tasks`, cb)
    }
}