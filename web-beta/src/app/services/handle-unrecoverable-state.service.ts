import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable()
export class HandleUnrecoverableStateService {
    constructor(swUpdate: SwUpdate) {
        swUpdate.unrecoverable.subscribe(event => {
            console.error("An unrecoverable error occurred. The app will need to be reloaded.");
        });
    }
}
