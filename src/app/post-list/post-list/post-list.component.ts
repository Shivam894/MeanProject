import { PostsService } from './../../posts.service';
import { Component,Input , OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { post } from '../../post/post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

// posts =[
//   {title: "First Post", content: "This is first item"},
//   {title: "Second Post", content: "This is second item"},
//   {title:"third Post", content:"this is third item"}
// ]

// @Input() posts : post[] =[];
posts: post[] = [];
  private postsSub: Subscription = new Subscription;
constructor (public PostsService : PostsService){}

ngOnInit(): void {
   this.PostsService.getPosts();
  this.PostsService.getPostUpdateListener().subscribe((posts: post[]) =>{
this.posts = posts;
  });
}

ngOnDestroy(): void {
  this.postsSub.unsubscribe();
}
}
