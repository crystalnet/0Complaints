import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {Task} from '../../model/task';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should resolve the promise when creating a task', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task = new Task();
    service.createTask(task).then(values => {
      expect(values).toBe(true);
    });
  });

  it('should return the available tasks as observable',
      (done: DoneFn) => {
        const service: TaskService = TestBed.get(TaskService);
        service.getAllTasks().subscribe(value => {
          expect(value).toBeInstanceOf(Array);
          done();
        });
      });
});
