import { Task } from './../Model/Task.model.js'
import { creatFetch } from './../fetch.js'
import { urlTasks, urlUsers } from '../config.js'

export default class TasksService{
    constructor(){
        this.tasks = []
    }

    add(task, cb, error, userId){
        creatFetch("POST", `${urlUsers}/${userId}/tasks`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err))
    }

    getTasks(userId, sucess, error){

        

        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })
            if(typeof sucess === "function") sucess(this.tasks)
            return this.tasks
        }
        return creatFetch("GET", `${urlUsers}/${userId}/tasks`)
            .then(response => {
                return fn(response)
            })
            .catch(erro => error(erro.message))
    }

    remove(id, cb, error, userId){
        creatFetch("DELETE", `${urlTasks}/${id}`)
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(erro => error(erro.message))
    }

    edit(task, sucess, error, userId){
        task.updatedAt = Date.now()
        creatFetch("PATCH", `${urlTasks}/${task.id}`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => sucess())
            .catch(erro => error(erro.message))
    }

    getById(id){
        return this.tasks.find(task => parseInt(task.id) === id)
    }
}