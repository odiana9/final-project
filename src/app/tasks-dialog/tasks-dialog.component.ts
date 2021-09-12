import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusTypes, Task, TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.scss']
})
export class TasksDialogComponent implements OnInit {
  public updateTaskForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {taskId: number},
    private tasksService: TasksService) {
      this.updateTaskForm = new FormGroup({
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl('', [Validators.required]),
        createdAt: new FormControl('', [Validators.required]),
        deadline: new FormControl('', [Validators.required]),
        status: new FormControl(StatusTypes, [Validators.required]),
      });
    }

  ngOnInit(): void {}

  public onSubmit(): void {
    if(!this.updateTaskForm.valid) {
      return;
    }

    this.tasksService
      .updateTask(
        this.data.taskId,
        this.updateTaskForm.value
      )
      .subscribe((updatedTask: Task) => {
        this.updateTaskForm.reset();
        this.dialogRef.close(updatedTask)
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
