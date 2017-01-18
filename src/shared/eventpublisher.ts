import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventPublisher {
  // Observable string sources
  private fontSizeChangedSource = new Subject<number>();

  // Observable string streams
  fontSizeChanged$ = this.fontSizeChangedSource.asObservable();

  // Service message commands
  fontSizeChanged(fontSize: number) {
    this.fontSizeChangedSource.next(fontSize);
  }

}
