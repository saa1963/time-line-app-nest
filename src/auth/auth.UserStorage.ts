import { LogonDto } from './logon.dto';

export abstract class UserStorage {
  protected logonDto: LogonDto[];
  constructor() {
    this.logonDto = [];
  }
  abstract Save(login: string, email: string, password: string): Promise<boolean>;
  abstract Contains(login: string): Promise<boolean>;
  abstract Remove(login: string): Promise<boolean>;
  abstract Logon(login: string, password: string): Promise<LogonDto | null>;
}
