import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,
    private http: Http,
    private _flashMessagesService: FlashMessagesService,
    public auth: AuthService) { }

  users = [];
  user = {};

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        console.log("======= 25 ==========", data);
        this.users = data
        this._flashMessagesService.show('you successfully fetched all data!', { cssClass: 'alert-success', timeout: 3000 });
      },
      error => {
        console.log(error)
      }
    );
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.userService.deleteUser(user).subscribe(
        res => {
          const pos = this.users.map(elem => elem._id).indexOf(user._id);
          this.users.splice(pos, 1);
        },
        error => console.log(error)
      );
    }
  }

  isEditing = false;
  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.getUsers();
  }

  editUser(user) {
    console.log("============ edit user ===============", user)
    this.userService.editUser(user).subscribe(
      res => {
        this.isEditing = false;
        this.user = user;
      },
      error => console.log(error)
    );
  }
}