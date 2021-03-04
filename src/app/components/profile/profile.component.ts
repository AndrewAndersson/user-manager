import { StatesService } from './../../services/states.service';
import { UserData } from './../../models/user-data.model';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../validators/mime-type.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserData;

  userForm: FormGroup;

  private fileForm: FormGroup;
  imagePreview: any;
  gender: any;

  constructor(
    private client: ClientService,
    private states: StatesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.client.getCurrentUser()
        .subscribe((res: UserData) => {
          this.user = res;
          this.userForm.controls['firstName'].setValue(this.user.firstName? this.user.firstName: 'First Name');
          this.userForm.controls['lastName'].setValue(this.user.lastName? this.user.lastName: 'Last Name');
          this.userForm.controls['genderMale'].setValue(this.user?.gender === 'male'? this.user.gender: null);
          this.userForm.controls['genderFemale'].setValue(this.user?.gender === 'female'? this.user.gender: null);
        });

    this.fileForm = new FormGroup ({
      file: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.initForm();

    this.userForm.valueChanges.subscribe(({genderMale, genderFemale}) => {
      this.gender = {genderMale, genderFemale};
    });
  }

  uploadPhoto(e) {
    const avatarImage = (e.target as HTMLInputElement).files[0];
    this.fileForm.patchValue({file: avatarImage});
    this.fileForm.get('file').updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      if (this.fileForm.status === 'VALID') {
        const formData = new FormData();
        formData.append('image', this.fileForm.value.file);
        this.client.savePhoto(formData)
        .subscribe(_ => {          
          this.imagePreview = reader.result;
        });
      } else {
        this.states.setSnackbarParams({message: 'Invalid file format', color: 'warning', timeout: 5000});
        this.imagePreview = undefined;
      }
    };
    reader.readAsDataURL(avatarImage);
  }

  initForm(){
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      genderMale: [null],
      genderFemale: [null]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onResetGender(state) {
    this.userForm.controls[state].setValue(false);
  }

  onFocus(state: 'firstName' | 'lastName') {
    String(this.userForm.controls[state].value).includes('Name') && this.userForm.controls[state].setValue('');
  }

  onSubmit() {
    const firstName = this.userForm.controls['firstName'].value,
          lastName = this.userForm.controls['lastName'].value,
          gender =  this.userForm.controls['genderMale'].value? 'male': this.userForm.controls['genderFemale'].value? 'female' : null;
    const resObj: any = {firstName, lastName},
          request = {};
    
    Object.keys(resObj).forEach(value => {
      if(resObj[value].includes(' Name')) resObj[value] = '';      
      if (resObj[value]) request[value] = resObj[value];
    });

    this.client.updateProfile({...request, gender}).subscribe();
  }

}
