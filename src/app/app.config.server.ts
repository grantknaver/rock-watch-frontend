import { mergeApplicationConfig, ApplicationConfig, inject, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { AsteroidService } from './services/asteroid.service';

export function initializeApp() {
  const asteroidService = inject(AsteroidService);
  return () => new Promise((resolve, reject) => {
    const asteroidData = asteroidService.fetchAstroidData();
    asteroidData ? resolve(asteroidData) : reject(asteroidData)
  });
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [],
    },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
