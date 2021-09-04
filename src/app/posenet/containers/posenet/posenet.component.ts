import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import * as ml5 from 'ml5';
import { interval, Subject, Subscription } from 'rxjs';
import { tap, throttle } from 'rxjs/operators';

@Component({
    selector: 'app-posenet',
    templateUrl: './posenet.component.html',
    styleUrls: ['./posenet.component.scss'],
})
export class PosenetComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('videoElement') videoElement: ElementRef<any>;
    @ViewChild('canvas') canvas: ElementRef<any>;

    public video: any;
    public loading: boolean;
    public isPlaying: boolean;
    public info: Array<any>;
    public displayedColumns: Array<string>;
    public readonly videoWidth = 600;
    public readonly videoHeight = 450;
    private posesSubject: Subject<any>;
    private poseSubscription: Subscription;
    private readonly THRESHOLD = 0.5;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}
    async ngOnInit() {
        this.posesSubject = new Subject<any>();
        this.displayedColumns = ['part', 'score'];
        this.isPlaying = false;
        this.poseSubscription = this.posesSubject
            .asObservable()
            .pipe(
                throttle(() => interval(1000)),
                tap(results => {
                    this.info = results.reduce((acc, _) => {
                        return acc.concat(
                            ...results.map(result =>
                                result.pose.keypoints.filter(
                                    keyPoint => keyPoint.score > this.THRESHOLD
                                )
                            )
                        );
                    }, []);
                    this.info.sort((a, b) => b.score - a.score);
                    this.drawPoints(this.info);
                    this.changeDetectorRef.detectChanges();
                })
            )
            .subscribe();
        this.loadMobileNet();
        this.start();
    }

    ngAfterViewInit() {
        this.video = this.videoElement.nativeElement;
    }

    ngOnDestroy() {
        this.poseSubscription.unsubscribe();
    }

    public async start() {
        await this.initCamera({ video: true, audio: false });
        this.isPlaying = true;
        this.changeDetectorRef.markForCheck();
    }

    public async initCamera(config: any) {
        const browser = navigator as any;

        browser.getUserMedia =
            browser.getUserMedia ||
            browser.webkitGetUserMedia ||
            browser.mozGetUserMedia ||
            browser.msGetUserMedia;

        const stream = await browser.mediaDevices.getUserMedia(config);
        this.video.srcObject = stream;
        this.video.play();
        this.loadPoseNet();
    }

    public pause() {
        if (this.isPlaying) {
            this.video.pause();
            this.isPlaying = false;
        }
    }

    public stop() {
        if (this.isPlaying) {
            this.video.srcObject = null;
            this.isPlaying = false;
        }
    }

    public resume() {
        if (!this.isPlaying) {
            this.video.play();
            this.isPlaying = true;
        }
    }
    private async loadMobileNet() {
        this.loading = true;
        await ml5.imageClassifier('MobileNet');
        this.loading = false;
        this.changeDetectorRef.markForCheck();
    }
    private async loadPoseNet() {
        // Create a new poseNet method
        const poseNet = await ml5.poseNet(this.video);
        // Listen to new 'pose' events and emit poses from posesSubject
        poseNet.on('pose', this.handlePoses);
    }

    private handlePoses = (poses: any) => {
        this.posesSubject.next(poses);
    };

    private drawPoints(points: Array<any>) {
        const pointSize = 3; // Change according to the size of the point.
        const ctx = this.canvas.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);
        ctx.fillStyle = '#ff2626'; // Red color
        points.forEach(element => {
            ctx.beginPath();

            ctx.arc(
                element.position.x,
                element.position.y,
                pointSize,
                0,
                Math.PI * 2,
                true
            ); // Draw a point using the arc function of the canvas with a point structure.
            ctx.fill(); // Close the path and fill.
        });
    }
}
