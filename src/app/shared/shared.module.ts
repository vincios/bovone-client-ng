import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ResizedDirective } from './directives/resized/resized.directive';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ResizedDirective],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ResizedDirective]
})
export class SharedModule {}
