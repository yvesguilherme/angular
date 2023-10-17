import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';

import { Course } from "../model/course";
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
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
    private coursesStore: CoursesStore,
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

    this.coursesStore.saveCourse(this.course.id, changes)
      // .pipe(
      //   catchError(error => {
      //     const message = `Could not save course: ${error.error}`;
      //     console.log(message);
      //     this.messagesService.showErrors(message);
      //     return throwError(error);
      //   })
      // )
      .subscribe();

    this.dialogRef.close(changes);

    // this.loadingService.showLoaderUntilCompleted(saveCourse$)
    //   .subscribe(
    //     val => {
    //       this.dialogRef.close(val);
    //     }
    //   );
  }

  close() {
    this.dialogRef.close();
  }

}
