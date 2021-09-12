import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsDialogComponent } from '../projects-dialog/projects-dialog.component';
import { Project } from '../projects.service';
import { Task } from '../tasks.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public tasks: Task[] | undefined = [];

  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public update: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public onDelete(): void {
    this.delete.emit(this.id);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ProjectsDialogComponent, {
      width: "250px",
      data: {projectId: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.update.emit(result);
      }
    });
  }
}
