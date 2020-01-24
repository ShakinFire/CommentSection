import { Pipe, PipeTransform } from '@angular/core';
import { CommentService } from './comment.service';

@Pipe({ name: 'convertTimeFormat' })
export class ConvertTimeFormatPipe implements PipeTransform {
    constructor(private readonly commentService: CommentService) {}

    public transform(createdAtComment: Date): string {
        return this.commentService.convertDateFormat(createdAtComment);
    }
}
