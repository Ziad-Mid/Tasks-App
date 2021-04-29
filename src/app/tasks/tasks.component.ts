import { TmplAstElement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  myTask : Task = {
  label : '',
  completed: false
  };

  editForm = false ;

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks(); //after loading the page load the data directly
  }

  getTasks(){
    this.taskService.findAll().subscribe(tasks=>this.tasks = tasks) //return data in a var
  }
  
  deleteTask(id){
    this.taskService.delete(id).subscribe(()=>{
      this.tasks = this.tasks.filter(task => task.id != id); //return all lines except the task we deleted
    })
  }

  persistTask(){
    this.taskService.persist(this.myTask).subscribe((task)=>{
      this.tasks = [task, ...this.tasks];
      this.resetTask();
    })
    }

    resetTask(){
      this.myTask = {
        label : '',
        completed: false
      }
    }

    toggleCompleted(task){
      this.taskService.completed(task.id,task.completed).subscribe(()=>{
        task.completed= !task.completed ;
      })
    }

    editTask(task){
      this.myTask = task ;
      this.editForm = true;
    }
   
    updateTask(){
      this.taskService.update(this.myTask).subscribe(task =>{ //task c est l obj que return
        this.resetTask();
        this.editForm = false;
      })
    }
}
