import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { transformPopover } from './animation';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [transformPopover],
  exportAs: 'app-popover'
})
export class PopoverComponent {
  @ViewChild(TemplateRef, { static: false }) templateRef: TemplateRef<any>;

  constructor() {}
}
