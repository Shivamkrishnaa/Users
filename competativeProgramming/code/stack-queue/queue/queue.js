var Queue = /** @class */ (function () {
    function Queue(maxSize) {
        this.maxSize = maxSize > 0 ? maxSize : 10;
        this.length = 0;
        this.queue = new Array(this.maxSize);
    }
    Queue.prototype.isEmpty = function () {
        return this.length == 0;
    };
    Queue.prototype.isFull = function () {
        return this.length == this.maxSize;
    };
    Queue.prototype.enqueue = function (newItem) {
        if (this.isFull())
            throw new Error('Queue overflow');
        else
            this.queue[this.length++] = newItem;
    };
    Queue.prototype.dequeue = function () {
        if (this.isEmpty())
            throw new Error('Queue underflow');
        else {
            var retVal = this.queue[0];
            for (var i = 0; i < this.length; i++) {
                this.queue[i] = this.queue[i + 1];
            }
            this.length--;
            return retVal;
        }
    };
    Queue.prototype.peek = function () {
        if (this.isEmpty())
            throw new Error('Queue is Empty');
        return this.queue[0];
    };
    Queue.prototype.queueContents = function () {
        console.log('Queue contents');
        console.log(this.length);
        for (var i = 0; i < this.length; i++) {
            console.log(i);
            console.log("queue[" + i + "]= " + this.queue[i]);
        }
    };
    return Queue;
}());
var numberQueue = new Queue(100);
numberQueue.enqueue(1);
console.log("peek: " + numberQueue.peek());
var stringQueue = new Queue(50);
stringQueue.enqueue("a");
console.log("peek: " + stringQueue.peek());
var checkoutLane = new Queue(10);
var customer1 = { name: "Shivam", age: 2, isMember: true, rewardsCard: "card" };
checkoutLane.enqueue(customer1);
console.log("peek: " + checkoutLane.peek().name);
checkoutLane.queueContents();
