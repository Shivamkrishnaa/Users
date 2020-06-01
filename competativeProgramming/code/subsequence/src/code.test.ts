import LongestIncreasingSubsequence from './code';

test('Longest Subsequence 1,2,3 ', ()=>{
    expect(new LongestIncreasingSubsequence([1,2,3,4]).getAns()).toBe(4);
})

test('Longest Subsequence 23,10,22,5,33,8,9,21,50,41,60,80,99, 22,23,24,25,26,27 ', ()=>{
    expect(new LongestIncreasingSubsequence([23,10,22,5,33,8,9,21,50,41,60,80,99,22,23,24,25,26,27]).getAns()).toBe(10);
})