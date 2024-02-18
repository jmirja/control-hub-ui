import { Injectable } from '@angular/core';
import { CoreApiService } from './core-api.service';
import { IRequestBank } from '../models/request/IRequestBank';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private coreApiService: CoreApiService) { }


  getBanks() {
    // return this.coreApiService.getBanks().then((result: any) => {
    //   return result;
    // });
  }

  // registerBank(request: IRequestBank) {
  //   return this.coreApiService.createBank(request).then((result: any) => {
  //     return result;
  //   });
  // }

  // updateBank(request: IRequestBank) {
  //   return this.coreApiService.updateBank(request).then((result: any) => {
  //     return result;
  //   });
  // }

  // deleteBank(bankId: number) {
  //   return this.coreApiService.deleteBank(bankId).then((result: any) => {
  //     return result;
  //   });
  // }
}
