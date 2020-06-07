var AnimalShelter = /** @class */ (function () {
    function AnimalShelter(maxSize) {
        this.maxSize = maxSize;
        this.length = 0;
        this.queue = new Array(maxSize);
    }
    AnimalShelter.prototype.isEmpty = function () {
        return this.length == 0;
    };
    AnimalShelter.prototype.isFull = function () {
        return this.length == this.maxSize;
    };
    AnimalShelter.prototype.enqueue = function (newItem) {
        if (this.isFull())
            throw new Error('Overflow queue');
        else
            this.queue[this.length++] = newItem;
    };
    AnimalShelter.prototype.dequeueAny = function () {
        if (this.isEmpty())
            throw new Error('Outflow queue.');
        var pet = this.queue[0];
        for (var i = 0; i < this.length; i++) {
            this.queue[i] = this.queue[i++];
        }
        return pet;
    };
    AnimalShelter.prototype.dequeDog = function () {
        if (this.isEmpty())
            throw Error('No animal');
        var pet = null;
        for (var i = 0; i < this.length; i++) {
            if (this.queue[i]['type'] == 'dog') {
                return pet = this.queue[i];
                break;
            }
        }
        if (!pet)
            throw new Error('Outflow of dog.');
        return pet;
    };
    AnimalShelter.prototype.dequeCat = function () {
        if (this.isEmpty())
            throw Error('No animal');
        var pet = null;
        for (var i = 0; i < this.length; i++) {
            if (this.queue[i]['type'] == 'cat') {
                return pet = this.queue[i];
                break;
            }
        }
        if (!pet)
            throw new Error('Outflow of cat.');
        return pet;
    };
    return AnimalShelter;
}());
var a = new AnimalShelter(100);
a.isFull();
a.enqueue({ name: "chico", type: "cat" });
console.log(a.dequeCat());
