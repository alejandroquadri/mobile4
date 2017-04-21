var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
var SortAddPipe = (function () {
    function SortAddPipe() {
    }
    SortAddPipe.prototype.transform = function (array, field, asc) {
        if (array) {
            var arrayAdded = this.addMeal(array);
            if (asc) {
                arrayAdded.sort(function (a, b) {
                    if (a[field] < b[field]) {
                        return -1;
                    }
                    else if (a[field] > b[field]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                return arrayAdded;
            }
            else {
                arrayAdded.sort(function (a, b) {
                    if (a[field] > b[field]) {
                        return -1;
                    }
                    else if (a[field] < b[field]) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                return arrayAdded;
            }
        }
        else {
            return [];
        }
    };
    SortAddPipe.prototype.addMeal = function (array) {
        if (!this.findMeal(array, 'desayuno')) {
            array.push({ meal: 'desayuno', order: 0, state: 'pending' });
        }
        if (!this.findMeal(array, 'colacion mañana')) {
            array.push({ meal: 'colacion mañana', order: 1, state: 'pending' });
        }
        if (!this.findMeal(array, 'almuerzo')) {
            array.push({ meal: 'almuerzo', order: 2, state: 'pending' });
        }
        if (!this.findMeal(array, 'colacion tarde')) {
            array.push({ meal: 'colacion tarde', order: 3, state: 'pending' });
        }
        if (!this.findMeal(array, 'te')) {
            array.push({ meal: 'te', order: 4, state: 'pending' });
        }
        if (!this.findMeal(array, 'cena')) {
            array.push({ meal: 'cena', order: 5, state: 'pending' });
        }
        return array;
    };
    SortAddPipe.prototype.findMeal = function (array, meal) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].meal === meal) {
                return true;
            }
        }
        return false;
    };
    return SortAddPipe;
}());
SortAddPipe = __decorate([
    Pipe({
        name: 'sort-add'
    }),
    Injectable()
], SortAddPipe);
export { SortAddPipe };
//# sourceMappingURL=sort-add.pipe.js.map