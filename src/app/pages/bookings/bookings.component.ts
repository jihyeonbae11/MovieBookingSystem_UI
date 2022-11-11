import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {Booking, BookingsService} from "./services/bookings.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {BookingsEditComponent} from "./edit/bookings-edit.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-bookings',
  providers: [BookingsService, PageableService],
  templateUrl: 'bookings.component.html'
})

export class BookingsComponent {

  bookings: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(BookingsEditComponent, {static: false}) editPopup: BookingsEditComponent;

  constructor(private bookingsService: BookingsService,
              private pageableService: PageableService) {
    this.bookings = new DataSource({
      store: new CustomStore({
        key: 'bookingId',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.bookingsService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedBookingId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.bookings.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedBookingId());
  }

  delete() {
    const result = confirm('<i>예매를 삭제하시겠습니까?</i>', '예매 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.bookingsService.delete(this.getSelectedBookingId()).subscribe({
          next: (v) => {
            notify('예매 삭제가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('예매 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(booking: Booking) {
    this.search();
  }

}
