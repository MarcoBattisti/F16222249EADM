import {CardChart} from './card-chart';

export class LineChart {

  name: string;
  series: CardChart[];

  constructor(name: string, series: CardChart[]) {
    this.name = name;
    this.series = series;
  }
}
