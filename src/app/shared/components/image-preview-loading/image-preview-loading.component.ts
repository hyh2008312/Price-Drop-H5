import {Component, Input, OnChanges, OnInit, ElementRef, ViewChild, OnDestroy, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-image-preview-loading',
  templateUrl: './image-preview-loading.component.html',
  styleUrls: ['./_image-preview-loading.component.scss']
})
export class ImagePreviewLoadingComponent implements OnInit, OnDestroy {

  @Input() percent: number = 0;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @Output() loadingChange: EventEmitter<any> = new EventEmitter();

  @Input() width: number = 200;

  angel: any = 0;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.paint();
  }


  private paint() {
    if(this.angel < this.percent * 359 / 100 && this.percent > 0) {
      this.angel++;
    } else {
      return;
    }

    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');

    this.clearRect();

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(this.width / 2, this.width / 2, 32, -Math.PI/2, Math.PI * 3 / 2, false);
    ctx.stroke();
    ctx.restore();

    // 初始保存
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.3)";
    // 位移到目标点
    ctx.translate(this.width / 2 , this.width / 2);
    ctx.beginPath();
    // 画出圆弧
    ctx.arc(0,0,30,-Math.PI/2, Math.PI / 180 * this.angel - Math.PI/2, true);
    // 再次保存以备旋转
    ctx.save();
    // 旋转至起始角度
    ctx.rotate(Math.PI / 180 * this.angel - Math.PI/2);
    // 移动到终点，准备连接终点与圆心
    ctx.moveTo(30,0);
    // 连接到圆心
    ctx.lineTo(0,0);
    // 还原
    ctx.restore();
    // 旋转至起点角度
    ctx.rotate(-Math.PI/2);
    // 从圆心连接到起点
    ctx.lineTo(30,0);
    ctx.closePath();
    ctx.fill();
    // 还原到最初保存的状态
    ctx.restore();


    if(this.angel >= this.percent * 360 / 100) {
      this.loadingChange.emit({
        angel: this.angel,
        animate: true
      });
    }

    requestAnimationFrame(() => this.paint());

  }

  clearRect() {
    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.width);

    var radial = ctx.createRadialGradient(this.width / 2, this.width / 2,30,this.width/2,this.width/2,34);
    radial.addColorStop(0,'rgba(0,0,0,0)');
    radial.addColorStop(0.5,'rgba(0,0,0,0)');
    radial.addColorStop(0.9,'rgba(0,0,0,.5)');
    radial.addColorStop(1,'rgba(0,0,0,.5)');

    ctx.fillStyle = radial; //把渐变赋给填充样式
    ctx.fillRect(0,0,this.width,this.width);
    ctx.fill();
  }

  ngOnDestroy() {

  }

}
