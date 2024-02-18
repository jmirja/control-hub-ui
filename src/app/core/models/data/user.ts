export class User {
    FullName!: string;
    UserName?: string;
    Email?: string;
    Password?: string;
    IsActive?: boolean;
  
    constructor(args: { FullName: string; UserName: string | undefined; Email: string | undefined; Password: string | undefined; IsActive: boolean | undefined; }) {
      this.FullName = args.FullName;
      this.UserName = args.UserName;
      this.Email = args.Email;
      this.Password = args.Password;
      this.IsActive = args.IsActive;
    }
  }