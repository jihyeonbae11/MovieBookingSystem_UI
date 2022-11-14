import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import {UserService} from "./services/user.service";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-user',
  providers: [UserService, PageableService],
  templateUrl: 'user.component.html'
})

export class UserComponent {

  users: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  constructor(private userService: UserService,
              private pageableService: PageableService) {
    this.users = new DataSource({
      store: new CustomStore( {
        key: 'userId',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.userService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  /** Grid Toolbar Button Events */
  search() {
    this.users.reload();
  }

}

