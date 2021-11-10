var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AMOUNT = 20;
var platformBrowser = ng.platformBrowser, platformBrowserDynamic = ng.platformBrowserDynamic, core = ng.core;
var BrowserModule = platformBrowser.BrowserModule;
var Component = core.Component, NgModule = core.NgModule, Input = core.Input;
var Taco = /** @class */ (function () {
    function Taco() {
    }
    Taco = __decorate([
        Component({
            selector: 'taco',
            template: "\n    <h1>\uD83C\uDF2E</h1>\n  "
        })
    ], Taco);
    return Taco;
}());
var AuthorType = /** @class */ (function () {
    function AuthorType() {
    }
    return AuthorType;
}());
var Post = /** @class */ (function () {
    function Post() {
    }
    return Post;
}());
var POSTS = new Array(AMOUNT).fill('').map(function (d, i) { return ({
    author: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar()
    },
    title: faker.company.bs(),
    hero: "https://picsum.photos/420/320?image=" + i
}); });
var Card = /** @class */ (function () {
    function Card() {
    }
    __decorate([
        Input()
    ], Card.prototype, "post");
    __decorate([
        Input()
    ], Card.prototype, "pos");
    __decorate([
        Input()
    ], Card.prototype, "active");
    __decorate([
        Input()
    ], Card.prototype, "index");
    Card = __decorate([
        Component({
            selector: 'Card',
            template: "\n    <div\n      class='card'\n      [attr.data-gone]='pos < 0 && pos !== 0'\n      [attr.data-coming]='pos > 0 && pos !== 0'\n      [attr.data-pos]='pos'>\n      <img class='card__hero' [src]='post.hero'/>\n      <div class='card__content-mark'>\n        <article class='card__content'>\n          <h1 class='card__title'>{{post.title.charAt(0).toUpperCase() + post.title.slice(1)}}</h1>\n          <h2 class='card__author'>{{post.author.firstName}} {{post.author.lastName}}</h2>\n        </article>\n      </div>\n      <img class='card__avatar' [src]='post.author.avatar'/>\n    </div>\n  "
        })
    ], Card);
    return Card;
}());
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.active = 0;
        this.posts = POSTS;
        this.amount = 20;
        this.magicNumber = 3;
        this.setActive = function (active) { return _this.active = active; };
        this.getPos = function (i) {
            var _a = _this, active = _a.active, amount = _a.amount, magicNumber = _a.magicNumber;
            var pos = i - active;
            if (active >= amount - magicNumber && i <= magicNumber) {
                pos = i + (amount - active);
            }
            else if (active <= magicNumber && i >= amount - magicNumber) {
                pos = 0 - (amount - i + active);
            }
            return pos;
        };
    }
    App = __decorate([
        Component({
            selector: 'app',
            template: "\n    <ul class='card-track'>\n      <Card *ngFor='let post of posts; let i = index' [post]='post' [index]='i' [active]='active' [pos]='getPos(i)'></Card>\n    </ul>\n    <div class='card-actions'>\n      <button (click)='setActive(active - 1 >= 0 ? active - 1 : amount - 1)'>\n        <svg viewBox=\"0 0 24 24\">\n          <path fill=\"#fff\" d=\"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z\" />\n        </svg>\n      </button>\n      <button (click)='setActive(active + 1 > amount - 1 ? 0 : active + 1)'>\n        <svg viewBox=\"0 0 24 24\">\n          <path fill=\"#fff\" d=\"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z\" />\n        </svg>\n      </button>\n    </div>\n  "
        })
    ], App);
    return App;
}());
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule],
            declarations: [App, Taco, Card],
            bootstrap: [App]
        })
    ], AppModule);
    return AppModule;
}());
platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);