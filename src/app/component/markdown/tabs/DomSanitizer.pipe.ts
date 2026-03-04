import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'domSanitizer' })
export class DomSanitizerPipe implements PipeTransform {
  #domsan = inject(DomSanitizer);

  transform(value: any): any {
    return this.#domsan.bypassSecurityTrustHtml(value);
  }
}
