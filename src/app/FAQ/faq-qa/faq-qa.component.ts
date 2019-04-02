import {Component, OnInit, Input, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-faq-qa',
  templateUrl: './faq-qa.component.html',
  styleUrls: ['../_faq.scss']
})

@Injectable()
export class FaqQaComponent implements OnInit {
  addHeight: any = true;
  index: any = 0;
  arr: any = [];
  DropsQA = [{
    question: 'How to start a Price Drop campaign?',
    answer: 'Login to your account and select the product you love, then click the “Drop Price”button.'
  }, {
    question: 'How to reach the lowest price?',
    answer: 'Once you start a Price Drop campaign, share it with your friends and invite them to drop the price for you. When they click the “Drop” button on the page of your campaign, the price will be dropped automatically. Once you get a certain number of clicks from your friends, the lowest price will be unlocked! '
  }, {
    question: 'Is there a time frame for a Price Drop campaign?',
    answer: 'A Price Drop campaign only lasts for 24 hours. Once the drop reaches the lowest price, the campaign will end automatically.'
  }, {
    question: 'How many times can a user help others drop the price?',
    answer: 'Each user can only help others drop the price up to 10 times a day for different products.'
  }
  ];
  OrderQA = [{
    question: 'How do I check on the status of my order?',
    answer: 'Please log into your account, and check your order status by going to Account -> My Orders'

  }, {
    question: 'My order status is still under processing, when will it be shipped?',
    answer: 'It takes 3-5 days to prepare your order shipment. And it takes another 8-15 days to arrive after your order has been shipped.'
  }, {
    question: 'Can I change the shipping address after placing an order?',
    answer: 'Please contact our customer support as soon as possible if you want to change your shipping address. But it’s no longer possible to change the address once your order has shipped.'
  }, {
    question: 'Can I cancel my order after I have paid?',
    answer: 'You can only cancel your order before the order is shipped. If you want to do this, please go to “My Order” and click the “Cancel Order” button, or contact our customer support to cancel the order for you.'
  }, {
    question: 'If I have canceled my order, can I still purchase the item at the DROP price?',
    answer: 'No. Once you cancel your order, the DROP price is no longer valid. If you want to order it again, please start another Price Drop campaign.'
  }
  ];
  ShippingQA = [{
    question: 'How much do you charge for shipping?',
    answer: 'The shipping cost varies depending on the size, weight and destination of your order. We will strive to pick the best shipping methods for you.'

  }, {
    question: 'Where does my order ship from?',
    answer: 'We source products from brands and manufacturers from across the world, so your order could ship from a variety of locations depending on the suppliers.'

  }, {
    question: 'What if my order arrives incomplete, damaged, or defective?',
    answer: 'We offer full refund for any incomplete, damaged or defective orders. If you encountered these issues, please contact our customer support right away.'

  }, {
    question: 'What if my order has not arrived by the expected delivery date?',
    answer: 'Sometimes there will be a few days’ delay for some orders, please do not worry if the tracking records are updating. If the parcel turns out to be missing, we will offer you a full refund.'

  }, {
    question: 'What if my package say it’s been delivered but I don’t have it?',
    answer: 'Once your package is marked as delivered by the shipping carrier, we’re no longer responsible for any lost or stolen goods.'

  }
  ];
  VoucherQA = [{
    question: 'How to redeem a Gift Voucher?',
    answer: 'You can redeem free Gift Vouchers with your available points on the “Rewards” page.'
  }, {
    question: 'How to use the Gift Voucher for my order?',
    answer: 'You can use your Gift Vouchers for your orders on the Checkout page. '
  }, {
    question: 'Why I can’t see my Gift Vouchers on the Checkout page?',
    answer: 'The gift vouchers will show up only when your order reaches the minimum price.'
  }, {
    question: 'Can I use multiple Vouchers at the same time?',
    answer: 'No, you can only use one voucher for each order.'
  }, {
    question: 'Does the Voucher apply to every product?',
    answer: 'No. The voucher is not available for Drop’s orders.'
  }
  ];
  CODDeliveryQA = [{
    question: 'Which area is available for COD delivery?',
    answer: 'COD delivery is only available for certain locations now. You can check the COD availability by entering your Pincode. We will support more locations later.'
  }, {
    question: 'How many COD orders can I place at a time?',
    answer: 'You can only place one COD order each time. Your next COD order will be available only after you complete your last COD order successfully. If you reject your last COD order, you won’t be able to use COD any more.'
  }, {
    question: 'What is the price limit for a COD order?',
    answer: 'The COD delivery is not available for order above Rs.1500 now.'
  }, {
    question: 'Can I cancel a COD order after it ships out?',
    answer: 'If you place a COD order, you cannot cancel or reject the package after it ships out. Otherwise, you would be blocked by the carrier and cannot use COD service any more.'
  }
  ];
  CustomsQA = [{
    question: 'Will my package be charged customs duty and import tax?',
    answer: 'In some cases, you may be charged for taxes or customs clearance as your order passes through customs. Any charge on a package must be paid by the recipient. We have no control over these changes and cannot predict the amount of it, as the customs and taxation policies vary from country to country.'

  }
  ];
  ReturnsQA = [{
    question: 'What is your return policy?',
    answer: 'You may return all items sold by PriceDrop within 9 days of delivery for a refund, as long as it is unused and in a good condition.Currently we are not able to offer item exchange service for any shipped orders. If you want a new item, please apply for the refund and then place a new order.'
  }, {
    question: 'How do I return an item?',
    answer: 'Step 1:\nSend your return request to support@getpricedrop.com along with your order number and the name of the item you want to return.\n' +
    'Step 2:\nOur customer service will send you a RAN (Return Authorization Number) within 24 hours.\n' +
    'Step 3:\nPack up the item you want to return and send it back to our warehouse (address in the email with RAN). \n' +
    'Step 4:\nOnce our warehouse receives the return package, we will issue the refund within 3 business days.' +
    '\n' +
    'Please note that any returned items must be in resalable condition. Item that arrived damaged will not be eligible for refund.'

  }, {
    question: 'Who is responsible for the return shipping? ',
    answer: 'If the return is caused by PriceDrop’s error, we will refund return shipping costs up to a certain amount through gift voucher. You will need to pay the carrier at the time of shipping and ask for a payment receipt.\n' +
    '' +
    '\nIf the return is not caused by PriceDrop’s error, you will need to pay for both the return shipping fee and order shipping fee. We recommend that you choose a local carrier with a cheaper price for return shipping. \n'

  }, {
    question: 'How long does it take to receive the refund?',
    answer: 'It usually takes 5-10 business days for the refund to be issued to your original payment method.'

  }
  ];
  PaymentQA = [{
    question: 'Which payment methods do you accept?',
    answer: 'We accept most of the major payment methods including: Netbanking、Debit Card、Credit Card、Wallet, etc.'

  }, {
    question: 'How do we protect your payment information?',
    answer: 'We never store your payment information in our backend system. All your private payment information is directly passed to and stored in your bank or Wallet. If you have any other questions about the safety and security of your personal information, please email us at support@getpricedrop.com.'

  }
  ];
  tmpQA =[ this.DropsQA, this.OrderQA, this.ShippingQA, this.VoucherQA, this.CODDeliveryQA, this.CustomsQA, this.ReturnsQA, this.PaymentQA]
  faqArr = [
    'My Drops FAQs',
    'My Orders FAQs',
    'Shipping FAQs',
    'Voucher FAQs',
    'COD Delivery FAQs',
    'Customs Duty FAQs',
    'Returns FAQs',
    'Payment FAQs',
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,


  ) {
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
    this.activatedRoute.queryParams.subscribe((data)=>{
      if (data) {
        this.index  = data.index
        this.arr = this.tmpQA[this.index];
        this.userService.addNavigation(this.faqArr[this.index]);
      }
    })
  }

  ngOnInit(): void {}
  openDec () {
    // console.log(111)
    // this.router.navigate([`/goodsDescription`], {queryParams: {goods: this.goods}});
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

