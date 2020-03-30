import { Component, OnInit } from '@angular/core';
import { HomeConstants } from './../home.constants';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-total-budget-calculator',
  templateUrl: './total-budget-calculator.component.html',
  styleUrls: ['./total-budget-calculator.component.scss'],
})
export class TotalBudgetCalculatorComponent implements OnInit {
  DOM_CONSTANTS = HomeConstants.BUDGET_CALCULATOR;
  BTN = HomeConstants.BTN;
  amountLeft = 1000;
  totals: any[];

  constructor(
    private router: Router,
    private navigationService: MenuService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getTotals();

  }

  getAmountLeft() {
    return (this.totals[0].TOTAL - this.totals[3].TOTAL)
  }

  getTotals() {
    this.totals = this.userService.getCalculatedBudget();
    //this.totals.map(res => res.AMOUNT = 450);
    this.amountLeft = this.getAmountLeft();
  }

  getQuote() {
    this.navigationService.setCompletedMenu('Financial Budget');
    this.router.navigate(['/home/chooseplan']);
  }

}