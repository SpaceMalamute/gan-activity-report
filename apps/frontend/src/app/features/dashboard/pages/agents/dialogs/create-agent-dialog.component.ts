import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAgent } from '../../../../../core/models/agent.model';

const imports = [
  MatDialogModule,
  MatFormFieldModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
];

@Component({
  selector: 'app-create-agent-dialog',
  imports: [...imports],
  templateUrl: './create-agent-dialog.component.html',
  styleUrl: './create-agent-dialog.component.scss',
})
export class CreateAgentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateAgentDialogComponent>);
  readonly data = inject<CreateAgent>(MAT_DIALOG_DATA);
  readonly agent = model(this.data);

  onNoClick(): void {
    this.agent.set({ name: '', email: '' });
    this.dialogRef.close();
  }
}
