import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { concat, interval } from "rxjs";
import { first } from "rxjs/operators";

@Injectable()
export class CheckForUpdateService {
    constructor(appRef: ApplicationRef, swUpdate: SwUpdate) {
        const isAppVersionStable$ = appRef.isStable.pipe(first(isStable => isStable));
        const everySixHours$ = interval(6 * 60 * 60 * 1000);
        const everySixHoursOnceAppIsStable$ = concat(isAppVersionStable$, everySixHours$);

        everySixHoursOnceAppIsStable$.subscribe(async () => {
            try {
                const newVersionDetected = await swUpdate.checkForUpdate();
                console.log(newVersionDetected ? "New version detected" : "No new version detected");
            } catch (error) {
                console.error(error);
            }
        });
    }
}
