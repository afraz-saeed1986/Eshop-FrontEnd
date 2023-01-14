import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedAccountComponent } from './activated-account.component';

describe('ActivatedAccountComponent', () => {
  let component: ActivatedAccountComponent;
  let fixture: ComponentFixture<ActivatedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatedAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
