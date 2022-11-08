import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import {BookingList, BookingListService} from "./services/bookingList.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {BookingListEditComponent} from "./edit/bookingList-edit.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-reserveList',
  providers: [BookingListService, PageableService],
  templateUrl: './bookingList.component.html'
})

export class BookingListComponent {

  bookingList: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(BookingListEditComponent, {static: false}) editPopup: BookingListEditComponent;

  constructor(private bookingListService: BookingListService,
              private pageableService: PageableService) {
    this.bookingList = new DataSource({
      store: new CustomStore( {
        key: 'bookingNumber',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.bookingListService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }


  getSelectedBookingId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  displayCinema(e: any) {
    if (e.value === '1') {
      return 'CGV';
    } else if (e.value === '2') {
      return 'MegaBox';
    } else {
      return '롯데시네마';
    }
  }

  /** Grid Toolbar Button Events */
  search() {
    this.bookingList.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedBookingId());
  }

  delete() {
    const result = confirm('<i>정말로 해당 직원를 삭제하시겠습니까?</i>', '직원 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.bookingListService.delete(this.getSelectedBookingId()).subscribe({
          next: (v) => {
            notify('직원 삭제가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('직원 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(employee: BookingList) {
    this.search();
  }


}

