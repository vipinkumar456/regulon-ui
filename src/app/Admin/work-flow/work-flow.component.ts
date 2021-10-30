import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectorRef
} from "@angular/core";
import {
  MdbTablePaginationComponent,
  MdbTableDirective
} from "angular-bootstrap-md";
import { Router } from "@angular/router";
import { WorkFlowService } from "../../Services/workflow.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-work-flow",
  templateUrl: "./work-flow.component.html",
  styleUrls: ["./work-flow.component.css"]
})
export class WorkFlowComponent implements OnInit {
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = "";
  // data: Array<any> = [];
  checkedData: Array<any> = [];
  checkedAll: boolean = false;
  searchType:string="name"
  headElements = [
    { name: "name", title: "Work Flow Name", sort: false },
    { name: "description", title: "Description", sort: false },
    // { name: 'dct', title: 'DCT#', sort: false },
    // { name: 'user', title: 'Users', sort: true },
    // { name: 'level', title: 'Level', sort: true },
    { name: "action", title: "Actions", sort: false }
  ];
  data: Array<any> = [];
  size = 10;
  sort:string = "workflowID";
  activePage: number = 0;
  pager: any = { size: 10, activePage: 0 };
  all: Array<any> = [];
  pages: number[] = [];
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private workFlowService: WorkFlowService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getWorkFlowsAll();
  }
  getWorkFlowsAll() {
    this.spinner.show();
    this.workFlowService
      .getAll(this.pager.activePage.toString(), this.pager.size, this.sort)
      .subscribe(
        res => {
          // console.log(res)
          this.data = res.payload.content;
          this.pager.totalPages = res.payload.totalPages;
          this.pager.pages = Array(res.payload.totalPages);
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }
  getSearchAll() {
    this.spinner.show();
    this.workFlowService
      .getSearchAll(this.pager.activePage.toString(), this.pager.size, this.sort,this.searchType,this.searchText)
      .subscribe(
        res => {
          // console.log(res)
          this.data = res.payload.content;
          this.pager.totalPages = res.payload.totalPages;
          this.pager.pages = Array(res.payload.totalPages);
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  // ngAfterViewInit() {

  //   this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
  //   this.mdbTablePagination.calculateFirstItemIndex();
  //   this.mdbTablePagination.calculateLastItemIndex();
  //   this.cdRef.detectChanges();
  // }
  // emitDataSourceChange() {
  //   this.mdbTable.dataSourceChange().subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
  // searchItems() {
  //   const prev = this.mdbTable.getDataSource();

  //   if (!this.searchText) {
  //     this.mdbTable.setDataSource(this.previous);
  //     this.data = this.mdbTable.getDataSource();
  //   }

  //   if (this.searchText) {
  //     this.data = this.mdbTable.searchLocalDataBy(this.searchText);
  //     this.mdbTable.setDataSource(prev);
  //   }

  //   this.mdbTablePagination.calculateFirstItemIndex();
  //   this.mdbTablePagination.calculateLastItemIndex();

  //   this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
  //     this.mdbTablePagination.calculateFirstItemIndex();
  //     this.mdbTablePagination.calculateLastItemIndex();
  //   });

  // }
  addWorkFlow() {
    this.router.navigate(["admin/workflow/add"]);
  }
  edit(itm) {
    this.router.navigate(["admin/workflow/edit/" + itm.workflowID]);
  }
  delete(itm) {
    this.spinner.show();
    this.workFlowService.deleteWorkFlowById(itm.workflowID).subscribe(
      res => {
        this.toastr.success("WorkFlow deleted successfully", "Success");
        this.getWorkFlowsAll();
      },
      err => {
        this.toastr.error("WorkFlow delete failed", "Error");
        this.spinner.hide();
      }
    );
  }
  setPage(page: number) {
    this.pager.activePage = page;
    this.getWorkFlowsAll();
  }
}
