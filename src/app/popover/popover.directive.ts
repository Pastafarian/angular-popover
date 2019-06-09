import { Directive, Input, ViewContainerRef, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { OverlayRef, FlexibleConnectedPositionStrategy, OverlayConfig, Overlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[popoverReference]'
})
export class PopoverDirective implements OnDestroy {
  @Input() popoverReference: PopoverComponent;

  private delayMs = 200;
  private mouseoverTimer: any;
  private popoverOpen = false;

  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal<any>;

  constructor(public elementRef: ElementRef, private viewContainerRef: ViewContainerRef, private overlay: Overlay) {}

  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.mouseoverTimer = setTimeout(() => {
      this.openPopover();
    }, this.delayMs);
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent): void {
    if (this.mouseoverTimer) {
      clearTimeout(this.mouseoverTimer);
      this.mouseoverTimer = null;
    }

    setTimeout(() => {
      this.closePopover();
    }, this.delayMs);
  }

  openPopover(): void {
    if (!this.popoverOpen) {
      if (!this.overlayRef) {
        this.portal = new TemplatePortal(this.popoverReference.templateRef, this.viewContainerRef);
        const config = this._getOverlayConfig();

        // Create Portal Host / Overlay - Placeholder for our template
        this.overlayRef = this.overlay.create(config);
      }

      // Attach the the Portal / Template Portal
      this.overlayRef.attach(this.portal);
      this.popoverOpen = true;
    }
  }

  closePopover(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.popoverOpen = false;
    }
  }

  private _getOverlayConfig(): OverlayConfig {
    const overlayState = new OverlayConfig();
    overlayState.positionStrategy = this._getPosition();
    overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
    return overlayState;
  }

  private _getPosition(): FlexibleConnectedPositionStrategy {
    return (
      this.overlay
        .position()
        // Connects the position of the overlay to a given target elemement
        .flexibleConnectedTo(this.elementRef)
        // The withPositions() method take a list of a ConnectionPositionPair[].This is a list of preferred positions,
        // from most to least desirable.The 'best' position will be selected based on how well the overlay fits within the viewport.
        .withPositions(this.getPositionsConfig())
    );
  }

  private getPositionsConfig(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
