import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShiftPage } from './shift.page';

describe('ShiftPage', () => {
  let component: ShiftPage;
  let fixture: ComponentFixture<ShiftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
