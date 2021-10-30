import { Tranche3Service } from './../../Services/tranche3.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tranche3',
  templateUrl: './tranche3.component.html',
  styleUrls: ['./tranche3.component.scss']
})
export class Tranche3Component implements OnInit {

  tranche: any = "3";
  quarter: any = "4";
  year: any = "2021";
  tt: any = 2;
  reportType:any="cleared"
  quarters = [];
  data: any = [];
  isMaker:boolean;
  isChecker:boolean;
  rf:boolean;
  status=[
    {id:0, status:"pending"},
    {id:1, status:"rejected"},
    {id:2, status:"submitted"}
  ];
  selectedStatus:any;


  constructor( private route:ActivatedRoute,
               private spinnerService:NgxSpinnerService,
               private tranche3Service:Tranche3Service ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      if(params["tab"]=='pending'){
        this.getMaker();
      }
      else if(params["tab"]=='rejected'){
       this.getRejected();
      }
      else if (params["tab"]=='submitted'){
        this.getSubmitted();
      }
     })
  }

  getMaker(){
    this.spinnerService.show();
    this.tranche3Service.getMaker(
      this.quarter,
      this.rf=false,
      this.tt,
      this.year
    ).subscribe((res)=>{
      this.spinnerService.hide();
      console.log(res);
      this.isMaker=true;
    })
  }

  getChecker(){
    this.spinnerService.show();
    this.tranche3Service.getChecker(
      this.quarter,
      this.tt,
      this.year
    ).subscribe((res)=>{
      this.spinnerService.hide();
      console.log(res);
    })
  }

  getRejected(){
    this.spinnerService.show();
    this.tranche3Service.getRejected(
      this.quarter,
      this.rf=true,
      this.tt,
      this.year
    ).subscribe((res)=>{
      console.log(res);
    })
  }

  getSubmitted(){

  }

}
