import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroductionResourcesPage } from './introduction-resources.page';

describe('IntroductionResourcesPage', () => {
  let component: IntroductionResourcesPage;
  let fixture: ComponentFixture<IntroductionResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroductionResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
