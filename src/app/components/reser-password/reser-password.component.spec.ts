import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserPasswordComponent } from './reser-password.component';

describe('ReserPasswordComponent', () => {
  let component: ReserPasswordComponent;
  let fixture: ComponentFixture<ReserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
