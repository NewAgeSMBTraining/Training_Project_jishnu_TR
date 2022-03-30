import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsManagementListComponent } from './cms-management-list.component';

describe('CmsManagementListComponent', () => {
  let component: CmsManagementListComponent;
  let fixture: ComponentFixture<CmsManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsManagementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
