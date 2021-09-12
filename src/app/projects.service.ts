import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/projects');
  }

  public searchProjects(text: string): Observable<Project[]> {
    return this.http.get<Project[]>(`http://localhost:3000/projects?q=${text}`);
  }

  public getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`http://localhost:3000/projects/${projectId}?_embed=tasks`);
  }

  public createProject(
    title: string,
    description: string,
  ): Observable<Project> {
    return this.http.post<Project>('http://localhost:3000/projects', {
      title,
      description
    });
  }

  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/projects/${projectId}`);
  }

  public updateProject(projectId: number, body: UpdateProjectBody): Observable<Project> {
    return this.http.patch<Project>(`http://localhost:3000/projects/${projectId}`, body)
  }
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tasks?: Task[];
}

export interface UpdateProjectBody {
  title: string;
  description: string;
}