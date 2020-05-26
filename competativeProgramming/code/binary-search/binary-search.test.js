// import { binarySearch } from './code';
var binarySearch = require('./code').code;
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
