export class Bank {
  BankId: number;
  BankName: string;

  constructor(args: { BankId: number; BankName: string }) {
    this.BankId = args.BankId;
    this.BankName = args.BankName;
  }
}
