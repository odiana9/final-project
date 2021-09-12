import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public projectForm: FormGroup;

  constructor(private projectsService: ProjectsService) {
    this.projectForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((allProjects: Project[]) => {
      this.projects = allProjects;
    });
  }

  public search(event: Event): void {
    this.projectsService.searchProjects((event.target as HTMLInputElement).value).subscribe((filteredProjects: Project[]) => {
      this.projects = filteredProjects;
    });
  }

  public onSubmit(): void {
    if (!this.projectForm.valid) {
      return;
    }

    this.projectsService
      .createProject(
        this.projectForm.value.title,
        this.projectForm.value.description,
      )
      .subscribe((newProject: Project) => {
        this.projects.push(newProject);
        this.projectForm.reset();
      });
  }

  public deleteProject(projectId: number): void {
    this.projectsService.deleteProject(projectId).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== projectId);
    });
  }

  public updateProject(project: Project): void {
    this.projects = this.projects.map((p) => p.id !== project.id ? p : project);
  }
}