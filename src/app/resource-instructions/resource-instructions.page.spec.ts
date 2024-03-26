import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResourceInstructionsPage } from './resource-instructions.page';

describe('ResourceInstructionsPage', () => {
  let component: ResourceInstructionsPage;
  let fixture: ComponentFixture<ResourceInstructionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInstructionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceInstructionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
