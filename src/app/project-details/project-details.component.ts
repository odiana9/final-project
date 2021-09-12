import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  private projectId: number = 0;
  public currentProject: Project | undefined;

  constructor(
    private router: ActivatedRoute,
    private projectsService: ProjectsService,
    ) {}

  ngOnInit(): void {
    this.projectId = this.router.snapshot.params.projectId;
    
    this.projectsService.getProject(this.projectId).subscribe((project: Project) => {
      this.currentProject = project;
    });
  } 
}
