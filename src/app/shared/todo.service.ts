import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
  }

  //Adding the todo title in the node todo with this function

  addTodo(title: string) {

    this.firestoreCollection.add({
      title,
      isDone: false,
    })
  }

  // Updating the todo

  updateTodoStatus(id:string, newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus})
  }

  //Deleting the task 

  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete();
  }


}
