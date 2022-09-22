import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
@Injectable()
export class LogUpdateService {
    constructor(swUpdate: SwUpdate) {
        swUpdate.versionUpdates.subscribe(event => {
            switch (event.type) {
                case "VERSION_DETECTED":
                    console.log(`Downloading new app version: ${event.version.hash}`);
                    break;
                case "VERSION_READY":
                    console.log(`New app version ready: ${event.latestVersion.hash}`);
                    break;
                case "VERSION_INSTALLATION_FAILED":
                    console.log(`New app version installation failed: ${event.version.hash}`);
                    break;
            }
        })
    }
}
