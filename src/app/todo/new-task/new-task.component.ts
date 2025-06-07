import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) { }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    if (this.editingTodo) {
    // Atualizar a tarefa existente
    const updatedTodo: Todo = {
      ...this.editingTodo,
      title: this.newTaskTitle
    };
    this.todoService.updateTodo(updatedTodo);
    this.editingTodo = null;
  } else {
    // Criar nova tarefa
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false
    };
    this.todoService.addTodo(newTodo);
  }
  this.newTaskTitle = '';
    /*const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';*/
  }

  startEdit(todo: Todo): void {
    this.editingTodo = todo;
    this.newTaskTitle = todo.title;
  }
}
