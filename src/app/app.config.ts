import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { I18nPluralPipe } from '@angular/common';
import { CalendarA11y } from 'angular-calendar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    // Add necessary services for avoiding circular dependency
    I18nPluralPipe,
    CalendarA11y,
    // Add the CalendarModule configuration here
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }).providers!,
  ],
};
