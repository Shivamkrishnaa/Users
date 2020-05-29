// import { binarySearch } from './code';
var binarySearch = require('./code').code;
var fairLoad = require('./problem-1/fairload');
describe("Testing binary search", function() {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });
    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var testCase = [[1,3,4,5],3];
    var x = binarySearch(testCase[0],testCase[1])
    it("to verify it return correct index", function(done) {
        expect(x).toBe(1);
        done()
    });
    
});
describe("Testing FairLoad problem", function() {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
    });
    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout+10;
    });

    var testCase = [10,20,30,40,50,60,70,80,90];
    var workers = 3
    var x = fairLoad(testCase,workers)
    it("to verify it return correct index", function(done) {
        console.log("done", done)
        expect(x).toBe(170);
        done()
    });
    
});
