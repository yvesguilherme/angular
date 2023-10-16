import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Course } from "../model/course";
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngAfterViewInit() {

  }

  save() {
    const changes = this.form.value;

    const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
      .pipe(
        catchError(error => {
          const message = `Could not save course: ${error.error}`;
          console.log(message);
          this.messagesService.showErrors(message);
          return throwError(error);
        })
      );

    this.loadingService.showLoaderUntilCompleted(saveCourse$)
      .subscribe(
        val => {
          this.dialogRef.close(val);
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

}
