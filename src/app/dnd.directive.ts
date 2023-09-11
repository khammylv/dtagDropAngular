import { Directive  , HostListener, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() filesDropped = new EventEmitter<File[]>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      this.filesDropped.emit(Array.from(droppedFiles));
    }
  }
  

}
