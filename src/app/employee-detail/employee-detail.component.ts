import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../Constants/Api';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string | undefined;
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.loadEmployeeDetail();
    });
  }

  async loadEmployeeDetail() {
    try {
      const response: any = await this.http
        .get(`${API_URL}/getEmployee/${this.employeeId}`)
        .toPromise();

      this.employee = response;
    } catch (error) {
      console.log('Error', error);
    }
  }

  onBackToList() {
    const queryParams = {
      usernameSearchTerm: this.route.snapshot.queryParams['usernameSearchTerm'],
      emailSearchTerm: this.route.snapshot.queryParams['emailSearchTerm']
    };

    this.router.navigate(['/employees'], { queryParams });
  }
}