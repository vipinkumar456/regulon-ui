import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  bsModalRef: BsModalRef;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = '';
  headElements = [
    { name: 'userName', title: "User Name" },
    { name: 'roles', title: "User Roles" },
    // { name: 'designation', title: "Designation" },
    { name: 'accountNonExpired', title: "Active" },
  ];
  data = []
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-primary modal-lg'
  };
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  constructor(private cdRef: ChangeDetectorRef, private modalService: BsModalService, private userService: UserService,
    private toastr: ToastrService,private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.getUsers()
  }
  getUsers() {
    if (localStorage.getItem('dgliger')) {
      let user = JSON.parse(localStorage.getItem('dgliger'));
      this.spinner.show();
      this.userService.getAll(user["access_token"]).subscribe(res => {
        this.spinner.hide();
        this.data = res;
        this.mdbTable.setDataSource(this.data);
        this.data = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        // console.log(res.payload)
      },err=>{
        this.spinner.hide();
      })
    }

  }
  ngAfterViewInit() {

    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.data = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.data = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });

  }
  keys(obj): Array<string> {
    return Object.keys(obj);
  }
  addUser() {
    this.bsModalRef = this.modalService.show(AddUserComponent,this.config);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.toastr.success('User created successfully','Success')
        this.getUsers()
      }
    })
  }
}
