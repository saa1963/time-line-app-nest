export abstract class TlStorage {
  abstract Load(name: string): string;
  abstract IsExist(name: string): boolean;
  abstract List(): string[];
  abstract Save(header: string, body: string): boolean;
}
