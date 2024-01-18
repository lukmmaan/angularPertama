import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { API_URL } from '../../Constants/Api';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  allEmployees: any[] = [];
  employees: any[] = [];
  totalEmployees: number = 0;
  totalEmployeesTemp: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  usernameSearchTerm: string = '';
  emailSearchTerm: string = '';
  sortKey: string = '';
  sortDirection: string = 'asc';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usernameSearchTerm = this.route.snapshot.queryParams['usernameSearchTerm'] || '';
    this.emailSearchTerm = this.route.snapshot.queryParams['emailSearchTerm'] || '';
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      const response: any = await this.http
        .get<any[]>(`${API_URL}/allEmployees`)
        .toPromise();

      this.allEmployees = response;
      this.totalEmployees = response.length;
      this.employees = this.getPagedEmployees();
      // console.log(this.employees, 'employees')
      // console.log(this.employees[0]._id, 'employees')
    } catch (error) {
      console.log(error);
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.employees = this.getPagedEmployees();
  }

  private getPagedEmployees() {
    let startIndex = this.pageIndex * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    let filteredEmployees = this.allEmployees.filter(employee =>
      employee.username.toLowerCase().includes(this.usernameSearchTerm.toLowerCase()) &&
      employee.email.toLowerCase().includes(this.emailSearchTerm.toLowerCase())
    );

    if (this.usernameSearchTerm || this.emailSearchTerm) {
      this.totalEmployeesTemp = filteredEmployees.length;
    } else {
      this.totalEmployeesTemp = this.totalEmployees;
    }

    if (this.sortKey) {
      filteredEmployees = this.sortData(filteredEmployees);
    }

    return filteredEmployees.slice(startIndex, endIndex);
  }

  onSearchChange() {
    this.pageIndex = 0;
    this.employees = this.getPagedEmployees();
  }

  onSort(key: string) {
    if (key === this.sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.employees = this.getPagedEmployees();
  }

  sortData(data: any[]): any[] {
    return data.sort((a, b) => {
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      }
    });
  }

  showNotification(message: string, color: string) {
    this.snackBar.open(message, 'Tutup', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [color],
    });
  }

  onEdit(username: string) {
    this.showNotification(`Edit akun ${username}`, 'yellow');
  }

  onDelete(username: string) {
    this.showNotification(`Hapus akun ${username} `, 'red');
  }

  onAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

  onEmployeeClick(employeeId: string) {
    this.router.navigate(['/employee-detail', employeeId], {
      queryParams: {
        usernameSearchTerm: this.usernameSearchTerm,
        emailSearchTerm: this.emailSearchTerm
      }
    });
  }
}
