import {Component, OnInit, Input, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-about-tmp',
  templateUrl: './about-tmp.component.html',
  styleUrls: ['../_faq.scss']
})

@Injectable()
export class AboutTmpComponent implements OnInit {
  addHeight: any = true;
  index: any = 0;
  arr: any = [];
  about = ['PriceDrop is a fun, social and money-saving shopping app that lets you shop your favorite products at the lowest price by teaming up with your friends on Facebook & WhatsApp. ' +
  'Our mission is to help our customers save bigger, and create a more engaging social selling channel for brands and manufacturers from around the world! ' +
  '\nPriceDrop is a venture-backed company founded by two Y Combinator alumnus and former executives from Amazon, Google and Alibaba Group. If you are passionate about transforming the way people shop online, come join us by sending your resume to: career@getpricedrop.com.'
    ,'All the products will be shipped in 4-5 working days as long as the order is placed, and the delivery time will depends on the shipping location and shipping method.'
    ,'You may return all items sold by PriceDrop within 9 days of delivery for a refund, as long as it is unused and in a good condition.\n\n\n\n\n\n Currently we are not able to offer item exchange service for any shipped orders. ' +
    'If you want a new item, please apply for the refund and then place a new order.'
    ,'To cancel an unfulfilled order, please contact our customer support team by sending an email along with your order number to the following email address: support@getpricedrop.com ;\n\n\n\n\n\n\n\n\n\n ' +
    'Note: If your item has been shipped or under packing, you can’t cancel your order any more.'
    ,'All goods sold by Our Company are warranted to Buyer to be free from defects in material and workmanship, and manufactured in accordance with industry standards. ' +
    'Therefore going warranty is non-assignable and in lieu of and excludes all other warranties not expressly set forth herein, whether express or implied by operation of law or other wise including but not limited to any implied warranties of merchant ability or fitness. ' +
    'No agent, employee, or representative of Our Company has any authority to bind Our Company to any representation, affirmation, or warranty concerning the goods and any such representation, affirmation, or warranty shall not be deemed to have become apart of the basis of this agreement and shall be unenforceable.\n\n\n\n\n\n\n\n\n' +
    'Any claimed defect in material or workmanship shall be deemed waived by Buyer unless submitted to Our Company in writing within five (5) days from the date the goods are received by Buyer.' +
    ' Our Company shall not be liable under the foregoing warranty if any loss or damage is caused by improper application or use of the goods. Our Company disclaims all liability with respect to the design of the goods and makes no warranty with respect to such design. ' +
    'This warranty is in lieu of and excludes all other warranties, whether express, implied, or statutory, including implied warranties of merchantability or fitness.\n'
    ,'If you have any questions, please feel free to drop us an email or give us a call.\n\n\n\n\n\n\n\n\n Contact Email: \nsupport@getpricedrop.com'
    ,'By using this app and/or placing an order, you agree to be bound by the terms and conditions set out below. You must read, agree with and accept all of the terms and conditions contained in this agreement including our privacy policy before you may become our registered user or place an order.\n' +
    'We reserve the right to update and change the Terms & Conditions by posting updates and changes to the PriceDrop App. You are advised to check the Terms & Conditions from time to time for any updates or changes that may impact you.\n'
    ,'Your privacy is important to us at PriceDrop App. This Privacy Policy explains how we collect and utilize information about our customers. By using our app, you are accepting the practices described in this Privacy Policy.\n'
  ];
  ReturnsQA = [{
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

  Privacy = [
    'Terms and conditions to govern - these terms and conditions represent the final and complete agreement of the parties and no terms or conditions in any way modifying or changing the provisions stated herein shall be binding upon our company unless made in writing and signed and approved by an officer or other authorized person at our company. No modification of any of these terms shall be modified by our company\'s shipment of goods following receipt of buyers purchase order, shipping request or similar forms containing printed terms and conditions additional to or in conflict with the terms herein. If any term, clause or provision is declared to held invalid by a court of competent jurisdiction, such declaration or holding shall not affect the validity of any other term, clause or provision herein contained.',
    'Acceptance of orders - all orders are subject to written price verification by authorized our company personnel unless designated in writing to be firm for a specified period of time. Shipment of goods without written price verification does not constitute acceptance of the price contained in the order.',
    'Substitution - our company reserves the right, without prior notification, to substitute an alternative product of like kind, quality and function. If the buyer will not accept a substitute, the buyer must specifically declare that no substitution is allowed when the buyer requests a quote, if such request for quote is made, or, if no request for quote was made, when placing an order with the our company. .',
    'Price - prices quoted, including any transportation charges, are valid for 10 days unless designated as firm for a specific period pursuant to a written quote or written sales acceptance issued or verified by an officer or other authorized personnel of our company. A price designated as firm for a specific period may be revoked by our company if the revocation is in writing and is mailed to the buyer prior to the time a written acceptance of the price is received by our company. All prices and deliveries are f.o.b. shipping point. Our company reserves the right to cancel orders in the event selling prices.',
    'Transportation - unless otherwise provided, our company shall use its judgment in determining carrier and routing. In either case, our company shall not be liable for any delays or excessive transportation charges resulting from its selection.',
    'Packing - unless otherwise provided, our company will comply only with its minimum packing standards for the method of transportation selected. The cost of all special packing, loading or bracing requested by buyer will be paid for by buyer. All cost of packing and shipment for buyer\'s special equipment shall be paid for by buyer.',
    'Payment terms - the discount applies only to the invoiced value of the material (not to taxes or freight charges). Our company reserves the right to require advance payment or satisfactory security for the goods if the financial condition of buyer so warrants as determined by our company. If buyer fails to make payment in accordance with terms of this agreement or any collateral agreement, or fails to comply with any provisions hereof, our company may, at its option (and in addition to other remedies), cancel any unshipped portion of this order. Buyer is to remain liable for all unpaid accounts. ',
    'Taxes and import/export licenses - prices do not include taxes. Taxes are paid by buyer upon invoice from our company unless buyer provides a valid exemption certificate acceptable to the taxing authority or unless our company is forbidden by law from collection of said taxes from buyer. Import or export licenses are to be secured by buyer.',
    'Title and risk of loss - delivery to carrier shall constitute delivery to buyer, and thereafter risk of loss or damage shall pass to buyer. Any claim of buyer relative to damage during shipping or delivery should be made directly to the carrier. Any claims by buyer against our company for shortage or damage occurring prior to such delivery to carrier must be made within five (5) days after receipt of the goods and accompanied by original transportation bill signed by carrier noting that carrier received the goods from our company in the condition claimed. Notwithstanding passage of the risk of loss to buyer, title and right of possession to the goods sold hereunder shall remain with our company until all payments hereunder, including deterred payments evidenced by notes or otherwise, interest, carrying charges, and attorneys\' fees, shall have been made in cash, and buyer agrees to do all acts necessary to perfect and maintain such right and title in our company.',
    'Return of products - goods can be returned within 60 days from the purchase date. Wrong-size items and quality problem items can be exchanged . Customers returning goods are responsible for freight charges. The following items cannot be returned or exchanged: bodysuits, lingerie & sleepwear, swimwear, jewelry, and accessories (except scarves, bags, and mermaid blankets).',
    'Force majeure - our company shall not be liable for failure to perform its obligations resulting directly or indirectly from or contributed to by acts of god; acts of buyer, civil or military authority, including wage and price controls; fires; war; riot; delays in transportation; lack of or inability to obtain raw materials (including energy sources), components, labor, fuel or supplies; or other circumstances beyond our company\'s reasonable control, whether similar or dissimilar to the foregoing. If certain quantities are affected and other quantities are not, the quantities affected shall be eliminated without liability, but the agreement shall remain unaffected. Our company may, during any period of shortage due to any of said causes, allocate its supply of such raw materials among its various users thereof in any manner which yilida company deems fair and reasonable. In no event shall our company be liable for special or consequential damages for any delay for any cause.',
    'Reasonable attorney\'s fees - in the event suit or other proceedings shall be brought for the recovery of the purchase price, or any unpaid balance, or the breach by buyer of any term herein contained, buyer shall pay to our company. In addition to any damages proved by law, reasonable attorney\'s fees and costs of collection.',
    'Liability - our company shall not be responsible, obligated, or liable for any injury or damage resulting from an application or use of its products, either singularly or in combination with other products, arising out of acceptance of this order. Our company shall have no liability for errors in weight or quantity delivered unless claim is made by buyer within five (5) days after receipt of shipment and accompanied by original transportation bill signed by carrier noting that carrier received the goods from our company in the condition claimed. If such timely claim is made by buyer, and the claim is deemded valid by our company. Our company may fulfill its responsibility by either shipping the quantity necessary to make good the deficiency, or at our company \'s option, crediting buyer with the invoice price of the deficiency. ',
    'Warranty - all goods sold by our company are warranted to buyer to be free from defects in material and workmanship, and manufactured in accordance with industry standards. The foregoing warranty is nonassign able and in lieu of and excludes all other warranties not expressly set forth herein, whether express or implied by operation of law or otherwise including but not limited to any implied warranties of merchantability or fitness. No agent, employee, or representative of our company has any authority to bind our company to any representation, affirmation, or warranty concerning the goods and any such representation, affirmation, or warranty shall not be deemed to have become a part of the basis of this agreement and shall be unenforceable. Any claimed defect in material or workmanship shall be deemed waived by buyer unless submitted to our company in writing within five (5) days from the date the goods are received by buyer.Our company shall not be liable under the foregoing warranty if any loss or damage is caused by improper application or use of the goods. Our company disclaims all liability with respect to the design of the goods and makes no warranty with respect to such design. This warranty is in lieu of and excludes all other warranties, whether express, implied, or statutory, including implied warranties of merchantability or fitness.',
    'Selection - buyer represents that the goods sold hereunder are fit for their actual or intended use and that buyer placed no reliance on our company\'s skill or judgment in selecting suitable goods or materials or in the design of suitable goods and materials. Buyer represents that the use and installation of the goods shall be made in compliance with all applicable government requirements. Buyer will defend, indemnify and hold harmless our company, its successors, assigns and subsidiaries from and against all costs (including attorney\'s fees), damages and liabilities resulting from actual or alleged claims asserted or any penalties proposed or assessed our company for any alleged violation of any federal, slate or local law, rule, regulation or standard, by reason of or in connection with any use of the goods delivered hereunder.',
    'Choice of law - this agreement and matters connected with the performance thereof shall be construed in accordance with, and governed by, the law of Hong Kong. Further, it shall be construed to be between merchants.',
    'General - our company specifically represents that any goods to be delivered hereunder will be produced in compliance with the requirements of the fair labor standard act of 1939, as amended.',
    'EMAILS & SMS - When you register on our site, and has consented to receive marketing information. We can send you our updates and promotional emails and messages. If you don\'t want to receive them anymore, you can unsubscribe in any of our emails and messages at any time. For any detail, please see our privacy policy.',
    'Intellectual Property - Our services are legally protected in various ways, including copyrights, trademarks, service marks, patents, trade secrets, and other rights and laws. You agree to respect all copyright and other legal notices, information, and restrictions contained in any content accessed through the App. You also agree not to change, translate, or otherwise create derivative works of the Service. We grant you a license to reproduce content from the Services for personal use only. This license covers both our own protected content and user-generated content on the App. (This license is worldwide, non-exclusive, non-sublicensable, and non-transferable.) If you want to use, reproduce, modify, distribute, or store any of this content for a commercial purpose, you need prior written permission from us or the relevant copyright holder. A "commercial purpose" means you intend to use, sell, license, rent, or otherwise exploit content for commercial use, in any way. If you do something that gets us sued, or break any of the promises you make in this agreement, you agree to defend, indemnify, and hold us harmless from all liabilities, claims, and expenses (including reasonable attorneys\' fees and other legal costs) that arise from or relate to your use or misuse of PriceDrop. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to this indemnification clause, in which case you agree that you’ll cooperate and help us in asserting any defenses.\n',
    'Waiver and Compete Agreement - This Terms and Conditions, together with the Privacy Policy constitute to the User Agreement and represent the entire agreement between our company and you, and supersede any and all preceding and contemporaneous agreements between PriceDrop and you. The failure of PriceDrop to exercise or enforce any right or provision of the User Agreement shall not constitute a waiver of such right or provision. Any waiver of any provision in this Agreement will be effective only if in writing and signed by a duly authorized representative of our company.',
  ];

  TermAndCondittions = [{
    question: 'What information do we collect?',
    answer: 'We collect information from you when you register on our app, place an order, subscribe to our newsletter, fill out a form or visit our site.When ordering or registering on our app, as appropriate, you may be asked to enter your name, email address, mailing address, phone number. '

  }, {
    question: 'What do we use your information for?',
    answer: 'Any of the information we collect from you may be used in one of the following ways:\n' +
    'To personalize your experience. (Your information helps us to better respond to your individual needs)\n' +
    'To improve our app. (We continually strive to improve our app offerings based on the information and feedback we receive from you)\n' +
    'To improve customer service. (Your information helps us to more effectively respond to your customer service requests and support needs)\n' +
    'To process transactions. Your information, whether public or private, will not be sold, exchanged, transferred,or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.\n' +
    'To administer a contest, promotion, survey or other site feature.\n' +
    'To send periodic emails. (The email address you provide for order processing will only be used to send you information and updates pertaining to your order. Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.)\n'
  }, {
    question: 'Do we disclose any information to outside parties?',
    answer: 'We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our app, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or other’s rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.'
  }
  ];

  // tmpQA =[ this.DropsQA, this.OrderQA, this.ShippingQA, this.VoucherQA, this.CODDeliveryQA, this.CustomsQA, this.ReturnsQA, this.PaymentQA]
  aboutArr = [
    'About Us',
    'Shipping Policy',
    'Return Policy',
    'Cancellation Policy',
    'Disclaimer',
    'Contact Us',
    'Privacy Policy',
    'Terms & Conditions',
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,


  ) {
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data) {
        this.index = data.index;
        this.arr = this.about[this.index]
        this.userService.addNavigation(this.aboutArr[this.index]);
      }
    });
  }

  ngOnInit(): void {}

  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

