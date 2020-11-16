import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item';
import {  } from 'events';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {


  @Input() budgetItems: BudgetItem[];

  @Output() delete: EventEmitter<BudgetItem> =  new EventEmitter<BudgetItem>();
  constructor( public dialog: MatDialog) { }

  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  ngOnInit(): void {
  }

  onDelete(item: BudgetItem){
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem){
    // Show the edit modal

    const dialogref = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    })

    dialogref.afterClosed().subscribe(result => {
      // check if result has a value

      if(result){
        this.update.emit({
          old: item,
          new: result
        })
      }
    })
  }

}


export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
