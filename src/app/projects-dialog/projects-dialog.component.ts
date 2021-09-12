import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project, ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-dialog',
  templateUrl: './projects-dialog.component.html',
  styleUrls: ['./projects-dialog.component.scss']
})
export class ProjectsDialogComponent implements OnInit {
  public updateProjectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projectId: number},
    private projectsService: ProjectsService) {
      this.updateProjectForm = new FormGroup({
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit(): void {}

  public onSubmit(): void {
    if(!this.updateProjectForm.valid) {
      return;
    }

    this.projectsService
      .updateProject(
        this.data.projectId,
        this.updateProjectForm.value
      )
      .subscribe((updatedProject: Project) => {
        this.updateProjectForm.reset();
        this.dialogRef.close(updatedProject)
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
