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

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks(); //after loading the page load the data directly
  }

  getTasks(){
    this.taskService.findAll().subscribe(tasks=>this.tasks = tasks) //return data in a var
  }
  
}
