import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie.model';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {
  series: Serie[] = [];
  selectedSerie?: Serie;
  averageSeasons: number = 0;

  constructor(private serieService: SerieService) {}

  ngOnInit(): void {
    this.getSeries();
  }

  getSeries(): void {
    this.serieService.getSeries().subscribe(series => {
      this.series = series;
      this.calculateAverage();
    });
  }

  onSelect(serie: Serie): void {
    this.selectedSerie = serie;
  }

  calculateAverage(): void {
    const totalSeasons = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
    this.averageSeasons = totalSeasons / this.series.length;
  }
}
