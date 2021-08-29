import { Injectable, SecurityContext } from "@angular/core";
import { Observable, Observer, ReplaySubject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

declare global {
  interface Window {
    hubReady: Observer<boolean>;
  }
}

@Injectable()
export class ScientificEquationService {
  private readonly notifier: ReplaySubject<boolean>;

  constructor(private domSanitizer: DomSanitizer) {
    this.notifier = new ReplaySubject<boolean>();
    window.hubReady = this.notifier;
  }

  ready(): Observable<boolean> {
    return this.notifier;
  }

  render(element: HTMLElement, scientificEquation?: string): void {
    if (scientificEquation) {
        element.innerHTML = this.domSanitizer.sanitize(SecurityContext.HTML,this.domSanitizer.bypassSecurityTrustHtml(scientificEquation));
    }

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
  }

  addHTMLHeadConfigurations() {
    const script = document.createElement("script") as HTMLScriptElement;
    script.type = "text/javascript";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;

    document.getElementsByTagName("head")[0].appendChild(script);

    const config = document.createElement("script") as HTMLScriptElement;
    config.type = "text/x-mathjax-config";
    config.text = `
        MathJax.Hub.Config({
            skipStartupTypeset: true,
            tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] },
            AssistiveMML: {disabled: true},
            showMathMenu: false
        });
        MathJax.Hub.Register.StartupHook('End', () => {
            window.hubReady.next();
            window.hubReady.complete();
        });
        `;

    document.getElementsByTagName("head")[0].appendChild(config);
  }
}
