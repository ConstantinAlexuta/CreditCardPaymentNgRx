import { createClient } from './../../state/client.actions';
import { Client } from './../../model/client.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AppState } from 'src/store/reducers';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(submittedForm: any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const client: Client = {
      id: uuidv4(),
      firstName: submittedForm.value.firstName,
      lastName: submittedForm.value.lastName,
    };

    this.store.dispatch(createClient({ client }));
  }
}
