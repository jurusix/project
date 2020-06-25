import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  profile: FormGroup;

  constructor(public authService: AuthService, fb: FormBuilder) {
    this.profile = fb.group({
      firstName: fb.control(authService.user?.firstName),
      lastName: fb.control(authService.user?.lastName),
      email: fb.control(authService.user?.email),
    });
  }
}
