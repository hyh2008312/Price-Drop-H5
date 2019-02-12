import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {CustomerService} from "../customer.service";


@Component({
  selector: 'app-customer-service-detail',
  templateUrl: './customer-service-detail.component.html',
  styleUrls: ['../_customer-service.scss']
})

export class CustomerServiceDetailComponent implements OnInit {
  replyMessage: any = '';
  replyMessageForm: FormGroup;

  isMessageEmpty: boolean = false;

  message: any;

  id: number;

  respondStatus: string = '';

  messageList: any;

  aCustomerName: string;
  aSuppierName: string;
  isClose: boolean = false;
  // 特别注意，根据后台的判读条件，当为true的时候代表没有过期，当为false的时候就表示过期了
  isExpired: boolean = true;

  tipWord: string = 'Please note :You must respond to this ticket within 48 hours.';
  isShowCloseButton: boolean = false;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.replyMessageForm = this.fb.group({
      replyMessage: ['']
    });

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.requestMessageDetail();
  }

  //关闭问题
  requestCloseMessage() {
    this.customerService.startCloseMessage(this.id).then((data) => {
      this.router.navigate(['/admin/customerService']);
    });
  }

  // 跳转到订单详情
  jumpOrderDetail() {
    this.router.navigate(['/admin/order-warehouse/detail', this.id]);
  }

  /*判断该私信是否关闭*/
  judgeMessageIsClose() {
    if (this.respondStatus === 'Closed') {
      this.isClose = false;
    } else {
      this.isClose = true;
    }
  }

  /*判断那个 close this ticket 的按钮是否出现*/
  judgeCloseTicketIsShow() {
    if (this.respondStatus === 'Awaiting Response' || this.respondStatus === 'Responded') {
      for (let i = 0; i < this.messageList.length; i++) {
        if (!this.messageList[i].direction) {
          this.isShowCloseButton = true;
          break;
        }
        if (i === this.messageList.length - 1) {
          this.isShowCloseButton = false;
        }
      }
    }
  }

  judgeTipWarn() {
    if (this.respondStatus === 'Closed') {
      this.tipWord = 'Please note : This support ticket has been closed.';
    } else if (!this.isExpired) {
      this.respondStatus = 'Expired';
      this.tipWord = 'Please note : This ticket has expired and has been transferred to SocialCommer Support Team.';
    } else if (this.isShowCloseButton) {
      this.tipWord = 'Please note: You can close this ticket if you have resolved the issue for your customer without leaving a reply.';
    } else {
      this.tipWord = 'Please note :You must respond to this ticket within 48 hours.';
    }
  }

  submitCustomerService() {
    if (!this.isMessageEmpty) {
      return;
    }
    let options = {
      context: this.replyMessage
    };
    this.customerService.startReplyMessage(options, this.id).then((data) => {
      this.message = data;
      this.messageList = data.communication.messages;
      this.respondStatus = data.communication.status;
      this.replyMessage = '';
    });
  }

  requestMessageDetail() {
    this.customerService.getMessageDetail(this.id).then((data) => {
      this.message = data;
      this.aCustomerName = data.communication.customerName;
      this.aSuppierName = data.communication.supplier.name;
      this.messageList = data.communication.messages;
      this.respondStatus = data.communication.status;
      this.isExpired = data.communication.isExpired;
      this.judgeMessageIsClose();
      this.judgeCloseTicketIsShow();
      this.judgeTipWarn();
    });
  }


  changeMessageStatus(message: any) {
    this.replyMessage = message;
    let str = message.trim();
    if (str.length == 0) {
      this.isMessageEmpty = false;
    } else {
      this.isMessageEmpty = true;
    }
  }
}
