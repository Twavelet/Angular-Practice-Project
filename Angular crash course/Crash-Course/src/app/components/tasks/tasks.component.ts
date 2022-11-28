import { Component } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTasks(task: Task) {
    console.log('hitting');
    this.taskService.deleteTasks(task).subscribe(
      () =>
        (this.tasks = this.tasks.filter((t) => {
          t.id !== task.id;
        }))
    );
  }

  toggleReminder(task: Task) {
    console.log(`${task.reminder} has changed`);
    task.reminder = !task.reminder;
    this.taskService
      .updateTaskReminder(task)
      .subscribe();
  }
}
