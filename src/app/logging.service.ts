/**
 * not neede for application
 * just created for showing work with different service instances
 * **/
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  lastLog: string;

  constructor() {
  }

  printLog(message: string)
  {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}
