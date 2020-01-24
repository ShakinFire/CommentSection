import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSectionComponent } from './comment-section.component';
import { CommentService } from './comment.service';
import { ConvertTimeFormatPipe } from './convert-time-format.pipe';


@NgModule({
  declarations: [CommentSectionComponent, ConvertTimeFormatPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    CommentSectionComponent,
    ConvertTimeFormatPipe,
  ],
  providers: [
    CommentService,
  ]
})
export class CommentSectionModule { }
