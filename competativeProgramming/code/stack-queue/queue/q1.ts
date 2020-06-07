/*Cat and dog Animal sheter shelter */
interface service {
  isEmpty: () => boolean;
  isFull: () => boolean;
  enqueue: (body: { name: string, category: string, age: number }) => void ;
}
class AnimalShelter<T> {
  private maxSize: number;
  private length: number;
  private queue: T[];

  constructor(maxSize) {
    this.maxSize = maxSize;
    this.length = 0;
    this.queue = new Array <T> (maxSize);
  }

  public isEmpty(): boolean{
    return this.length == 0;
  }

  public isFull(): boolean{
    return this.length == this.maxSize;
  }

  public enqueue(newItem: T):void {
    if (this.isFull()) throw new Error('Overflow queue');
    else this.queue[this.length++] = newItem;
  }

  public dequeueAny(): T{
    if (this.isEmpty()) throw new Error('Outflow queue.');
    const pet = this.queue[0];
    for (let i = 0; i < this.length; i++){
      this.queue[i] = this.queue[i++];
    }
    return pet;
  }

  public dequeDog(): T{
    if (this.isEmpty()) throw Error('No animal');
    var pet = null;
    for (let i = 0; i < this.length; i++){
      if (this.queue[i]['type'] == 'dog'){
        return pet = this.queue[i];
        break;
      }
    }
    if (!pet) throw new Error('Outflow of dog.')
    return pet;
  }

  public dequeCat(): T{
    if (this.isEmpty()) throw Error('No animal');
    var pet = null;
    for (let i = 0; i < this.length; i++){
      if (this.queue[i]['type'] == 'cat'){
        return pet = this.queue[i];
        break;
      }
    }
    if (!pet) throw new Error('Outflow of cat.')
    return pet;
  }

}

interface animal{
  name: string;
  type: string;
}

const a = new AnimalShelter<animal>(100);
a.isFull()
a.enqueue({ name: "chico", type: "cat" });
console.log(a.dequeCat())