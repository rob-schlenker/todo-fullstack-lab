import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [
  ];
  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.service.getAllItems().subscribe(response => {
      this.todos = response
      console.log(this.todos)
    })
  }

  deleteItem(id: number): void {
    this.service.deleteItem(id).subscribe(() => {
      this.getAllItems();
    });
  }

  complete(index: number): void {
    this.todos[index].completed = true
  }

  addItem(form: NgForm): void {
    console.log(form.value)
    this.service.addItem(form.value).subscribe(() => {
      this.getAllItems();
      form.reset();
    });
  }

}
