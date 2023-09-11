import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  files: File[] = [];
  uploadProgress: number | undefined;

 

  handleDroppedFiles(files: File[]) {
    this.files = files;
    this.simulateUpload();
   
  }
   
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedFiles = inputElement.files;

    if (selectedFiles) {
      this.files = this.files.concat(Array.from(selectedFiles));
      this.simulateUpload();
    }
  } 

  formatFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return size.toFixed(1) + units[unitIndex];
  }

  removeFile(index: number) {
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1);
    }
  }

  simulateUpload() {
    if (this.files.length === 0) {
      return;
    }

    this.uploadProgress = 0;
    const totalFiles = this.files.length;
    let uploadedFiles = 0;

    const uploadInterval = setInterval(() => {
      uploadedFiles++;
      this.uploadProgress = (uploadedFiles / totalFiles) * 100;

      if (uploadedFiles === totalFiles) {
        clearInterval(uploadInterval);
        // Reiniciar la barra de progreso después de completar la carga simulada.
        // setTimeout(() => {
        //   this.uploadProgress = undefined;
        // }, 1000);
      }
    }, 1000); // Incrementar el progreso cada segundo (simulado).
  }
  
}