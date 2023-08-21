import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Address } from 'src/app/models/address';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.css']
})
export class AddressPopupComponent implements OnInit {
  addressForm!: FormGroup;
  submitted = false;
  address!: Address;
  dataLoaded = false;
  userID!: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddressPopupComponent>,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToastrService,
    private userService: UserService,


  ) {

  }
  ngOnInit(): void {
    if (this.authService.userValue != null) {
      this.userID = this.authService.userValue._id;

      this.getAddrDetail(this.userID)

    }
    this.createForm();

  }
  createForm() {
    if (this.dataLoaded && this.address) {
      this.addressForm = this.formBuilder.group({
        userName: [this.address.userName],
        phone: [this.address.phone],
        province: [this.address.province],
        district: [this.address.district],
        guild: [this.address.guild],
        home: [this.address.home],
      });
    } else {
      this.addressForm = this.formBuilder.group({
        userName: [''],
        phone: [''],
        province: [''],
        district: [''],
        guild: [''],
        home: [''],
      });
    }
  }

  finish() {
    if (!this.address) {
      this.addAddress();
    }
    else {
      this.changeAddress();
    }
    this.closePopup();

  }
  closePopup(): void {
    this.dialogRef.close();
  }
  getAddrDetail(userID: string) {
    this.userService.getAddr(userID).subscribe(
      (response) => {
        this.address = response;

        this.dataLoaded = true;
        this.createForm();
      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);
        this.createForm()

      }
    );
  }
  // changeAddress() {
  //   if (this.dataLoaded && this.address) {
  //     //đã có địa chỉ rồi
  //     if (this.addressForm.valid) {
  //       console.log("thay đổi địa chỉ")


  //       var userID = this.userID;

  //       const addReg = this.addressForm.value;
  //       addReg.userID = this.userID;
  //       // localStorage.setItem("address", JSON.stringify(addressModel));
  //       this.userService.changeAddr(userID, addReg).subscribe(
  //         ((response: any) => {
  //           console.log(response)
  //           if (response.status) {
  //             // console.log("oke")
  //             this.toasterService.success("Sửa địa chỉ thành công!");
  //             // localStorage.setItem("address", JSON.stringify(addressModel));
  //             // this.address = response;
  //             // localStorage.setItem("user", JSON.stringify(addressModel))
  //             // this.dataLoaded = true;
  //             // this.authService.onRefresh();
  //             // this.router.navigate(['/']);
  //           }
  //           else
  //             this.toasterService.error('Thêm địa chỉ thất bại');

  //         }),
  //         catchError((error: any) => {
  //           console.log("Lỗi từ API:", error);
  //           return of(null);
  //         })
  //       )
  //     }
  //   }
  // }
  changeAddress() {
    //chưa có địa chỉ nào
    if (this.addressForm.valid) {

      if (this.userID != null) {

        // var userID = this.userID;
        const addReg = this.addressForm.value;
        addReg.userID = this.userID;

        // localStorage.setItem("address", JSON.stringify(addressModel));
        this.userService.changeAddr(this.userID, addReg).subscribe(
          ((response) => {
            if (response.status) {
              this.toasterService.success("Thay đổi địa chỉ thành công!");
              // localStorage.setItem("address", JSON.stringify(addressModel));
              // this.address = response;
              // localStorage.setItem("user", JSON.stringify(addressModel))
              this.dataLoaded = true;
              // this.authService.onRefresh();
              // this.router.navigate(['/']);
            }
            else
              this.toasterService.error('Thêm địa chỉ thất bại');

          }),
          catchError((error: any) => {
            console.log("Lỗi từ API:", error);
            return of(null);
          })
        )
      }
    }


  }



  addAddress() {
    //chưa có địa chỉ nào
    if (this.addressForm.valid) {

      if (this.authService.userValue != null) {

        // var userID = this.userID;
        const addReg = this.addressForm.value;
        addReg.userID = this.userID;
        // localStorage.setItem("address", JSON.stringify(addressModel));
        this.userService.registerAddr(addReg).subscribe(
          ((response) => {
            if (response.status) {
              this.toasterService.success("Thêm địa chỉ thành công!");
              // localStorage.setItem("address", JSON.stringify(addressModel));
              // this.address = response;
              // localStorage.setItem("user", JSON.stringify(addressModel))
              this.dataLoaded = true;
              // this.authService.onRefresh();
              // this.router.navigate(['/']);
            }
            else
              this.toasterService.error('Thêm địa chỉ thất bại');

          }),
          catchError((error: any) => {
            console.log("Lỗi từ API:", error);
            return of(null);
          })
        )
      }
    }


  }


}