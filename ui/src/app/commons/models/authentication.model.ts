import { Account } from 'src/app/commons/models/account.model';

export class Authentication {
  name: string;
  authorities: string[];
  account: Account;
  expiration: Date;
}
