import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {BookingList, BookingListService} from "../services/bookingList.service";

@Component({
  selector: 'bookingList-edit-popup',
  providers: [BookingListService],
  templateUrl: 'bookingList-edit.component.html'
})

export class BookingListEditComponent {
  bookingList: BookingList;
  editMode: 'create' | 'update';
  popupVisible = false;
  movies = [{code: '1', text: '정직한 후보2'}, {code: '2', text: '동감'}, {code: '3', text: '블랙팬서-와칸다 포에버'},
            {code: '4', text: 'Ensemble Stars'}, {code: '5', text: '데시벨'}];
  cinemas = [{code: '1', text: 'CGV'}, {code: '2', text: 'MEGABOX'}, {code: '3', text: '롯데시네마'}];
  persons = [{code: '1', text: '1명'}, {code: '2', text: '2명'}, {code: '3', text: '3명'}];

  @Output() onSaved = new EventEmitter<BookingList>();

  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;

  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private bookingListService: BookingListService) {
  }

  open(editMode: 'create' | 'update', bookingNumber?: number) {
    this.editMode = editMode;

    if (this.isUpdateMode()) {
      this.bookingListService.find(this.bookingList.userId).subscribe({
        next: (v) => {
          this.bookingList = v;
          this.popupVisible = true;
        },
        error: (e) => {
          console.log(e);
          notify('예매 오류가 발생하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.bookingList = {} as BookingList;
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
      this.bookingListService.create(this.bookingList).subscribe({
        next: (v) => {
          notify('예매가 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('예매에 실패하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.bookingListService.update(this.bookingList.bookingId, this.bookingList).subscribe({
        next: (v) => {
          notify('예매내역 변경이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('예매내역 변경에 실패하였습니다.', 'error', 3000);
        }
      });
    }
  }

  cancel = () => {
    this.popupVisible = false;
  }

}
