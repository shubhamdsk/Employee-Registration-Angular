import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeExperience, EmployeeSkill } from './Employee';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EMP-Registration';
  designationList: any[] = [];
  rolesList: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.loadDesignation();
    this.loadRoles();
  }

  loadDesignation() {
    this.http.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllDesignation').subscribe((res: any) => {
      this.designationList = res.data;
      console.log({ Designations: this.designationList });
    })
  }

  loadRoles() {
    this.http.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllRoles').subscribe((res: any) => {
      this.rolesList = res.data;
      console.log({ Roles: this.rolesList });

    })
  }

  stepList: { stepname: string; isComplete: boolean }[] = [
    { stepname: 'Basic Details', isComplete: false },
    { stepname: 'Skills', isComplete: false },
    { stepname: 'Experience', isComplete: false },
  ];

  activeStep: { stepname: string; isComplete: boolean } = this.stepList[0];

  setClick(step: { stepname: string; isComplete: boolean }) {
    this.activeStep = step;
  }

  employeeObj: Employee = {
    roleId: 0,
    userName: '',
    empCode: '',
    empId: 0,
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
    empContactNo: '',
    empAltContactNo: '',
    empPersonalEmailId: '',
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: '',
    empState: '',
    empPinCode: '',
    empAddress: '',
    empPerCity: '',
    empPerState: '',
    empPerPinCode: '',
    empPerAddress: '',
    password: '',
    erpEmployeeSkills: [],
    ermEmpExperiences: [],
  };

  empSkill: EmployeeSkill = {
    empSkillId: 0,
    empId: 0,
    skill: '',
    totalYearExp: 0,
    lastVersionUsed: '',
  };

  empExperience: EmployeeExperience = {
    empExpId: 0,
    empId: 0,
    companyName: '',
    startDate: '2025-03-22T04:47:45.320Z',
    endDate: '2025-03-22T04:47:45.320Z',
    designation: '',
    projectsWorkedOn: '',
  };

  addSkills() {
    this.employeeObj.erpEmployeeSkills.unshift(this.empSkill);
    this.empSkill = { empSkillId: 0, empId: 0, skill: '', totalYearExp: 0, lastVersionUsed: '' };
  }

  addExperience() {
    this.employeeObj.ermEmpExperiences.unshift(this.empExperience);
    this.empExperience = {
      empExpId: 0,
      empId: 0,
      companyName: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      designation: '',
      projectsWorkedOn: '',
    };
  }

  saveEmployee() {
    this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee", this.employeeObj)
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Success");
          }
        },
        error: (error) => {
          console.log("Error:", error);
        }
      });
  }

}
