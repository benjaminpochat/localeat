import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughtersListComponent } from './slaughters-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SlaughterService } from 'src/app/breeder-area/services/slaughter.service';
import { FormBuilder } from '@angular/forms';


describe('SlaughtersListComponent', () => {
  let slaughtersListComponent: SlaughtersListComponent;
  let fixture: ComponentFixture<SlaughtersListComponent>;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SlaughtersListComponent ],
        imports: [HttpClientTestingModule],
        providers: [SlaughterService, FormBuilder]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SlaughtersListComponent);
      slaughtersListComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(slaughtersListComponent).toBeTruthy();
    });
  });
});
