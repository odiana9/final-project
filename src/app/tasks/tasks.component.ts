import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusTypes, Task, TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() public tasks: Task[] = [];
  public taskForm: FormGroup;

  private projectId: number = 0;

  constructor(
    private tasksService: TasksService,
    private router: ActivatedRoute,
    ) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required]),
      createdAt: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.projectId = this.router.snapshot.params.projectId;
    
    this.tasksService.getTasks().subscribe((allTasks: Task[]) => {
      this.tasks = allTasks;
    });
  }

  public search(event: Event): void {
    this.tasksService.searchTasks((event.target as HTMLInputElement).value).subscribe((filteredTasks: Task[]) => {
      this.tasks = filteredTasks;
    });
  }

  public onSubmit(): void {
    console.log(this.taskForm.value);
    if (!this.taskForm.valid) {
      return;
    }

    this.tasksService
      .createTask(
        this.projectId,
        {...this.taskForm.value, status: StatusTypes.Todo}
      )
      .subscribe((newTask: Task) => {
        this.tasks.push(newTask);
        this.taskForm.reset();
      });
  }

  public deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    });
  }

  public updateTask(task: Task): void {
    this.tasks = this.tasks.map((t) => t.id !== task.id ? t : task);
  }
}
