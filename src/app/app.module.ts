import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PopoverComponent } from './popover/popover.component';
import { PopoverDirective } from './popover/popover.directive';
import { MatButtonModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, PopoverComponent, PopoverDirective],
  imports: [BrowserModule, MatButtonModule, BrowserAnimationsModule, OverlayModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PopoverComponent]
})
export class AppModule {}
