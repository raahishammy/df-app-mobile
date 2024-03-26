import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryResourcesPage } from './memory-resources.page';

describe('MemoryResourcesPage', () => {
  let component: MemoryResourcesPage;
  let fixture: ComponentFixture<MemoryResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
