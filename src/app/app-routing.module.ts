import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [{
  path: "",
  component: ProjectsComponent,
}, {
  path: "projects/:projectId",
  component: ProjectDetailsComponent,
}, {
  path: "projects/:projectId/tasks/:taskId",
  component: TaskDetailsComponent,
}, {
  path: "**",
  redirectTo: "/"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
