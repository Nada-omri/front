import { Component, OnInit } from '@angular/core';
import { produitService } from './produit.Service';
import { Product } from '../shared/models/product';
import { Category } from '../shared/models/Category';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { API_URLS } from '../config/api.url.config';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { CategoryService } from '../services/category/category.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 50 };
  produits!: Product[];
  categories!:Category[];
  produitForm: FormGroup;
  operation:string='add';
  selectedProduit:Product={name:"",description:"",price:0 ,category: { id: 0, name: "" } };
 
 userFile:any;
 imgURL:any;
 Url:string =API_URLS.IMAGE_URL;
 
 public message !: string;
 public imagePath!:any;

  constructor(private produitService: produitService, private fb: FormBuilder, private route :ActivatedRoute,private fileService:FileService , private categoryService:CategoryService) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      price: '',
      categoryId: ''
    });
  }

  ngOnInit() {
    this.initProduit();
    this.loadProduits();
    this.getCategories();

  }
  
  
  createForm(){
    this.produitForm= this.fb.group({
      name:['',Validators.required],
      description:'',
      price:'',
     brandId:'',
     sellerId:'',
     image:'',
     categoryId:''


    });
  }


  loadProduits() {
    this.produitService.getProduits().subscribe(
      (res :any) => (this.produits = res),
      (error:any) => { console.log('ERROR'); },
      () => { console.log('success'); }
    );
  }

  addData() {
    if (this.produitForm.invalid) {
      // Form is invalid, handle the error or notify the user
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.produitForm.get('name')?.value);
    formData.append('description', this.produitForm.get('description')?.value);
    formData.append('quantity', "2");
    formData.append('image', this.userFile);
    formData.append('price', this.produitForm.get('price')?.value);
    formData.append('brandId', "1");
    formData.append('categoryId', this.produitForm.get('categoryId')?.value);
  
    this.produitService.createData(formData).subscribe(
      (httpEvent: any) => {
        this.resportProgress(httpEvent); // Handle progress events
        if (httpEvent.type === HttpEventType.Response) {
          
          this.initProduit();
          this.loadProduits();
        }
      },
      error => {
        console.log('Error occurred while creating data:', error);
      }
    );
  }
  private resportProgress(httpEvent: any): void {
  switch (httpEvent.type) {
    case HttpEventType.UploadProgress:
      // You can update the UI here to show the upload progress
      const progress = Math.round((httpEvent.loaded / httpEvent.total!) * 100);
      console.log(`Uploading... ${progress}%`);
      break;
    case HttpEventType.DownloadProgress:
      // You can update the UI here to show the download progress
      const downloadProgress = Math.round((httpEvent.loaded / httpEvent.total!) * 100);
      console.log(`Downloading... ${downloadProgress}%`);
      break;
    case HttpEventType.ResponseHeader:
      console.log('Header returned', httpEvent);
      break;
    case HttpEventType.Response:
      if (httpEvent.body instanceof Blob) {
        // Handle the downloaded file response here (if needed)
        saveAs(new Blob([httpEvent.body], { type: 'application/octet-stream' }), 'filename.extension');
      } else {
        // Handle other response types (if needed)
      }
      this.fileStatus.status = 'done';
      break;
    default:
      console.log(httpEvent);
      break;
  }
}

  
  
  getCategories() {
    this.categoryService.getAllcategory().subscribe({
      next: (res: any) => {
        this.categories = res;
        console.log('success');
      },
      error: (error: any) => {
        console.log('ERROR');
      }
    });
  }
  

  updateProduit(){
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res=>{
        this.initProduit()
        this.loadProduits();
      }
    );
  }
  deleteProduit() {
    if (this.selectedProduit && this.selectedProduit.id !== undefined) {
      this.produitService.deleteProduit(this.selectedProduit.id).subscribe(
        res => {
          this.selectedProduit = {
        
        
        }
          this.loadProduits();
        }
      );
    } else {
      console.log('Error: The selected product does not have a valid ID.');
    }
  }
  
  initProduit(){

    this.createForm();
  }
  onSelectFile(event:any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }
    
    
  }
  /*onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData).subscribe(
      event =>{
        console.log(event);
        this.resportProgress(event);
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }

    );
}  
onDownloadFile(filename: string): void {
  this.fileService.download(filename).subscribe(
    event => {
      console.log(event);
      this.resportProgress(event);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
}


private resportProgress(httpEvent: any): void {
  switch (httpEvent.type) {
    case HttpEventType.UploadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
      break;
    case HttpEventType.DownloadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
      break;
    case HttpEventType.ResponseHeader:
      console.log('Header returned', httpEvent);
      break;
    case HttpEventType.Response:
      if (httpEvent.body instanceof Blob) {
        // Handle the downloaded file response here (if needed)
        saveAs(new Blob([httpEvent.body], { type: 'application/octet-stream' }), 'filename.extension');
      } else {
        // Handle other response types (if needed)
      }
      this.fileStatus.status = 'done';
      break;
    default:
      console.log(httpEvent);
      break;
  }
}



private updateStatus(loaded: number, total: number, requestType: string): void {
  this.fileStatus.status = 'progress';
  this.fileStatus.requestType = requestType;
  this.fileStatus.percent = Math.round(100 * loaded / total);
}}*/