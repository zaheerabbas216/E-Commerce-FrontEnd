import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  user__: any;
  role: any;
  closeResult = '';
  isReqSent: boolean = false;
  requestForm: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private user: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDatafromLocalStorage();
    this.setRequestForm();
  }

  setRequestForm() {
    this.requestForm = this.fb.group({
      role: [''],
      userId: [''],
      email: [''],
      category: [''],
      desc: ['']
    })
  }




  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getUserDatafromLocalStorage() {
    let userData: any;
    userData = localStorage.getItem('userInfo');
    this.user__ = JSON.parse(userData)
    console.log('the user data is===========', this.user__);
    this.role = this.user__.role;
    console.log('this.role', this.role);
  }


  becomeSeller() {
    this.requestForm.patchValue({
      role: this.role,
      userId: this.user__._id,
      email: this.user__.email
    })

    this.user.sendRequest(this.requestForm.value).subscribe((res: any) => {
      if (res) {
        console.log('req sent successfully!!', res);
        this.isReqSent = true;
        this.requestForm.reset();
      }
      else {
        console.log('error while sending the request');

      }
    },
      (error) => {
        console.log('error', error);
      }
    )
    console.log('request form value', this.requestForm.value);
  }

  gotoNotifications() {
    this.router.navigate(["notifications"])
  }
}
