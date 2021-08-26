import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services';
import { AuthenticationGuard } from './guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '@core/services';
import { Globals } from './globals';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthenticationService,
                AuthenticationGuard,
                Globals,
                { 
                    provide: HTTP_INTERCEPTORS, 
                    useClass: HttpConfigInterceptor, 
                    multi: true 
                }
            ]
        }
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { 
                    provide: HTTP_INTERCEPTORS, 
                    useClass: HttpConfigInterceptor, 
                    multi: true 
                }
            ]
        }
    }
}
