import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { ShiftService } from '../../../core/services/shift.service';
import { AuthService } from '../../../core/services/auth.service';
import { Employee } from '../../../shared/models/employee.model';
import { Shift } from '../../../shared/models/shift.model';

@Component({
  selector: 'app-shift-assignment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shift-assignment.component.html',
  styleUrl: './shift-assignment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftAssignmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);
  private authService = inject(AuthService);

  employeeId: number = 0;
  employee = signal<Employee | null>(null);
  isLoading = signal(true);
  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  shiftForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  }, { validators: this.timeValidator });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = parseInt(params['id'], 10);
      this.loadEmployee();
    });
  }

  private loadEmployee(): void {
    this.isLoading.set(true);
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudo cargar el empleado');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.shiftForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const formValue = this.shiftForm.value;
      const shift: Shift = {
        id: 'shift_' + Date.now(),
        employeeId: this.employeeId,
        date: formValue.date,
        startTime: formValue.startTime,
        endTime: formValue.endTime,
        createdAt: new Date().toISOString()
      };

      this.shiftService.saveShift(shift);
      this.successMessage.set('Turno asignado correctamente');
      this.isSubmitting.set(false);

      // Redirect after short delay
      setTimeout(() => {
        this.router.navigate(['/empleados']);
      }, 1500);
    } catch (error) {
      this.errorMessage.set('Error al guardar el turno');
      this.isSubmitting.set(false);
    }
  }

  private timeValidator(form: FormGroup): { [key: string]: any } | null {
    const startTime = form.get('startTime')?.value;
    const endTime = form.get('endTime')?.value;

    if (startTime && endTime) {
      if (endTime <= startTime) {
        return { invalidTimeRange: true };
      }
    }

    return null;
  }

  goBack(): void {
    this.router.navigate(['/empleados']);
  }

  logout(): void {
    this.authService.logout();
  }

  get date() {
    return this.shiftForm.get('date');
  }

  get startTime() {
    return this.shiftForm.get('startTime');
  }

  get endTime() {
    return this.shiftForm.get('endTime');
  }

  get timeRangeError(): boolean {
    return this.shiftForm.hasError('invalidTimeRange') && this.shiftForm.touched;
  }
}
