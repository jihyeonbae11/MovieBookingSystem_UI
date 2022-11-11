import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import {MoviesService} from "./services/movies.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-movies',
  providers: [MoviesService, PageableService],
  templateUrl: 'movies.component.html'
})

export class MoviesComponent {

  movies: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  constructor(private movieService: MoviesService,
              private pageableService: PageableService) {
    this.movies = new DataSource({
      store: new CustomStore( {
        key: 'movieId',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.movieService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  // getSelectedMovieId(): number {
  //   return this.grid?.instance.getSelectedRowKeys()[0];
  // }

  // displayCinema(e: any) {
  //   if (e.value === '1') {
  //     return 'CGV';
  //   } else if (e.value === '2') {
  //     return 'MEGABOX';
  //   } else {
  //     return '롯데시네마';
  //   }
  // }

  /** Grid Toolbar Button Events */
  search() {
    this.movies.reload();
  }


  /** Edit Popup Events */
  // onSaved(movies: Movies) {
  //   this.search();
  // }


}

