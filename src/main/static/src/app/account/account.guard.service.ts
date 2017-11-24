import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as AppUtils from '../utils/app.utils';

@Injectable()
export class AccountGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    let isLogged: boolean = !!localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)
      || !!sessionStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);

    if (!isLogged) {
      this.router.navigate(['authenticate']);
      return false;
    }
    return true;
  }
}
