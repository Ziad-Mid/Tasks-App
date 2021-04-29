import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:5000/tasks" ;

  constructor(private http: HttpClient) { }


  findAll(){
    return this.http.get<Task[]>(this.apiUrl); //return a table of tasks from the DB
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`); //ES6
  }

  persist(task){
    return this.http.post<Task>(this.apiUrl,task);  //task : data we want to persist in server
  }

  completed(id , completed){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed : !completed})  ; //patch when u want to change just an attribute in the doc //put when u modifie everything
  }

  update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`,task);
  }
}
