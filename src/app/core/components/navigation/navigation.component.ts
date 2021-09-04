import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
    public isHandset$: Observable<boolean>;
    public title: string;

    constructor(private breakpointObserver: BreakpointObserver) { }
    ngOnInit() {
        this.title = 'Angular ML5';
        this.isHandset$ = this.breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(map(result => result.matches));
    }
}
