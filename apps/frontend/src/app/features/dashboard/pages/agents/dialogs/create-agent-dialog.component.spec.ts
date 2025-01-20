import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAgentDialogComponent } from './create-agent-dialog.component';

describe('CreateAgentDialogComponent', () => {
  let component: CreateAgentDialogComponent;
  let fixture: ComponentFixture<CreateAgentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAgentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAgentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
