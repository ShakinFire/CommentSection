import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
const uuidv1 = require('uuid/v1');

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  public commentFormControl: FormControl;
  public comments: any[] = [];
  public editedCommentId: string;
  public isEditing = false;
  private readonly componentDestroyed$: Subject<any> = new Subject<void>();

  constructor(
  ) { }

  public ngOnInit() {
    const commentsFromStorage = JSON.parse(localStorage.getItem('comments'));
    if (commentsFromStorage) {
        commentsFromStorage.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
        this.comments = [...commentsFromStorage];
    }
    this.commentFormControl = new FormControl('', [Validators.max(200)]);
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public handleAddComment(): void {
    if (this.isEditing) {
        return;
    }

    if (this.commentFormControl.value && this.commentFormControl.value.trim() !== '') {
        this.comments.push(
          {
            id: uuidv1(),
            content: this.commentFormControl.value.trim(),
            createdAt: new Date(),
            username: 'anonymous',
          },
        );

        const commentsFromStorage = JSON.parse(localStorage.getItem('comments'));

        const commentsToPutInStorage = commentsFromStorage ?
            [...commentsFromStorage, {
                content: this.commentFormControl.value.trim(),
                createdAt: new Date(),
                username: 'anonymous',
            }] :
            this.comments;

        localStorage.setItem('comments', JSON.stringify(commentsToPutInStorage));

        this.commentFormControl.reset();
    }
  }

  public handleBeginEdit(comment: any): void {
    this.isEditing = true;
    this.editedCommentId = comment.id;
    this.commentFormControl.setValue(comment.content);
  }

  public handleEditComment(): void {
    if (this.commentFormControl.value && this.commentFormControl.value.trim() !== '') {
        this.comments = this.comments.map((comment) => {
            if (comment.id === this.editedCommentId) {
                comment.content = this.commentFormControl.value.trim();
                return comment;
            }
            return comment;
        });

        localStorage.setItem('comments', JSON.stringify(this.comments));
        this.commentFormControl.reset();
        this.isEditing = false;
    }
  }

  public handleDeleteComment(index: number): void {
    this.comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }
}
