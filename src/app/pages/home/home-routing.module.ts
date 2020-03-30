import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { InsuranceCalculatorComponent } from './insurance-calculator/insurance-calculator.component';
import { LandingComponent } from './landing/landing.component';
import { FinancialBudgetComponent } from './financial-budget/financial-budget.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { HealthQuestionsComponent } from './health-questions/health-questions.component';
import { TotalBudgetCalculatorComponent } from './total-budget-calculator/total-budget-calculator.component';
import { QuoteComponent } from './quote/quote.component';
import { FacialScanComponent } from './facial-scan/facial-scan.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'insurance-calculator',
    component: InsuranceCalculatorComponent
  },
  {
    path: 'budget',
    component: FinancialBudgetComponent
  },
  {
    path: 'chooseplan',
    component: ChoosePlanComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'total-budget',
    component: TotalBudgetCalculatorComponent
  },
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'health',
    component: HealthQuestionsComponent
  },
  {
    path: 'quote',
    component: QuoteComponent
  },
  {
    path: 'facial-scan',
    component: FacialScanComponent
  },
  {
    path: 'compliance',
    component: ComplianceComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
