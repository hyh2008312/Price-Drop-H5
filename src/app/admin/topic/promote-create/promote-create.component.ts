import { Component, OnInit} from '@angular/core';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-promote-create',
  templateUrl: './promote-create.component.html',
  styleUrls: ['../_topic.scss']
})

export class PromoteCreateComponent implements OnInit {

  templateId: any = 1;
  templateTypeList: any = [];

  isEdit: boolean = false;

  constructor(
    private promoteService: TopicService
  ) {}

  ngOnInit(): void {
    this.promoteService.getTemplateTypeList().then((data) => {
      this.templateTypeList = [...data];
    });
  }

}
