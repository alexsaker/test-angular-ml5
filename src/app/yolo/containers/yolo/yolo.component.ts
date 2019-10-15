import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import * as ml5 from 'ml5';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
    selector: 'app-yolo',
    templateUrl: './yolo.component.html',
    styleUrls: ['./yolo.component.scss'],
})
export class YoloComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('videoElement') videoElement: ElementRef<any>;
    @ViewChild('canvasElement') canvasElement: ElementRef<any>;

    public yolo: any;
    public video: any;
    public loading: boolean;
    public isStopped: boolean;
    public isPlaying: boolean;
    public canvas: CanvasRenderingContext2D;
    public info: Array<any>;
    public displayedColumns: Array<string>;
    public readonly videoWidth = 600;
    public readonly videoHeight = 450;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}
    async ngOnInit() {
        this.loadMobileNet();
        await this.start();
    }

    ngAfterViewInit() {
        this.video = this.videoElement.nativeElement;
        this.canvas = this.canvasElement.nativeElement.getContext('2d');
    }

    ngOnDestroy() {
        this.yolo = null;
        this.video = null;
    }

    public async start() {
        await this.initCamera({ video: true, audio: false });
        this.isPlaying = true;
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
        // this.drawToCanvas();
        await this.loadYolo();
        this.detect();
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
            this.isStopped = true;
        }
    }

    public resume() {
        if (!this.isPlaying) {
            this.video.play();
            this.isPlaying = true;
        }
    }
    private detect() {
        if (this.yolo) {
            this.yolo.detect((err, results) => {
                // Will output bounding boxes of detected objects
                if (results) {
                    this.info = results;
                    this.drawBoxes(results);
                    this.changeDetectorRef.detectChanges();
                }
                this.detect();
            });
        }
    }

    private async loadMobileNet() {
        this.loading = true;
        await ml5.imageClassifier('MobileNet');
        this.loading = false;
    }

    private async loadYolo() {
        this.yolo = await ml5.YOLO(this.video);
    }

    private drawBoxes(results) {
        this.canvas.beginPath();
        this.canvas.clearRect(0, 0, this.videoWidth, this.videoHeight);
        this.canvas.lineWidth = 5;
        this.canvas.font = 'bold 12px verdana, sans-serif';
        results.forEach(result => {
            this.canvas.fillStyle = '#ff2626';
            this.canvas.fillText(
                result.className,
                result.x * this.videoWidth + 5,
                result.y * this.videoHeight + 15
            );
            this.canvas.rect(
                result.x * this.videoWidth,
                result.y * this.videoHeight,
                result.w * this.videoWidth,
                result.h * this.videoHeight
            );
            this.canvas.strokeStyle = '#ff2626';
            this.canvas.stroke();
        });
    }
}
