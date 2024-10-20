import { Component } from '@angular/core';
import { post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  ngOnInit(): void {
    
  }
  storedPosts: post[] =[];

  items = ['item1', 'item2', 'item3', 'item4'];

  onPostAdded(post: any) {
    this.storedPosts.push(post);
    console.log(this.storedPosts);
  }
  // onPostAdded(post : string)
  // {
  //   this.storedPosts.push(post);
  // }
  
}
