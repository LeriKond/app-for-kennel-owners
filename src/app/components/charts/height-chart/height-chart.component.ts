import {Component, Input} from '@angular/core';
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-height-chart',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './height-chart.component.html',
  styleUrl: './height-chart.component.scss'
})
export class HeightChartComponent {
    @Input() chartData;
    @Input() chartOptions;

}
