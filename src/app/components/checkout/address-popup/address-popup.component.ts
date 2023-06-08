import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.css']
})
export class AddressPopupComponent implements OnInit {
  addressForm!: FormGroup;
  submitted = false;
  dataLoaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddressPopupComponent>,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.createForm();
  }
  get f() { return this.addressForm.controls; }
  createForm() {
    this.addressForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      guild: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      home: ['', Validators.required],
    })
  }
  finish() {
    this.changeAddress();
    this.closePopup();

  }
  closePopup(): void {
    this.dialogRef.close();
  }
  changeAddress() {
    if (this.addressForm.valid) {
      const { userName, home, phone, guild, district, province } = this.addressForm.getRawValue();
      const addressModel: Address = { userName, home, phone, guild, district, province };
      localStorage.setItem("address", JSON.stringify(addressModel));
      console.log(addressModel)
    }
    else {

    }
  }


}
