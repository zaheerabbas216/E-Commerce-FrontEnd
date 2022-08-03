import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  closeResult = '';
  allRequests: any;
  user__: any;
  role: any;
  clickedReqData: any = {}
  constructor(private user: UsersService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.user.getAllRequests().subscribe((res: any) => {
      if (res) {
        this.allRequests = res;
        console.log('the list is ', this.allRequests);
      }
      else {
        console.log('error while getting the list');

      }
    },
      (error) => {
        console.log('initiate error', error);
      }
    )
  }

  gotoHome() {
    this.router.navigate(["home"])
  }



  viewRequestById() {
    this.user.getRequestById(this.clickedReqData._id).subscribe((res: any) => {
      if (res) {
        console.log('the res for the clicked user data is', res);
      }
      else {
        console.log('error getting the data');
      }
    },
      (error) => {
        console.log('inititate', error);
      }
    )
  }




  // for to trigger modal
  open(content: any, data: any) {
    this.clickedReqData = data;
    console.log('clicked data is', this.clickedReqData._id);
    this.viewRequestById();
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
}
