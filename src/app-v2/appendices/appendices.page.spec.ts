import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppendicesPage } from './appendices.page';

describe('AppendicesPage', () => {
  let component: AppendicesPage;
  let fixture: ComponentFixture<AppendicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppendicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
