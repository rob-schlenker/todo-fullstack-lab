import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAllItems(): any {
    return this.http.get(`${this.apiURL}/todo-items`);
  }

  deleteItem(id): any {
    return this.http.delete(`${this.apiURL}/todo-items/${id}`)
  }

  addItem(item): any {
    return this.http.post(`${this.apiURL}/todo-items`, item)
  }

}
