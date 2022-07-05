export abstract class TlStorage {
  abstract Load(name: string, username: string): Promise<string>;
  abstract IsExist(name: string, username: string): Promise<boolean>;
  abstract List(user: string): Promise<string[]>;
  abstract Save(header: string, body: string, username: string): Promise<boolean>;
}
