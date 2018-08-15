
// 参数和defineProperty一样
function addMeat(target, key, descriptor) {
    const method = descriptor.value;
    let ret;
    descriptor.value = (...args) => {
        args[0] = '鳗鱼炒饭';
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor
}

function addDrink(target, key, descriptor) {
    const method = descriptor.value;
    let ret;
    descriptor.value = (...args) => {
        args[1] = '莫吉托';
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor
}

function addDimSum(isAdd) {
    return function(target) {
        target.isAdd = isAdd;
        let extra = isAdd ? '  (加餐加餐！另送一份拿破仑蛋糕' : '';
        let method = target.prototype.toString;
        target.prototype.toString = (...args) => {
            return method.apply(target.prototype, args) + extra
        }
        return target
    }
}

@addDimSum(true)
class Dinner {
    constructor(meat, drink) {
        this.init(meat, drink);
    }

    @addMeat
    @addDrink
    init (meat, drink) {
        this.meat = meat;
        this.drink = drink
    }

    toString () {
        return `今日特价晚餐：${this.meat} 配 ${this.drink}`;
    }
}

let todayDinner = new Dinner('白饭', '白开水');

console.log(`${todayDinner}`);