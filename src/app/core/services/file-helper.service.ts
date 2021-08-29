import {Injectable} from '@angular/core';
import {Globals} from '@core/globals';

@Injectable({
  providedIn: 'root'
})
export class FileHelperService {
    static previewFile(link: string): void {
      const fileType = FileHelperService.extensionExtractor(link);
      const url = FileHelperService.previewService(link, fileType);
      window.open(url, '_blank');
    }

  constructor() {
  }

  static extensionExtractor(link: string) {
    return link.split('?')[0].split('.').pop();
  }

  static previewService(link: string, extension: string) {
    if (Globals.oneDriveExtensions.includes(extension)) {
      return  Globals.oneDriveUrl + encodeURIComponent(link);
    }
    return link;
  }
}
