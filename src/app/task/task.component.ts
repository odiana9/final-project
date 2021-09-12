import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksDialogComponent } from '../tasks-dialog/tasks-dialog.component';
import { StatusTypes, Task } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public createdAt: string = '';
  @Input() public deadline: string = '';
  @Input() public status: StatusTypes = StatusTypes.Todo;
  @Input() public projectId: number = 0;

  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public update: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public onDelete(): void {
    this.delete.emit(this.id);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TasksDialogComponent, {
      width: "250px",
      data: {taskId: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.update.emit(result);
      }
    });
  }
}
