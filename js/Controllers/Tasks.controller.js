import { Task } from "../Model/Task.model.js"
import { userId } from '../config.js'
export default class TasksController{
    constructor(service, view){
        this.service = service
        this.view = view
    }

    add(title){
        this.service.add(new Task(title), 
        () => {
            this.view.render(this.service.tasks)
        },
        (erro) => alert(erro),
        userId
        )
    }

    remove(id){
        this.service.remove(id, 
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro),
            userId
        )
        
    }
    edit(task){
        task.upadateAt = Date.now()
        this.service.edit(task,
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro),
            userId
        )
    }
    toogleDone(id){
        const task = this.service.getById(parseInt(id))
        const { completed } = task
        this.edit({completed: !completed, id: parseInt(id)}, userId)
    }

    getTasks(){
        console.log(userId)
        this.service.getTasks(userId, 
            () => this.view.render(this.service.tasks), 
            (erro) => alert(erro)
        )
    }
}