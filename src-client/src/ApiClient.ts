﻿import { TLPeriod } from './TLPeriod';
import { stringUtils } from './stringutils';
import { readyException } from 'jquery';

export class ApiClient {
  private static instance: ApiClient;
  private jwtToken: { access_token: string };
  private constructor() {
    // do something construct...
  }
  public static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
      // ... any one time initialization goes here ...
    }
    return ApiClient.instance;
  }

  private HttpError(response: Response) {
    return 'Ошибка HTTP - ' + response.status;
  }

  public async DoLogin(login: string, password: string): Promise<string> {
    if ((login || '').trim() !== '' && (password || '').trim() !== '') {
      const passwordMd5 = stringUtils.md5(password);
      const response = await fetch('auth/logon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Login: login, Password: passwordMd5 }),
      });
      if (response.ok) {
        this.jwtToken = await response.json();
        localStorage.setItem('tokenTL', this.jwtToken.access_token);
        return '';
      } else {
        return this.HttpError(response);
      }
    } else {
      return 'Не введены логин или пароль.';
    }
  }

  public async SaveTL(model: TLPeriod): Promise<string> {
    const response = await fetch('save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenTL'),
      },
      body: JSON.stringify({ s1: model.Name, s2: JSON.stringify(model) }),
    });
    console.log(response);
    if (response.ok) return '';
    else return 'Ошибка: ' + (await response.text());
  }

  public async TestToken(): Promise<string> {
    const response = await fetch('test', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenTL'),
      },
    });
    if (response.ok) {
      return await response.text();
    } else {
      throw '';
    }
  }

  public async DoLogout(): Promise<boolean> {
    localStorage.removeItem('tokenTL');
    return true;
  }

  public async GetUsersList(): Promise<string[]> {
    const response = await fetch('list', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenTL'),
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw 'Статус - ' + response.status + ' ' + response.statusText;
    }
  }

  public async GetTL(value: string): Promise<TLPeriod | string> {
    const response = await fetch('load?' + new URLSearchParams({ tlname: value }), {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenTL'),
      },
    });
    if (response.ok) {
      const tline = await response.json();
      const period = TLPeriod.CreateTLPeriod(tline);
      period.Parent = null;
      return period;
    } else {
      console.log(response.text());
      return 'Ошибка загрузки данных';
    }
  }

  public async DoRegister(
    login: string,
    email: string,
    password1: string,
    password2: string,
  ): Promise<string> {
    if (password1 !== password2) {
      return 'Не совпадают пароли';
    }
    const passwordMd5 = stringUtils.md5(password1);
    const response = await fetch('auth/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Login: login,
        Email: email,
        Password1: passwordMd5,
        Password2: passwordMd5,
      }),
    });
    if (response.ok) {
      return '';
    } else {
      return (await response.json()).message;
    }
  }
}
