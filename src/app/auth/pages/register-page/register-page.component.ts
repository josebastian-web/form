import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as cunstomValidator from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validator.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb: FormBuilder = new FormBuilder();
  private validatorService: ValidatorsService = inject(ValidatorsService);
  private emailValidator: EmailValidator = inject(EmailValidator);

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)] ],
    // email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ new EmailValidator() ] ],
    email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ this.emailValidator ] ],
    username: [ '', [ Validators.required, this.validatorService.cantBeStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required,  ] ],
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }


}
