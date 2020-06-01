/* Longest Increasing subsequence*/

class LongestIncreasingSubsequence { 
  private arr: Array<number>;
  public temp: Array<number>;
  constructor(array : Array<number>) {
    this.arr = array;
    this.temp = [];
    this.getLength();
    this.generteTemp();
    this.findSequence();
  }
  private getLength() {
    return this.arr.length;
  }
  private add(num : number) {
    this.temp.push(num);
  }
  private generteTemp() {
    for (var i = 0; i < this.getLength(); i++){
      this.add(1);
    }
  }
  private findSequence() {
    for (var i = 1; i < this.getLength(); i++){
      for (var j = 0 ; j < i; j++){
        if (this.arr[j] < this.arr[i]) {
          if( this.temp[j]+1 >this.temp[i]  )this.temp[i] =  this.temp[j] + 1;
        }
      }
    }
  }
  public getAns() {
    return Math.max(...this.temp);
  }

}
// const ans = new LongestIncreasingSubsequence([1, 2, 3]);
// console.log(ans.getAns());
export default LongestIncreasingSubsequence;