var mathjs = require('mathjs');
function fairLoad ( arr , workers){

        var n=arr.length;
        var low=Math.max(...arr);
        var high= arr.reduce((p,a)=>{ return p+a ;},0);
        while( low < high){
            var mid = mathjs.floor(low + (high - low)/2);
            var required = 1 ; var workLoad = 0;
            for(var i=0; i<n; ++i){
                if(workLoad+arr[i]<=mid){
                    workLoad+=arr[i];
                }
                else{
                    ++required;
                    workLoad=arr[i];
                }
            }
            if(required<= workers){
                high = workLoad;
            }
            else {
                low=mid+1;
            }
        }
        return low;

    }
module.exports= fairLoad;