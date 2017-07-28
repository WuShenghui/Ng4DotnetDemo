import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CrudModel } from '../crud.model';
import { CrudService } from '../crud.service';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  selectedLanguages: string[];
  types: SelectItem[];
  model: CrudModel = {
    id: 0,
    content: '',
    date: new Date(),
    type: 0,
    email: '',
    count: 0,
    activated: false,
    languages: ''
  };

  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: CrudService) {
    this.types = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' }
    ];
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCrudModel(id);
    }

  }

  getCrudModel(id: string) {
    this.dataService.getById(id)
      .subscribe((model: CrudModel) => {
        this.model = model;
      },
      (err: any) => console.log(err));
  }

  submit() {

    if (this.model.id) {

      this.dataService.update(this.model)
        .subscribe((model: CrudModel) => {
          if (model) {
            this.router.navigate(['/crud']);
          } else {
            this.errorMessage = 'Unable to save model';
          }
        },
        (err: any) => console.log(err));

    } else {

      this.dataService.add(this.model)
        .subscribe((model: CrudModel) => {
          if (model) {
            this.router.navigate(['/crud']);
          } else {
            this.errorMessage = 'Unable to add model';
          }
        },
        (err: any) => console.log(err));

    }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/crud']);
  }

}
