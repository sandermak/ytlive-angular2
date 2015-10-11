/// <reference path="../typings/tsd.d.ts" />

import {Component, View, bootstrap, NgFor, Query} from 'angular2/angular2';
import ConcertService from './ConcertService';

class ElemService {
  names = ["foo", "bar", "baz!"];
}

// Annotation section
@Component({
  selector: 'my-app',
  viewBindings: [ElemService, ConcertService]
})
@View({
  template: `
    <h1>Hello {{ name }}</h1>
    <p>elems</p>
    <ul>
      <li *ng-for="#name of names"> {{ name }} </li>
    </ul>
    `,
    directives: [NgFor]
})
// Component controller
class MyAppComponent {
  name: string;
  names: String[]

  constructor(elemService: ElemService, concertService: ConcertService) {
    this.name = 'Alice';
    this.names = elemService.names;
    this.names.push(concertService.concert);
  }
}

bootstrap(MyAppComponent);
