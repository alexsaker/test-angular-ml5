import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnInit,
    OnDestroy,
} from '@angular/core';
import * as ml5 from 'ml5';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    ngOnInit() {}
    ngOnDestroy() {}
}
