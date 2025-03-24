import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  file: File | null = null;
  uploading: boolean = false;

  private apiUrl = 'http://localhost:8095/api/v1/em-pr/upload-file';
  private apiKey = '475b94ce-8afc-4dd8-a6c1-b84accbbdd0a';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.file) {
      this.toastr.warning('Please select a file first!', 'Warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    this.uploading = true;

    this.http.post(this.apiUrl, formData, {headers}).subscribe({
      next: (res) => {
        console.log("RESPONSE", res);
        this.uploading = false;
        this.toastr.success('File uploaded successfully!', 'Success');
      },
      error: (err) => {
        this.uploading = false;
        this.toastr.error('File upload failed!', 'Error');
      }
    });
  }

  ngOnInit(): void {
  }
}
