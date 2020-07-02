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
  photoUrl: string | undefined;

  constructor(public authService: AuthService, fb: FormBuilder) {
    this.photoUrl = authService.identityClaims?.picture;
    this.profile = fb.group({
      firstName: fb.control(authService.identityClaims?.given_name),
      lastName: fb.control(authService.identityClaims?.family_name),
      email: fb.control(authService.identityClaims?.email),
    });
  }
}
