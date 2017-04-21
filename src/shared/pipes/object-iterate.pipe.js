var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ObjectIteratePipe = (function () {
    function ObjectIteratePipe() {
    }
    ObjectIteratePipe.prototype.transform = function (value, key, field) {
        if (value) {
            var keyArr = Object.keys(value), dataArr_1 = [];
            keyArr.forEach(function (item) {
                if (item[0] === '$') {
                    return;
                }
                if (key) {
                    value[item].$key = item;
                }
                dataArr_1.push(value[item]);
            });
            if (field) {
                dataArr_1.sort(function (a, b) {
                    return a[field] > b[field] ? 1 : -1;
                });
            }
            return dataArr_1;
        }
        else {
            return;
        }
    };
    return ObjectIteratePipe;
}());
ObjectIteratePipe = __decorate([
    Pipe({
        name: 'objectIterate'
    })
], ObjectIteratePipe);
export { ObjectIteratePipe };
//# sourceMappingURL=object-iterate.pipe.js.map