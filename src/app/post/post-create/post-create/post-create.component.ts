import { Title } from '@angular/platform-browser';
// import { post } from './../../post.model';
import { PostsService } from './../../../posts.service';
import { Component , EventEmitter,OnInit,Output} from '@angular/core';
// import { Post } from '../../post.model';
import { Form, FormControl, FormGroup, NgForm , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { post } from '../../post.model';
import { HttpClient } from '@angular/common/http';
import { title } from 'process';
// import { post } from './post/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
// newPost = 'Hello';
// enteredValue = '';
enteredTitle ="";
enteredContent ="";
private mode = 'create';
 postId : any;
 fileName = '';
 form!: FormGroup;
 imagePreview : any;
posts: post = {id : '', title: '', content: ''};

// @Output()  postCreated = new EventEmitter();
constructor(public PostsService: PostsService, public route: ActivatedRoute,private http: HttpClient){}

ngOnInit(): void {
this.form = new FormGroup(
  {
'title' : new FormControl(null,{validators: [Validators.required,Validators.minLength(3)]}),
'content': new FormControl(null,{validators: [Validators.required,Validators.minLength(3)]}),
'image': new FormControl(null,{validators: [Validators.required]})
  });

  this.route.paramMap.subscribe((paramMap : ParamMap) =>{
    if(paramMap.has('postId'))
    {
this.mode = 'edit';
this.postId = paramMap.get('postId');
      this.PostsService.getPost(this.postId).subscribe(postData =>{
        this.posts ={id: postData._id,title:postData.Title,content: postData.content};
        this.form.setValue({
          title: this.posts.title,
          content: this.posts.content
        })
      });
    }

  else{
    this.mode = 'create';
    this.postId = null;
  }
  })
} 

onSavePost()
{
if(this.form.invalid)
{
return;
}

  // let post : post ={
  //   title : postForm.value.enteredTitle,
  //   content: postForm.value.enteredContent
  // };
  // console.log(post);
  if(this.mode === 'create')
  {
this.PostsService.addPost(this.form.value.enteredTitle,this.form.value.enteredContent);
} else{
  this.PostsService.updatePost(this.postId,this.form.value.enteredTitle, this.form.value.enteredContent);
}
this.form.reset();
}

onImagePicked(event :any)
{
  const file = event.target.files[0]; 
this.form.patchValue({image : file});
this.form.get('image')?.updateValueAndValidity();
console.log(file);
console.log(this.form);
const reader = new FileReader();
reader.onload = () => 
{
this.imagePreview = reader.result;
};
reader.readAsDataURL(file);
//   if (file) {

//       this.fileName = file.name;

//       const formData = new FormData();

//       formData.append("thumbnail", file);

//       const upload$ = this.http.post("/api/thumbnail-upload", formData);

//       upload$.subscribe();
// }
}

}
