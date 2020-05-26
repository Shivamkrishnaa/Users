const readLine = require('readline').createInterface({ input: process.stdin , output: process.stdout });

function binarySearch( arr ,i ,j , x){
   if( j >= i){
       let mid = Math.floor((i + j )/2) + 1;
        if(arr[mid]==x) return mid ; 
        else if(arr[mid]>x ) return binarySearch( arr , i, j-mid , x )
        else return binarySearch( arr , i+mid, j , x )
   }
   return -1;
}
exports.code = function(arr,x){
   var myarr = arr || [2,3,4,5,10,11,12];
   var length = myarr.length;
   return binarySearch(myarr , 0 ,( length -1) , x); 
}

