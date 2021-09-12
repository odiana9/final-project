import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }

  public searchTasks(text: string): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:3000/tasks?q=${text}`);
  }

  public getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/tasks/${taskId}`);
  }

  public createTask(
    projectId: number,
    body: CreateTaskBody
  ): Observable<Task> {
    return this.http.post<Task>(`http://localhost:3000/projects/${projectId}/tasks`, body);
  }

  public deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/tasks/${taskId}`);
  }

  public updateTask(taskId: number, body: CreateTaskBody): Observable<Task> {
    return this.http.patch<Task>(`http://localhost:3000/tasks/${taskId}`, body)
  }
}

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
  status: StatusTypes;
  projectId: number;
}

export enum StatusTypes {
  Todo = "to do",
  InProgress = "in progress",
  InReview = "in review",
  Completed = "completed"
}

export interface CreateTaskBody {
  title: string;
  description: string;
  createdAt: string;
  deadline: string;
  status: StatusTypes;
}