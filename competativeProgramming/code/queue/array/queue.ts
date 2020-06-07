class Queue<T> {
  private queue: T[];
  private length: number;
  private /*readOnly*/ maxSize: number;

  public constructor(maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.length = 0;
    this.queue = new Array<T>(this.maxSize); 
  }

  public isEmpty(): boolean {
    return this.length == 0;
  }

  public isFull():boolean {
    return this.length == this.maxSize;
  }

  public enqueue(newItem: T): void {
    if (this.isFull()) throw new Error('Queue overflow');
    else this.queue[this.length++] = newItem;
  }

  public dequeue() {
    if (this.isEmpty()) throw new Error('Queue underflow');
    else {
      const retVal = this.queue[0];
      for (let i = 0; i < this.length; i++){
        this.queue[i] = this.queue[i + 1];
      }
      this.length--;
      return retVal;
    }
  }

  public peek(): T {
    if (this.isEmpty()) throw new Error('Queue is Empty');
    return this.queue[0];
  }

  public queueContents(): void {
    console.log('Queue contents');
    console.log(this.length)
    for (let i = 0; i < this.length; i++){console.log(i)
      console.log(`queue[${i}]= ${this.queue[i]}`)
    }
  }
}
const numberQueue = new Queue<number>(100);
numberQueue.enqueue(1);
console.log(`peek: ${numberQueue.peek()}`);

const stringQueue = new Queue<string>(50);
stringQueue.enqueue("a");
console.log(`peek: ${stringQueue.peek()}`);

interface Customer {
  name: string;
  age: number;
  isMember: boolean;
  rewardsCard?: string;
}

const checkoutLane = new Queue<Customer>(10);
const customer1 = { name : "Shivam" , age : 2, isMember: true, rewardsCard: "card" }
checkoutLane.enqueue(customer1);
console.log(`peek: ${checkoutLane.peek().name}`);
checkoutLane.queueContents()
