import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EMP-Registration';
  stepList: any[] = [
    { stepname: 'Basic Details', isComplete: false },
    { stepname: 'Skills', isComplete: false },
    { stepname: 'Experience', isComplete: false },
  ];

  activeStep: any = this.stepList[0];

  setClick(step: any) {
    this.activeStep = step
  }
}
