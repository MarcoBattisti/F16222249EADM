import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {StatsService} from './services/stats.service';
import {CardChart} from './models/card-chart';
import {startWith, switchMap} from 'rxjs/operators';
import {interval} from 'rxjs';
import {LineChart} from './models/line-chart';

@Component({
  selector: 'app-private-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  env = this.appComponent.env;

  // Card chart users online
  usersOnline;

  // Card chart time average
  timeAverage;

  // options
  color = '#000';
  bandColor = '#A10A28';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Line chart settings
  lineChartValues: LineChart[];

  showYAxis = true;
  showYAxisLabel = true;
  yAxisLabel = 'Visite';
  showXAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Giorni';
  gradient = true;
  showLegend = false;

  pagesData;

  constructor(private statsService: StatsService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.getVisitors();
    this.getVisitorsOnline();
    this.getTimeAverage();
    this.getMostVisitedPages();
  }

  getVisitorsOnline() {
    interval(300000)
      .pipe(
        startWith(0),
        switchMap(() => this.statsService.getVisitorsOnline(this.env.apiUrl))
      )
      .subscribe(
        data => {
          const cardChart = new CardChart('', data[0].users);
          this.usersOnline = [cardChart];
        },
        err => console.error(err)
      );
  }

  getTimeAverage() {

   interval(300000)
      .pipe(
        startWith(0),
        switchMap(() => this.statsService.getTimeAverage(this.env.apiUrl))
      )
      .subscribe(
        data => {
          const cardChart = new CardChart('', data[0].average);
          this.timeAverage = [cardChart];
        },
        err => console.error(err)
      );
  }

  getVisitors() {
    this.statsService.getVisitors(this.env.apiUrl).subscribe(
      data => {
        const lineChart = new LineChart('Visite', []);
        data.forEach(dt =>
          lineChart.series.push(
            new CardChart(this.convertIsoToDate(dt.date), dt.visitors)
          )
        );
        this.lineChartValues = [lineChart];
      }
    );
  }

  convertIsoToDate(isoDate: string) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return day + '/' + month + '/' + year;
  }

  getMostVisitedPages() {
    this.statsService.getMostVisitedPages(this.env.apiUrl)
      .subscribe(data => this.pagesData = data);
  }

  onSelect(event) {
    console.log(event);
  }

}
