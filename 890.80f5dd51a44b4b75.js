"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[890],{890:(mt,_,r)=>{r.r(_),r.d(_,{ShuttleModule:()=>ut});var s=r(5056),u=r(6895),b=r(4006),m=r(6753),C=r(581),f=r(7885),y=r(9671),w=r(6498),d=r(4964),t=r(6353),p=r(817),x=r(4471);const T=function(e,a,n){return{hour:e,minute:a,remained:n}};function D(e,a){if(1&e&&(t.TgZ(0,"ion-item",6)(1,"div",7)(2,"ion-text"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-text"),t._uU(6),t.ALo(7,"translate"),t.qZA()()()),2&e){const n=a.$implicit,i=t.oxw(2);t.xp6(2),t.Tol(n.shuttleType),t.xp6(1),t.Oqu(t.lcZ(4,4,"shuttle.type."+n.shuttleType)),t.xp6(3),t.Oqu(t.xi3(7,6,"shuttle.timetable.item",t.kEZ(9,T,n.shuttleTime.split(":")[0],n.shuttleTime.split(":")[1],i.getRemainedTime(n.shuttleTime))))}}function Z(e,a){if(1&e&&t.YNc(0,D,8,13,"ion-item",5),2&e){const n=t.oxw();t.Q6J("ngForOf",n.shuttleTimetableStation.slice(0,3))}}function O(e,a){1&e&&(t.TgZ(0,"ion-item",6)(1,"ion-label",8),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"shuttle.out_of_service")))}function M(e,a){if(1&e&&(t.TgZ(0,"ion-item",6)(1,"div",7)(2,"ion-text"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-text"),t._uU(6),t.ALo(7,"translate"),t.qZA()()()),2&e){const n=a.$implicit,i=t.oxw(2);t.xp6(2),t.Tol(n.shuttleType),t.xp6(1),t.Oqu(t.lcZ(4,4,"shuttle.type."+n.shuttleType)),t.xp6(3),t.Oqu(t.xi3(7,6,"shuttle.timetable.item",t.kEZ(9,T,n.shuttleTime.split(":")[0],n.shuttleTime.split(":")[1],i.getRemainedTime(n.shuttleTime))))}}function P(e,a){if(1&e&&t.YNc(0,M,8,13,"ion-item",5),2&e){const n=t.oxw();t.Q6J("ngForOf",n.shuttleTimetableTerminal.slice(0,3))}}function k(e,a){1&e&&(t.TgZ(0,"ion-item",6)(1,"ion-label",8),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"shuttle.out_of_service")))}function A(e,a){1&e&&t._UZ(0,"ion-icon",9)}function v(e,a){1&e&&t._UZ(0,"ion-icon",10)}let q=(()=>{class e{constructor(n){this.shuttleService=n,this.firstDestination="station",this.secondDestination="terminal",this.timeDeltaDH="-5",this.timeDeltaDY="-5",this.timeDeltaC="-5",this.shuttleTimetableStation=[],this.shuttleTimetableTerminal=[],this.now=new Date,this.shuttleService.shuttleTimetable.subscribe(i=>{this.now=new Date,this.shuttleTimetableStation=new Array,this.shuttleTimetableTerminal=new Array,this.firstTimetableURL="/shuttle/timetable?destination="+this.firstDestination+"&stop="+this.stopName,this.secondTimetableURL="/shuttle/timetable?destination="+this.secondDestination+"&stop="+this.stopName;for(const o of i.filter(l=>"dormitory"===l.startStop.toLowerCase()||"dormitory"!==this.stopName))"DH"===o.shuttleType?this.shuttleTimetableStation.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaDH)}):"DY"===o.shuttleType?this.shuttleTimetableTerminal.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaDY)}):"C"===o.shuttleType&&(this.shuttleTimetableStation.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaC)}),this.shuttleTimetableTerminal.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaC)}));this.shuttleTimetableStation=this.shuttleTimetableStation.filter(o=>this.getRemainedTime(o.shuttleTime)>0).sort(this.compareTime),this.shuttleTimetableTerminal=this.shuttleTimetableTerminal.filter(o=>this.getRemainedTime(o.shuttleTime)>0).sort(this.compareTime)})}addTimeDelta(n,i){const[o,l,h]=n.split(":"),c=new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),parseInt(o,10),parseInt(l,10));return c.setMinutes(c.getMinutes()+parseInt(i,10)),String(c.getHours()).padStart(2,"0")+":"+String(c.getMinutes()).padStart(2,"0")}compareTime(n,i){return n.shuttleTime<i.shuttleTime?-1:n.shuttleTime>i.shuttleTime?1:0}getRemainedTime(n){const[i,o]=n.split(":");return 60*(parseInt(i,10)-this.now.getHours())+(parseInt(o,10)-this.now.getMinutes())}isBookmarked(){return localStorage.getItem("bookmark.shuttle.index")===this.stopName}addBookmark(){localStorage.setItem("bookmark.shuttle.index",this.stopName)}removeBookmark(){localStorage.removeItem("bookmark.shuttle.index")}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(p.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shuttle-dual-card"]],inputs:{stopName:"stopName",firstDestination:"firstDestination",secondDestination:"secondDestination",timeDeltaDH:"timeDeltaDH",timeDeltaDY:"timeDeltaDY",timeDeltaC:"timeDeltaC"},decls:32,vars:26,consts:[[3,"href"],[3,"ngIf"],["fill","clear",3,"click"],["slot","icon-only","name","bookmark-outline",4,"ngIf"],["slot","icon-only","name","bookmark","color","primary",4,"ngIf"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],[1,"container"],[2,"text-align","center"],["slot","icon-only","name","bookmark-outline"],["slot","icon-only","name","bookmark","color","primary"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-card-subtitle"),t._uU(6),t.ALo(7,"translate"),t.qZA()(),t.TgZ(8,"ion-card-content")(9,"ion-list")(10,"ion-list-header")(11,"ion-label"),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.TgZ(14,"ion-button",0),t._uU(15),t.ALo(16,"translate"),t.qZA()(),t.YNc(17,Z,1,1,"ng-template",1),t.YNc(18,O,4,3,"ng-template",1),t.qZA(),t.TgZ(19,"ion-list")(20,"ion-list-header")(21,"ion-label"),t._uU(22),t.ALo(23,"translate"),t.qZA(),t.TgZ(24,"ion-button",0),t._uU(25),t.ALo(26,"translate"),t.qZA()(),t.YNc(27,P,1,1,"ng-template",1),t.YNc(28,k,4,3,"ng-template",1),t.qZA()(),t.TgZ(29,"ion-button",2),t.NdJ("click",function(){return i.isBookmarked()?i.removeBookmark():i.addBookmark()}),t.YNc(30,A,1,0,"ion-icon",3),t.YNc(31,v,1,0,"ion-icon",4),t.qZA()()),2&n&&(t.xp6(3),t.Oqu(t.lcZ(4,14,"shuttle.stop."+i.stopName+".name")),t.xp6(3),t.Oqu(t.lcZ(7,16,"shuttle.stop."+i.stopName+".bound")),t.xp6(6),t.Oqu(t.lcZ(13,18,"shuttle.heading."+i.firstDestination)),t.xp6(2),t.Q6J("href",i.firstTimetableURL),t.xp6(1),t.Oqu(t.lcZ(16,20,"shuttle.timetable.all")),t.xp6(2),t.Q6J("ngIf",i.shuttleTimetableStation.length>0),t.xp6(1),t.Q6J("ngIf",0===i.shuttleTimetableStation.length),t.xp6(4),t.Oqu(t.lcZ(23,22,"shuttle.heading."+i.secondDestination)),t.xp6(2),t.Q6J("href",i.secondTimetableURL),t.xp6(1),t.Oqu(t.lcZ(26,24,"shuttle.timetable.all")),t.xp6(2),t.Q6J("ngIf",i.shuttleTimetableTerminal.length>0),t.xp6(1),t.Q6J("ngIf",0===i.shuttleTimetableTerminal.length),t.xp6(2),t.Q6J("ngIf",!i.isBookmarked()),t.xp6(1),t.Q6J("ngIf",i.isBookmarked()))},dependencies:[s.YG,s.PM,s.FN,s.Zi,s.tO,s.Dq,s.gu,s.Ie,s.Q$,s.q_,s.yh,s.yW,u.sg,u.O5,m.X$],styles:["ion-card[_ngcontent-%COMP%]{height:440px;margin-left:4px;margin-right:4px}ion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]{height:295px}ion-list-header[_ngcontent-%COMP%]{padding-left:0}ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{text-align:start;font-size:large;margin-top:5px}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:5px;--padding-start: 0;--padding-end: 0}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:medium}ion-item[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;--inner-padding-end: 0;--min-height: 16px}ion-item[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-direction:row}ion-item[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-size:medium;text-align:end;margin-top:5px;margin-bottom:5px}.DH[_ngcontent-%COMP%]{color:red;font-weight:700}.DY[_ngcontent-%COMP%]{color:green;font-weight:700}.C[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-weight:700}.last-bus[_ngcontent-%COMP%]{color:red;font-weight:700}"]}),e})();const I=function(e,a,n){return{hour:e,minute:a,remained:n}};function N(e,a){if(1&e&&(t.TgZ(0,"ion-item",6)(1,"div",7)(2,"ion-text"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-text"),t._uU(6),t.ALo(7,"translate"),t.qZA()()()),2&e){const n=a.$implicit,i=t.oxw(2);t.xp6(2),t.Tol(n.shuttleType),t.xp6(1),t.Oqu(t.lcZ(4,4,"shuttle.type."+n.shuttleType)),t.xp6(3),t.Oqu(t.xi3(7,6,"shuttle.timetable.item",t.kEZ(9,I,n.shuttleTime.split(":")[0],n.shuttleTime.split(":")[1],i.getRemainedTime(n.shuttleTime))))}}function L(e,a){if(1&e&&t.YNc(0,N,8,13,"ion-item",5),2&e){const n=t.oxw();t.Q6J("ngForOf",n.shuttleTimetable.slice(0,6))}}function Y(e,a){1&e&&(t.TgZ(0,"ion-item",6)(1,"ion-label",8),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"shuttle.out_of_service")))}function U(e,a){1&e&&t._UZ(0,"ion-icon",9)}function H(e,a){1&e&&t._UZ(0,"ion-icon",10)}let R=(()=>{class e{constructor(n){this.shuttleService=n,this.firstDestination="campus",this.shuttleTimetable=[],this.now=new Date,this.shuttleService.shuttleTimetable.subscribe(i=>{this.now=new Date,this.shuttleTimetable=new Array,this.firstTimetableURL="/shuttle/timetable?destination="+this.firstDestination+"&stop="+this.stopName;for(const o of i.filter(l=>"dormitory"===l.startStop.toLowerCase()||"dormitory"!==this.stopName))"DH"===o.shuttleType?this.shuttleTimetable.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaDH)}):"DY"===o.shuttleType?this.shuttleTimetable.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaDY)}):"C"===o.shuttleType&&this.shuttleTimetable.push({period:o.period,shuttleType:o.shuttleType,startStop:o.startStop,shuttleTime:this.addTimeDelta(o.shuttleTime,this.timeDeltaC)});"terminal"===this.stopName&&(this.shuttleTimetable=this.shuttleTimetable.filter(o=>"DY"===o.shuttleType||"C"===o.shuttleType)),this.shuttleTimetable=this.shuttleTimetable.filter(o=>this.getRemainedTime(o.shuttleTime)>0).sort((o,l)=>o.shuttleTime<l.shuttleTime?-1:o.shuttleTime>l.shuttleTime?1:0)})}addTimeDelta(n,i){const[o,l,h]=n.split(":"),c=new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),parseInt(o,10),parseInt(l,10));return c.setMinutes(c.getMinutes()+parseInt(i,10)),String(c.getHours()).padStart(2,"0")+":"+String(c.getMinutes()).padStart(2,"0")}getRemainedTime(n){const[i,o]=n.split(":");return 60*(parseInt(i,10)-this.now.getHours())+(parseInt(o,10)-this.now.getMinutes())}isBookmarked(){return localStorage.getItem("bookmark.shuttle.index")===this.stopName}addBookmark(){localStorage.setItem("bookmark.shuttle.index",this.stopName)}removeBookmark(){localStorage.removeItem("bookmark.shuttle.index")}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(p.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shuttle-single-card"]],inputs:{stopName:"stopName",timeDeltaDH:"timeDeltaDH",timeDeltaDY:"timeDeltaDY",timeDeltaC:"timeDeltaC",firstDestination:"firstDestination"},decls:22,vars:17,consts:[[3,"href"],[3,"ngIf"],["fill","clear",3,"click"],["slot","icon-only","name","bookmark-outline",4,"ngIf"],["slot","icon-only","name","bookmark","color","primary",4,"ngIf"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],[1,"container"],[2,"text-align","center"],["slot","icon-only","name","bookmark-outline"],["slot","icon-only","name","bookmark","color","primary"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-card-subtitle"),t._uU(6),t.ALo(7,"translate"),t.qZA()(),t.TgZ(8,"ion-card-content")(9,"ion-list")(10,"ion-list-header")(11,"ion-label"),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.TgZ(14,"ion-button",0),t._uU(15),t.ALo(16,"translate"),t.qZA()(),t.YNc(17,L,1,1,"ng-template",1),t.YNc(18,Y,4,3,"ng-template",1),t.qZA()(),t.TgZ(19,"ion-button",2),t.NdJ("click",function(){return i.isBookmarked()?i.removeBookmark():i.addBookmark()}),t.YNc(20,U,1,0,"ion-icon",3),t.YNc(21,H,1,0,"ion-icon",4),t.qZA()()),2&n&&(t.xp6(3),t.Oqu(t.lcZ(4,9,"shuttle.stop."+i.stopName+".name")),t.xp6(3),t.Oqu(t.lcZ(7,11,"shuttle.stop."+i.stopName+".bound")),t.xp6(6),t.Oqu(t.lcZ(13,13,"shuttle.heading."+i.firstDestination)),t.xp6(2),t.Q6J("href",i.firstTimetableURL),t.xp6(1),t.Oqu(t.lcZ(16,15,"shuttle.timetable.all")),t.xp6(2),t.Q6J("ngIf",i.shuttleTimetable.length>0),t.xp6(1),t.Q6J("ngIf",0===i.shuttleTimetable.length),t.xp6(2),t.Q6J("ngIf",!i.isBookmarked()),t.xp6(1),t.Q6J("ngIf",i.isBookmarked()))},dependencies:[s.YG,s.PM,s.FN,s.Zi,s.tO,s.Dq,s.gu,s.Ie,s.Q$,s.q_,s.yh,s.yW,u.sg,u.O5,m.X$],styles:["ion-card[_ngcontent-%COMP%]{height:440px;margin-left:4px;margin-right:4px}ion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]{height:295px}ion-list-header[_ngcontent-%COMP%]{padding-left:0}ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{text-align:start;font-size:large;margin-top:5px}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:5px;--padding-start: 0;--padding-end: 0}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:medium}ion-item[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;--inner-padding-end: 0;--min-height: 16px}ion-item[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-direction:row}ion-item[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-size:medium;text-align:end;margin-top:5px;margin-bottom:5px}.DH[_ngcontent-%COMP%]{color:red;font-weight:700}.DY[_ngcontent-%COMP%]{color:green;font-weight:700}.C[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-weight:700}.last-bus[_ngcontent-%COMP%]{color:red;font-weight:700}"]}),e})();var g=r(9632);const S=function(e,a){return{minute:e,destination:a}};function J(e,a){if(1&e&&(t.TgZ(0,"ion-text"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e){const n=t.oxw().index,i=t.oxw(2);t.xp6(1),t.Oqu(t.xi3(2,1,"subway.realtime.item",t.WLB(4,S,i.subwayRealtimeItems.down[n].remainedTime,i.getTerminalName(i.subwayRealtimeItems.down[n].terminalStation))))}}function Q(e,a){if(1&e&&(t.TgZ(0,"ion-text"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e){const n=t.oxw().index,i=t.oxw(2);t.xp6(1),t.Oqu(t.xi3(2,1,"subway.realtime.item",t.WLB(4,S,i.subwayRealtimeItems.up[n].remainedTime,i.getTerminalName(i.subwayRealtimeItems.up[n].terminalStation))))}}function B(e,a){if(1&e&&(t.TgZ(0,"ion-item",2)(1,"div",3),t.YNc(2,J,3,7,"ion-text",4),t.YNc(3,Q,3,7,"ion-text",4),t.qZA()()),2&e){const n=a.index,i=t.oxw(2);t.xp6(2),t.Q6J("ngIf",void 0!==i.subwayRealtimeItems.down[n]),t.xp6(1),t.Q6J("ngIf",void 0!==i.subwayRealtimeItems.up[n])}}function F(e,a){if(1&e&&t.YNc(0,B,4,2,"ion-item",1),2&e){const n=t.oxw();t.Q6J("ngForOf",n.getLongerRealtimeList().slice(0,4))}}function $(e,a){1&e&&(t.TgZ(0,"ion-item",2)(1,"ion-label",5),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"shuttle.out_of_service")))}let z=(()=>{class e{constructor(n,i){this.shuttleService=n,this.translateService=i,this.subwayRealtimeItems={up:[],down:[]},this.shuttleService.subwayRealtime.subscribe(o=>{this.subwayRealtimeItems.up=o.filter(l=>"up"===l.heading),this.subwayRealtimeItems.down=o.filter(l=>"down"===l.heading)})}getLongerRealtimeList(){return this.subwayRealtimeItems.up.length>this.subwayRealtimeItems.down.length?this.subwayRealtimeItems.up:this.subwayRealtimeItems.down}getSubwayDestination(n){switch(n){case"\uc2e0\uc778\ucc9c":case"\uc778\ucc9c":return"incheon";case"\uc624\uc774\ub3c4":return"oido";case"\uc548\uc0b0":return"ansan";case"\uace0\uc0c9":return"gosaek";case"\uc8fd\uc804":return"jukjeon";case"\uc655\uc2ed\ub9ac":return"wangsimni";case"\uccad\ub7c9\ub9ac":return"cheongnyangni";case"\ub2f9\uace0\uac1c":return"danggogae";case"\ub178\uc6d0":return"nowon";case"\ud55c\uc131\ub300":return"hansung";case"\uc11c\uc6b8\uc5ed":return"seoul";case"\uc0ac\ub2f9":return"sadang";case"\uae08\uc815":return"geumjeong";default:return n}}getTerminalName(n){return this.translateService.instant("subway.destination."+this.getSubwayDestination(n))}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(p.v),t.Y36(m.sK))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shuttle-subway-card"]],decls:16,vars:11,consts:[[3,"ngIf"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],[1,"container"],[4,"ngIf"],[2,"text-align","center"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-card-subtitle"),t._uU(6),t.ALo(7,"translate"),t.qZA()(),t.TgZ(8,"ion-card-content")(9,"ion-list")(10,"ion-list-header")(11,"ion-label"),t._uU(12),t.ALo(13,"translate"),t.qZA()(),t.YNc(14,F,1,1,"ng-template",0),t.YNc(15,$,4,3,"ng-template",0),t.qZA()()()),2&n&&(t.xp6(3),t.Oqu(t.lcZ(4,5,"subway.can_i_take")),t.xp6(3),t.Oqu(t.lcZ(7,7,"subway.can_i_take.subtitle")),t.xp6(6),t.Oqu(t.lcZ(13,9,"subway.line.suinbundang.name")),t.xp6(2),t.Q6J("ngIf",i.subwayRealtimeItems.up.length>0||i.subwayRealtimeItems.down.length>0),t.xp6(1),t.Q6J("ngIf",0===i.subwayRealtimeItems.up.length&&0===i.subwayRealtimeItems.down.length))},dependencies:[s.PM,s.FN,s.Zi,s.tO,s.Dq,s.Ie,s.Q$,s.q_,s.yh,s.yW,u.sg,u.O5,m.X$],styles:["ion-card[_ngcontent-%COMP%]{margin-left:4px;margin-right:4px}ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]{padding-bottom:0}ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]{font-size:large}ion-list-header[_ngcontent-%COMP%]{padding-left:0;color:#fabe00}ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{text-align:start;font-size:large;margin-top:5px}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{margin-top:5px;--padding-start: 0;--padding-end: 0}ion-list-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:medium}ion-item[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;--inner-padding-end: 0;--min-height: 16px}ion-item[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-direction:row}ion-item[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-size:medium;text-align:end;margin-top:5px;margin-bottom:5px}"]}),e})(),j=(()=>{class e{constructor(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-birthday-card"]],decls:12,vars:9,consts:[[2,"margin-top","5px"],["fill","clear","href","https://qr.kakaopay.com/FWxVPo8iO"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),t._uU(3),t.ALo(4,"translate"),t.qZA()(),t.TgZ(5,"ion-card-content",0)(6,"ion-label"),t._uU(7),t.ALo(8,"translate"),t.qZA()(),t.TgZ(9,"ion-button",1),t._uU(10),t.ALo(11,"translate"),t.qZA()()),2&n&&(t.xp6(3),t.Oqu(t.lcZ(4,3,"developer.birthday.title")),t.xp6(4),t.hij(" ",t.lcZ(8,5,"developer.birthday.content")," "),t.xp6(3),t.Oqu(t.lcZ(11,7,"developer.birthday.give_me_a_coffee")))},dependencies:[s.YG,s.PM,s.FN,s.Zi,s.Dq,s.Q$,m.X$],styles:["ion-card[_ngcontent-%COMP%]{margin-left:4px;margin-right:4px;height:251px;display:flex;flex-direction:column}ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]{padding-bottom:0}ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]{font-size:large}ion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]{flex:1;overflow-wrap:break-word}"]}),e})();function E(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-dual-card",10),t.qZA())}function X(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-dual-card",11),t.qZA())}function G(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-dual-card",12),t.qZA())}function W(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-single-card",13),t.qZA())}function V(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-single-card",14),t.qZA())}function K(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-birthday-card"),t.qZA())}function tt(e,a){1&e&&(t.ynx(0),t.YNc(1,K,2,0,"ng-template",6),t.BQk())}function et(e,a){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"app-shuttle-subway-card"),t.qZA())}const nt=d.Ps`
    query GetShuttlePeriod($currentDate: String!) {
      shuttle {
        weekday (date: $currentDate),
        period (date: $currentDate)
      }
    }
  `,it=d.Ps`
    query GetShuttleTimetable($period: String!, $weekday: String!, $startTime: String!, $count: Int!) {
      shuttle {
        timetable (period: $period, weekday: $weekday, startTime: $startTime, count: $count) {
          period, startStop, shuttleTime, shuttleType
        }
      },
      subway(routePair: [{stationName: "한대앞", routeName: "수인분당선"}]) {
        realtime {heading, terminalStation, remainedTime}
      }
    }
  `,ot=[{path:"",component:(()=>{class e{constructor(n,i,o,l,h){this.apollo=n,this.shuttleService=i,this.toastController=o,this.loadingService=l,this.translateService=h,this.closestStopIndex=0,this.now=new Date,this.weekday="weekdays",this.period="semester",this.stopLocationList=[{stopName:"shuttle.stop.dormitory.name",latitude:37.29339607529377,longitude:126.83630604103446},{stopName:"shuttle.stop.shuttlecock_o.name",latitude:37.29875417910844,longitude:126.83784054072336},{stopName:"shuttle.stop.subway.name",latitude:37.308494476826155,longitude:126.85310236423418},{stopName:"shuttle.stop.terminal.name",latitude:37.31945164682341,longitude:126.8455453372041},{stopName:"shuttle.stop.shuttlecock_i.name",latitude:37.29869328231496,longitude:126.8377767466817}]}ngOnInit(){const n=new Date(this.now.getTime()-18e5);this.now=new Date,this.shuttleDateSubscription=this.apollo.watchQuery({query:nt,variables:{currentDate:`${this.now.getFullYear()}-${this.now.getMonth()+1}-${this.now.getDate()}`}}).valueChanges.subscribe(({data:i})=>{this.weekday=i.shuttle.weekday,this.period=i.shuttle.period,this.shuttleDateSubscription?.unsubscribe(),this.shuttleQuery=this.apollo.watchQuery({query:it,pollInterval:6e4,variables:{period:this.period,weekday:this.weekday,startTime:`${n.getHours()}:${n.getMinutes()}`,count:5}}),this.shuttleTimetableSubscription=this.shuttleQuery.valueChanges.subscribe(({data:l,loading:h})=>{this.shuttleService.setLoading(h),this.shuttleService.setShuttleTimetable(l.shuttle.timetable),this.shuttleService.setSubwayRealtime(l.subway[0].realtime)})}),this.getLocation().subscribe(i=>{null===localStorage.getItem("bookmark.shuttle.index")&&this.setClosestStop(i.coords.latitude,i.coords.longitude)}),this.shuttleService.loading.subscribe(i=>{i&&this.loadingService.present("shuttle.loading","shuttle.loading").then(()=>{this.shuttleService.loading.subscribe(o=>{o||this.loadingService.dismiss("shuttle.loading").then()})})})}ngOnDestroy(){this.shuttleDateSubscription?.unsubscribe(),this.shuttleTimetableSubscription?.unsubscribe()}refreshShuttleTimetable(n){this.shuttleQuery.refetch().then(()=>{n.target.complete()})}getLocation(){return new w.y(n=>{window.navigator.geolocation.getCurrentPosition(i=>{n.next(i),n.complete()},i=>{})})}setClosestStop(n,i){let o=Number.MAX_VALUE;for(let l=0;l<this.stopLocationList.length;l++){const h=this.getDistance(n,i,this.stopLocationList[l].latitude,this.stopLocationList[l].longitude);h<o&&(o=h,this.closestStopIndex=l)}this.showClosestShuttleStop().then()}getDistance(n,i,o,l){return Math.sqrt(Math.pow(n-o,2)+Math.pow(i-l,2))}setSwiperInstance(n){if(this.swiper=n,null!==localStorage.getItem("bookmark.shuttle.index")){let i=-1;switch(localStorage.getItem("bookmark.shuttle.index")){case"dormitory":i=0;break;case"shuttlecock_o":i=1;break;case"subway":i=2;break;case"terminal":i=3;break;case"shuttlecock_i":i=4}-1!==i&&this.swiper.slideTo(i,1e3,!1)}else this.swiper.slideTo(this.closestStopIndex,1e3,!1)}showClosestShuttleStop(){var n=this;return(0,y.Z)(function*(){yield(yield n.toastController.create({message:n.translateService.instant("shuttle.stop.closest",{name:n.translateService.instant(n.stopLocationList[n.closestStopIndex].stopName)}),buttons:[{text:n.translateService.instant("OK"),role:"cancel"}],cssClass:"toast-closest-stop",duration:1500})).present()})()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(d._M),t.Y36(p.v),t.Y36(s.yF),t.Y36(x.b),t.Y36(m.sK))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shuttle"]],decls:22,vars:9,consts:[[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],["slot","fixed",3,"ionRefresh"],["slidesPerView","1.2","centeredSlides","centeredSlides",3,"swiper"],["swiperSlide",""],["slidesPerView","1.2","centeredSlides","centeredSlides"],[4,"ngIf"],[1,"slide-content"],["stopName","dormitory"],["stopName","shuttlecock_o","timeDeltaDH","0","timeDeltaDY","0","timeDeltaC","0"],["stopName","station","firstDestination","campus","secondDestination","terminal","timeDeltaDH","10","timeDeltaC","10"],["stopName","terminal","firstDestination","campus","timeDeltaDY","10","timeDeltaC","15"],["stopName","shuttlecock_i","firstDestination","dormitory","timeDeltaDH","20","timeDeltaDY","20","timeDeltaC","25"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3),t.ALo(4,"translate"),t.qZA()()(),t.TgZ(5,"ion-content",1)(6,"ion-header",2)(7,"ion-toolbar")(8,"ion-title",3),t._uU(9),t.ALo(10,"translate"),t.qZA()()(),t.TgZ(11,"ion-refresher",4),t.NdJ("ionRefresh",function(l){return i.refreshShuttleTimetable(l)}),t._UZ(12,"ion-refresher-content"),t.qZA(),t.TgZ(13,"swiper",5),t.NdJ("swiper",function(l){return i.setSwiperInstance(l)}),t.YNc(14,E,2,0,"ng-template",6),t.YNc(15,X,2,0,"ng-template",6),t.YNc(16,G,2,0,"ng-template",6),t.YNc(17,W,2,0,"ng-template",6),t.YNc(18,V,2,0,"ng-template",6),t.qZA(),t.TgZ(19,"swiper",7),t.YNc(20,tt,2,0,"ng-container",8),t.YNc(21,et,2,0,"ng-template",6),t.qZA()()),2&n&&(t.Q6J("translucent",!0),t.xp6(3),t.hij(" ",t.lcZ(4,5,"shuttle.title")," "),t.xp6(2),t.Q6J("fullscreen",!0),t.xp6(4),t.Oqu(t.lcZ(10,7,"shuttle.title")),t.xp6(11),t.Q6J("ngIf",11===i.now.getMonth()&&12===i.now.getDate()))},dependencies:[s.W2,s.Gu,s.nJ,s.Wo,s.wd,s.sr,u.O5,q,R,g.nF,g.YC,z,j,m.X$],styles:["app-shuttle-dual-card[_ngcontent-%COMP%]{width:100%}app-shuttle-single-card[_ngcontent-%COMP%]{width:100%}swiper[_ngcontent-%COMP%]{width:100%;height:470px}.slide-content[_ngcontent-%COMP%]{width:100%;height:400px}"]}),e})()}];let at=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[f.Bz.forChild(ot),f.Bz]}),e})(),st=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Pc,u.ez,m.aw]}),e})(),lt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Pc,u.ez,m.aw]}),e})(),rt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Pc,u.ez,m.aw]}),e})(),ut=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Pc,u.ez,b.u5,m.aw,C.e,at,st,lt,g.kz,rt]}),e})()}}]);