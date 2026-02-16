import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Shift } from '../../shared/models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private platformId = inject(PLATFORM_ID);
  private readonly SHIFTS_KEY = 'shifts';

  saveShift(shift: Shift): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const shifts = this.getAllShifts();
    shifts.push(shift);
    localStorage.setItem(this.SHIFTS_KEY, JSON.stringify(shifts));
  }

  getAllShifts(): Shift[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const shifts = localStorage.getItem(this.SHIFTS_KEY);
    return shifts ? JSON.parse(shifts) : [];
  }

  getShiftsByEmployeeId(employeeId: number): Shift[] {
    return this.getAllShifts().filter(shift => shift.employeeId === employeeId);
  }

  deleteShift(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const shifts = this.getAllShifts().filter(shift => shift.id !== id);
    localStorage.setItem(this.SHIFTS_KEY, JSON.stringify(shifts));
  }
}
