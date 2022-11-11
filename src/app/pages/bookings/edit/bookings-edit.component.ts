import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Booking, BookingsService} from "../services/bookings.service";

@Component({
  selector: 'app-bookings-edit-popup',
  providers: [BookingsService],
  templateUrl: 'bookings-edit.component.html'
})

export class BookingsEditComponent {
  booking: Booking;
  editMode: 'create' | 'update';
  popupVisible = false;
  cinema = [{code: '1', text: 'CGV'}, {code: '2', text: 'MEGABOX'}, {code: '3', text: '롯데시네마'}];
  persons = [{code: '1', text: '1명'}, {code: '2', text: '2명'}, {code: '3', text: '3명'}, {code: '4', text: '4명'}, {code: '5', text: '5명'}];
  movieId = [{code: 1, text: '블랙팬서-와칸다 포에버'}, {code: 2, text: '동감'}, {code: 3, text: '데시벨'}, {code: 4, text: '폴-600미터'}, {code: 5, text: '자백'}, {code: 6, text: '고속도로 가족'}, {code: 7, text: '리멤버'}];

  @Output() onSaved = new EventEmitter<Booking>();
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;
  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private bookingsService: BookingsService) {
  }

  open(editMode: 'create' | 'update', bookingId?: number) {
    this.editMode = editMode;

    if (this.isUpdateMode()) {
      this.bookingsService.find(bookingId).subscribe({
        next: (v) => {
          this.booking = v;
          this.popupVisible = true;
        },
        error: (e) => {
          console.log(e);
          notify('예매 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.booking = {} as Booking;
      this.popupVisible = true;
    }

  }

  close() {
    this.popupVisible = false;
  }

  isCreateMode() {
    return this.editMode === 'create';
  }

  isUpdateMode() {
    return this.editMode === 'update';
  }

  /** Popup Button Events */
  save = (e) => {
    const result = this.validationGroup.instance.validate();
    if (!result.isValid) {
      return;
    }

    this.popupVisible = false;
    if (this.isCreateMode()) {
      this.bookingsService.create(this.booking).subscribe({
        next: (v) => {
          notify('예매 생성이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('예매 생성에 실패하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.bookingsService.update(this.booking.bookingId, this.booking).subscribe({
        next: (v) => {
          notify('예매 변경이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('예매 변경에 실패하였습니다.', 'error', 3000);
        }
      });
    }
  }

  cancel = () => {
    this.popupVisible = false;
  }

}
