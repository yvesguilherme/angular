import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httClient: HttpClient) {
  }

  loadAllCourses(): Observable<Course[]> {
    return this.httClient
      .get<Course[]>('/api/courses')
      .pipe(
        map(res => res['payload']),
        shareReplay()
      );
  }
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    console.log(`Changes: `, changes);

    return this.httClient
      .put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.httClient.get<Lesson[]>(`/api/lessons`, {
      params: {
        filter: search,
        pageSize: 100,
      }
    })
      .pipe(
        map(response => response['payload']),
        shareReplay()
      );
  }
}
