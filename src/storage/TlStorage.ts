export abstract class TlStorage {
  abstract Load(name: string, username: string): string;
  abstract IsExist(name: string, username: string): boolean;
  abstract List(): string[];
  abstract Save(header: string, body: string): boolean;
}
