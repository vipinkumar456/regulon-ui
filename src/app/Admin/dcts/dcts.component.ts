import { Component, OnInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkFlowService } from '../../Services/workflow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dcts',
  templateUrl: './dcts.component.html',
  styleUrls: ['./dcts.component.css']
})
export class DctsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;;
  @ViewChild('row', { static: true }) row: ElementRef;
  previous: string;
  maxVisibleItems: number = 10;
  searchText: string = '';
  // data: Array<any> = [];
  checkedData: Array<any> = [];
  checkedAll: boolean = false;
  // @HostListener('input') oninput() {
  //   this.mdbTablePagination.searchText = this.searchText;
  // }
  headElements = [
    { name: 'dctNumber', title: "DCT Number", sort: true },
    { name: 'riskType', title: 'Risk Type', sort: false },
    { name: 'department', title: 'Department', sort: false },

    { name: 'trancheType', title: 'Tranche Type', sort: false },
    
    { name: 'dataUnit', title: 'Data Unit', sort: false },
    { name: 'dctDescription', title: 'DCT Description', sort: false },
    // { name: 'action', title: 'Actions', sort: false }
  ];

  data: Array<any> = [];
  paging = {}
  pages: number[] = [];
  activePage: number = 0;
  pager: any = {};
  pagedItems: any[];
  size = 10;
  sort: 'dctNumber';
  searchType = "number";

  constructor(private cdRef: ChangeDetectorRef, private spinner: NgxSpinnerService,
    private router: Router, private workFlowService: WorkFlowService) { }

  ngOnInit() {

    this.getDctsAll()
  }

  getDctsAll() {

    this.spinner.show();
    this.workFlowService.getDcts(this.activePage, this.size, this.sort).subscribe(res => {
      // console.log(res)
      // this.paging
      this.pager.totalPages = res.payload.totalPages;
      this.pages = Array(res.payload.totalPages)
      // console.log(this.pages)
      this.spinner.hide();
      this.data = res.payload.content;
      this.mdbTable.setDataSource(this.data);
      this.data = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, err => {
      this.spinner.hide();
    })
  }
  ngAfterViewInit() {

    // this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }
  searchItems() {
    if (this.searchType == "" || this.searchText == "") {
      return
    }
    this.workFlowService.getSearchDcts(this.activePage, this.size, this.sort, this.searchType, this.searchText).subscribe(res => {
      // console.log(res)
      // this.paging
      this.pager.totalPages = res.payload.totalPages;
      this.pages = Array(res.payload.totalPages)
      // console.log(this.pages)
      this.spinner.hide();
      this.data = res.payload.content;
      this.mdbTable.setDataSource(this.data);
      this.data = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, err => {
      this.spinner.hide();
    })
    // const prev = this.mdbTable.getDataSource();

    // if (!this.searchText) {
    //   this.mdbTable.setDataSource(this.previous);
    //   this.data = this.mdbTable.getDataSource();
    // }

    // if (this.searchText) {
    //   this.data = this.mdbTable.searchLocalDataBy(this.searchText);
    //   this.mdbTable.setDataSource(prev);
    // }

    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();

    // this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
    //   this.mdbTablePagination.calculateFirstItemIndex();
    //   this.mdbTablePagination.calculateLastItemIndex();
    // });

  }
  addWorkFlow() {
    this.router.navigate(['admin/dct/add'])
  }
  edit(el) {
    this.router.navigate(['admin/dct/edit/' + el.dctID])
  }
  delete(el) {
    this.workFlowService.deleteDctById(el.dctID).subscribe(res => {
      this.getDctsAll()
    })
  }
  setPage(page: number) {
    console.log(page)
    this.activePage = page;
    this.getDctsAll()
  }
  sortBy(head) {
    if (head.name == 'action') {
      return
    }
    if(head.sort){
      this.sort = head.name;
      this.getDctsAll()
    }
    

  }
}
