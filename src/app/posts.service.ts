import { Title } from '@angular/platform-browser';

import { Injectable } from '@angular/core';
import { post } from './post/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn : 'root'}) 
export class PostsService{
   public posts: post [] =[];
   private postsUpdated = new Subject<post[]>();

constructor(private http:HttpClient){};

   getPosts()
   {
     this.http.get<{id :null,message : string,posts: post[]}>('http://localhost:3000/api/posts').subscribe((data)=>{
this.posts = data.posts;
this.postsUpdated.next([...this.posts]);
     });
   }


getPostUpdateListener(){
   return this.postsUpdated.asObservable();
}

getPost(id: string)
{
   return this.http.get<{_id: string, Title: string, content : string}>("http://localhost:3000/api/posts"+id);
}

updatePost(id: string, title: string, content : string)
{
const post : post = {id : id, title: title, content: content};
this.http.put("http://localhost:3000/api/posts" +id, post).subscribe(response => 
   {console.log(response)
 const updatedPosts = [...this.posts];
 const oldPostIndex = updatedPosts.findIndex(p=> p.id === post.id);
 updatedPosts[oldPostIndex] = post;
 this.posts = updatedPosts;
 this.postsUpdated.next([...this.posts]);  
});
}

   addPost(title: string, content : string)
   {
const post : post ={id: '',
   title: title, content: content,
   
};
this.http.post<{message: String}>("http://localhost:3000/api/posts",post).subscribe(data=>{
console.log(data.message);
this.posts.push(post);
this.postsUpdated.next([...this.posts]);
 })
   }
}