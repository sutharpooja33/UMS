import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
  });

  success(message: string) {
    this._toast.fire({
      icon: 'success',
      title: message
    });
  }

  error(message: string) {
    this._toast.fire({
      icon: 'error',
      title: message
    });
  }

  warning(message: string) {
    this._toast.fire({
      icon: 'warning',
      title: message
    });
  }

  info(message: string) {
    this._toast.fire({
      icon: 'info',
      title: message
    });
  }

}
