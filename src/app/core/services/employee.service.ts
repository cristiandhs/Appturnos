import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL).pipe(
      catchError(error => {
        console.error('Error al obtener empleados:', error);
        return throwError(() => new Error('No se pudieron cargar los empleados. Intenta más tarde.'));
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener empleado ${id}:`, error);
        return throwError(() => new Error('Error al cargar el empleado.'));
      })
    );
  }
}
