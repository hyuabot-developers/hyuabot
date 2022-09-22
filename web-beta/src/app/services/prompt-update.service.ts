import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import {filter} from "rxjs";

@Injectable()
export class PromptUpdateService {
    constructor(swUpdate: SwUpdate) {
        swUpdate.versionUpdates
            .pipe(filter(event => event.type === "VERSION_READY"))
            .subscribe(event => {
                if (confirm("New version available. Load New Version?")) {
                    window.location.reload();
                }
            }
        );
    }
}
