import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  private taskId: number = 0;
  public currentTask: Task | undefined;

  constructor(
    private router: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.taskId = this.router.snapshot.params.taskId;

    this.tasksService.getTask(this.taskId).subscribe((task: Task) => {
      this.currentTask = task;
    });
  }
}
