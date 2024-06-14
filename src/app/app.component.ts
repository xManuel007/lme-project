import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardPostComponent } from './card-post/card-post.component';
import { PostService } from './post.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardPostComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'lme-app';
  posts: any[] = []
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: [1, Validators.required],
    })
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data
    })
  }

  createNewPost() {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).subscribe((response) => {
        console.log(response);
        this.posts.push(response);
        this.postForm.reset({ userId: 1 })
      });
    }
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      console.log(`Post with ID ${postId} deleted`);
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }

  updatePost(updatedPost: any) {
    this.postService.updatePost(updatedPost.id, updatedPost).subscribe((response) => {
      console.log(response);
      const index = this.posts.findIndex(post => post.id === response.id);
      if (index !== -1) {
        this.posts[index] = response;
      }
    });
  }
}
