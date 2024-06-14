import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent {
  @Input() userId!: string;
  @Input() postId!: number;
  @Input() title!: string;
  @Input() body!: string;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<any>();

  showComments = false;
  showEditForm = false;
  comments: any[] = [];
  editForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: [''],
      body: ['']
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
    if (this.showComments && this.comments.length === 0) {
      this.postService.getComments(this.postId).subscribe((data) => {
        this.comments = data;
      });
    }
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
    this.editForm.patchValue({
      title: this.title,
      body: this.body
    });
  }

  onUpdate() {
    if (this.editForm.valid) {
      const updatedPost = {
        title: this.editForm.value.title,
        body: this.editForm.value.body,
        userId: this.userId,
        id: this.postId
      };
      this.update.emit(updatedPost);
      this.toggleEditForm();
    }
  }

  onDelete() {
    this.delete.emit(this.postId);
  }
}
