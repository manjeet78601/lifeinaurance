import { Component, OnInit } from '@angular/core';
import { AppointmentsConstant, } from '../../../properties/appointments.constant';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {

  DOM_CONSTANTS = AppointmentsConstant.APPT;
  BTN = AppointmentsConstant.BTN;
  schdData: any;
  schHeader: string;
  clinicData: any;
  clinicHeader: string;
  noApptClinic: boolean;
  noApptLab: boolean;
  schApptLab: boolean;
  isUerLoggedIn: boolean;
  constructor(private router: Router, private apptService: AppointmentsService, private userService: UserService) { }
  ngOnInit() { }

  ionViewDidEnter() {
    this.noApptClinic = false;
    this.noApptLab = false;
    this.schApptLab = false;
    this.DOM_CONSTANTS = AppointmentsConstant.APPT;
    this.schHeader = AppointmentsConstant.APPT.SCHD_HEADER;
    this.clinicHeader = AppointmentsConstant.APPT.CLINIC_SCHD_HEADER;
    this.schdData = this.getScheduleDetails();
    this.clinicData = this.getClinicDetails();
  }
  goToReScheduleLab() {
    this.apptService.apptDetails = {};
    this.getScheduleDetails();
    this.router.navigate(['/medical-test']);
  }

  goToHealthPage() {
    this.getScheduleDetails();
    if (this.userService.getQuotesCompleted() === true) {
      this.router.navigate(['/medical-test']);
    } else {
      this.router.navigate(['/home/health']);
    }
  }
  // Get Scheduled Appts
  getScheduleDetails() {
    this.schdData = this.apptService.getApptScheduleDetails();
    if (Object.keys(this.schdData).length === 0) {
      this.noApptLab = false;
      this.schApptLab = true;
      AppointmentsConstant.APPT.SCHD_HEADER = this.schHeader;
      AppointmentsConstant.APPT.SCH_DETAILS = '';
      console.log('AppointmentsConstant.APPT.SCHD_HEADER', AppointmentsConstant.APPT.SCHD_HEADER);
    } else {
      this.noApptLab = true;
      this.schApptLab = false;
      AppointmentsConstant.APPT.SCHD_HEADER = this.schdData.location;
      AppointmentsConstant.APPT.SCH_DETAILS = AppointmentsConstant.APPT.SCH_DETAILS_BOOKED + this.schdData.location + ' for '
        + this.schdData.date + ' at ' + this.schdData.time;
    }
  }
  // Get Scheduled Clinic details
  getClinicDetails() {
    this.clinicData = this.apptService.getClinicSchedule();
    if (Object.keys(this.clinicData).length > 0) {
      this.noApptClinic = true;
      AppointmentsConstant.APPT.CLINIC_SCHD_HEADER = this.clinicData.location;
      AppointmentsConstant.APPT.CLINIC_SCHD_DETAILS_BL = AppointmentsConstant.APPT.CLINIC_SCHD_DETAILS +
        this.clinicData.date + ' at ' + this.clinicData.time + ' at ' + this.clinicData.location;
    } else {
      this.noApptClinic = false;
      AppointmentsConstant.APPT.CLINIC_SCHD_HEADER = this.clinicHeader;
      AppointmentsConstant.APPT.CLINIC_SCHD_DETAILS_BL = '';
    }
  }

  // Reschedule Clinic appt
  goToRescheduleClinic() {
    this.apptService.clinicDetails = {};
    this.getClinicDetails();
    this.router.navigate(['/medical-test/locate-clinic']);
  }
  // cancelling Clinic Appt
  cancelClinicAppt() {
    this.apptService.clinicDetails = {};
    this.getClinicDetails();
  }
  // cancelling Lab Appt
  cancelLabAppt() {
    this.apptService.apptDetails = {};
    this.getScheduleDetails();
  }

  gotoHomePage() {
    this.router.navigate(['/home']);
  }
}

