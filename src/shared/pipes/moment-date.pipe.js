var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
var MomentDatePipe = (function () {
    function MomentDatePipe() {
    }
    MomentDatePipe.prototype.transform = function (value, format) {
        if (value) {
            return moment(value).format(format);
        }
        else {
            return;
        }
    };
    return MomentDatePipe;
}());
MomentDatePipe = __decorate([
    Pipe({
        name: 'momentDate'
    })
], MomentDatePipe);
export { MomentDatePipe };
//# sourceMappingURL=moment-date.pipe.js.map