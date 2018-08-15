function Dinner () {
    this.meat = '白饭';
    this.drink = '白开水';
}

Dinner.prototype.toString = function () {
    return `今日特价晚餐：${this.meat} 配 ${this.drink}`;
}

var Decorator = function (dinner) {
    this.dinner = dinner;
}

Decorator.prototype.toString = function () {
    return this.dinner.toString();
}

var AddMeat = function (dinner) {
    dinner.meat = '鳗鱼草饭';
    Decorator.call(this, dinner);
}

var AddDrink = function (decorator) {
    // 假如你想多个装饰器的话
    decorator.dinner.drink = 'mojito';
    Decorator.call(this, decorator);
}

AddMeat.prototype = new Decorator();
AddDrink.prototype = new Decorator();

AddMeat.prototype.toString = function () {
    return this.dinner.toString();
}
AddDrink.prototype.toString = function () {
    return this.dinner.toString();
}

var todayDinner = new Dinner('白饭', '白开水');
todayDinner = new AddMeat(todayDinner);
todayDinner = new AddDrink(todayDinner);

console.log(`${todayDinner}`);