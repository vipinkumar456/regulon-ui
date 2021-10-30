import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddUserRoleComponent } from '../add-user-role/add-user-role.component';
import { UserService } from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  bsModalRef: BsModalRef;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = '';
  headElements = [
    { name: 'name', title: "Role" },
    // { name: 'active', title: "Active" },
  ];
  data = []
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  constructor(private cdRef: ChangeDetectorRef,private modalService: BsModalService,private userService: UserService,
    private spinner: NgxSpinnerService) { }
  ngOnInit(){
    this.getRoles()
  }
  getRoles(){
    if (localStorage.getItem('dgliger')) {
      let user = JSON.parse(localStorage.getItem('dgliger'));
      this.spinner.show();
      this.userService.getRoles(user['access_token']).subscribe(res => {
        this.data = res.payload;
        this.mdbTable.setDataSource(this.data);
        this.data = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.spinner.hide();
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
  addUserRole() {
    this.bsModalRef = this.modalService.show(AddUserRoleComponent, { class: 'modal-primary' });
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result){
        this.getRoles()
      }
      
    })
  }
}
