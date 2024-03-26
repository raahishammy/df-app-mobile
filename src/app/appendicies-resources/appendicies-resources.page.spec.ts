import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppendiciesResourcesPage } from './appendicies-resources.page';

describe('AppendiciesResourcesPage', () => {
  let component: AppendiciesResourcesPage;
  let fixture: ComponentFixture<AppendiciesResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendiciesResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppendiciesResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
