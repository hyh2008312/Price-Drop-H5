import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AdminService} from '../admin.service';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./_top-navigation.scss']
})

export class TopNavigationComponent implements OnInit {

  contents: any = [{
    id: 0,
    text: 'HOME',
    router: './dashboard',
    isActive: false,
    staff: false
  }, {
    id: 1,
    text: 'PRODUCT',
    router: './product',
    isActive: false,
    staff: false
  }, {
    id: 2,
    text: 'FLASH SALE',
    router: './promote',
    isActive: false,
    staff: true
  }, {
    id: 3,
    text: 'ORDERS',
    router: './order',
    isActive: false,
    staff: false
  }, {
    id: 4,
    text: 'EVENTS',
    router: './event',
    isActive: false,
    staff: true
  }, {
    id: 5,
    text: 'LUCKY DRAW',
    router: './lottery',
    isActive: false,
    staff: true
  }, {
    id: 6,
    text: 'NOTIFICATION',
    isActive: false,
    staff: true
  }];

  accounts: any = [
    {
      id: 0,
      text: 'Sellers Settings',
      router: './address',
      isActive: false
    },
    {
      id: 1,
      text: 'Logout',
      router: '/account/login',
      isActive: false
    }
  ];

  users: any = [
    {
      id: 0,
      text: '用户审核',
      router: './user',
      isActive: false
    },
    {
      id: 1,
      text: '搜索关键词',
      router: './keywords',
      isActive: false
    },
    {
      id: 2,
      text: '属性管理',
      router: './specification',
      isActive: false
    },
    {
      id: 3,
      text: '首页管理',
      router: './landing',
      isActive: false
    },
    {
      id: 4,
      text: '分类目录管理',
      router: './category',
      isActive: false
    },
    {
      id: 5,
      text: '尺码表管理',
      router: './sizeChart',
      isActive: false
    },
    {
      id: 6,
      text: '用户评论',
      router: './review',
      isActive: false
    }
  ];


  //是否显示我的账户的东西
  isShowMenu: boolean = false;

  isShowUserMenu: boolean = false;

  //区分为是导航选项 && 还是账户选项

  isAccountNavigation: boolean = false;

  isUserNavigation: boolean = false;

  isSuperuser: boolean = false;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private useService: UserService
  ) {
    this.useService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });

  }

  ngOnInit(): void {
    let url = this.router.routerState.snapshot['url'].split('/admin');
    for (let value of this.contents) {
      if (!value.router) {
      } else {
        if (url[1] && value.router && value.router != '' && value.router.split('.')[1] == url[1]) {
          value.isActive = true;
          break;
        }
      }
    }
  }

  changeShowMenu(isShow: boolean): void {
    if (isShow) {
      document.getElementById('account-menu').style.overflowY = 'visible';
    } else {
      document.getElementById('account-menu').style.overflowY = 'hidden';
    }
  }

  changeSlide(obj: any, index: number) {
    this.isAccountNavigation = false;
    this.isUserNavigation = false;
    for (let value of this.contents) {
      if (value.id != obj.id) {
        value.isActive = false;
      }
    }
    if (obj.slide) {
      obj.isActive = !obj.isActive;
    } else {
      obj.isActive = true;
    }
    if (obj.router) {
      this.router.navigate([`${obj.router}`], {relativeTo: this.activatedRoute});
    }
  }

  changeAccount(obj: any, index: number) {
    this.changeShowMenu(false);
    this.isAccountNavigation = true;
    for (let value of this.accounts) {
      if (value.id != obj.id) {
        value.isActive = false;
      }
    }
    if (obj.slide) {
      obj.isActive = !obj.isActive;
    } else {
      obj.isActive = true;
    }

    if (obj.router) {
      this.router.navigate([`${obj.router}`], {relativeTo: this.activatedRoute});
    }
  }

  changeInnerSlide(isShow) {
    if (isShow) {
      document.getElementById('user-menu').style.overflowY = 'visible';
    } else {
      document.getElementById('user-menu').style.overflowY = 'hidden';
    }
  }

  changeInnerToggle(list, index) {
    this.changeInnerSlide(false);
    this.isAccountNavigation = true;
    for (let value of this.accounts) {
      if (value.id != list.id) {
        value.isActive = false;
      }
    }
    if (list.slide) {
      list.isActive = !list.isActive;
    } else {
      list.isActive = true;
    }

    if (list.router) {
      this.router.navigate([`${list.router}`], {relativeTo: this.activatedRoute});
    }
  }
}
