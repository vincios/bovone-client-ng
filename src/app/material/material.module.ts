import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  // imports: [
  //   CommonModule,
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatCardModule,
  //   MatSelectModule,
  //   MatFormFieldModule,
  //   MatIconModule,
  //   MatTooltipModule,
  //   MatListModule,
  //   MatMenuModule,
  //   MatInputModule,
  //   MatSlideToggleModule,
  //   MatDialogModule,
  //   MatCheckboxModule,
  //   DragDropModule,
  // ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    DragDropModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
