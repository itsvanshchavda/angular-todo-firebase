import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todos: any[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Collection of the firebase for performing operations add, update, delete
    this.todoService.firestoreCollection.valueChanges({ idField: 'id' }) // Getting the id by this object unique id by firebase
      .subscribe(items => {
        this.todos = items.sort((a:any , b:any ) => {return a.isDone -b.isDone });
      });
  }

  onClick(titleInput: HTMLInputElement) {
    // Adding the todo function with this HTML #titleinput click event
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = '';
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }
}
