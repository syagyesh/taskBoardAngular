import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import todo from '../../data/todo.json';
import inProgress from '../../data/inProgress.json';
import onHold from '../../data/onHold.json';
import completed from '../../data/completed.json';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  todo = todo;
  inProgress = inProgress;
  onHold = onHold;
  completed = completed;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if(localStorage.getItem('todo') != null) {
      this.todo = JSON.parse(localStorage.getItem('todo') || '[]')
    } else {
      localStorage.setItem('todo', JSON.stringify(this.todo));
    }
    if(localStorage.getItem('inProgress') != null) {
      this.inProgress = JSON.parse(localStorage.getItem('inProgress') || '[]');
    } else {
      localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    }
    if(localStorage.getItem('onHold') != null) {
      this.onHold = JSON.parse(localStorage.getItem('onHold') || '[]');
    } else {
      localStorage.setItem('onHold', JSON.stringify(this.onHold));
    }
    if(localStorage.getItem('completed') != null) {
      this.completed = JSON.parse(localStorage.getItem('completed') || '[]');
    } else {
      localStorage.setItem('completed', JSON.stringify(this.completed));
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result == null) return;
      this.todo = [...this.todo, result];
      localStorage.setItem('todo', JSON.stringify(this.todo));
    });    
  }

  deleteData(data:string, index:number) {
    if(data == 'todo'){
      this.todo.splice(index, 1);
      localStorage.setItem('todo', JSON.stringify(this.todo));
    }
    else if(data == 'inProgress'){
      this.inProgress.splice(index, 1);
      localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    }
    else if(data == 'onHold'){
      this.onHold.splice(index, 1);
      localStorage.setItem('onHold', JSON.stringify(this.onHold));
    }
    else {
      this.completed.splice(index, 1);
      localStorage.setItem('completed', JSON.stringify(this.completed));
    }
  }

  addData(data:any, catlog:string, index:number) {
    if(catlog == 'todo'){
      this.todo.splice(index, 0, data);
      localStorage.setItem('todo', JSON.stringify(this.todo));
    }
    else if(catlog == 'inProgress'){
      this.inProgress.splice(index, 0, data);
      localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    }
    else if(catlog == 'onHold'){
      this.onHold.splice(index, 0, data);
      localStorage.setItem('onHold', JSON.stringify(this.onHold));
    }
    else {
      this.completed.splice(index, 0, data);
      localStorage.setItem('completed', JSON.stringify(this.completed));
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.addData(event.previousContainer.data[event.previousIndex], event.container.id, event.currentIndex);
      this.deleteData(event.previousContainer.id, event.previousIndex);
    }
  }
}
