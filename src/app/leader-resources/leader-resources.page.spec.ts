import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaderResourcesPage } from './leader-resources.page';

describe('LeaderResourcesPage', () => {
  let component: LeaderResourcesPage;
  let fixture: ComponentFixture<LeaderResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
