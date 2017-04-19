var rxfs = require('./rxjs-nodefs');
var Rx = require('rxjs/Rx');
/*
// create a file
rxfs.$$writeFile('a.txt', 'content in a.txt')
        .mergeMap(file => rxfs.fileStatAsObservable(file.path))
        .subscribe(x => console.log(x), e => console.error(e)); 

        
rxfs.$$writeFile('./b/b.txt', 'content in b.txt')
        .subscribe(x => console.log(x), e => console.error(e));     
        
        
      
        
// create a file with directories include this file
rxfs.$$forceWriteFile('./b/b.txt', 'content in b.txt')
        .subscribe(x => console.log(x), e => console.error(e));     
*/
        
        /*
        
var subFiles = ['./b/b1.txt', './b/b2.txt', './b/b3.txt', './b/b4.txt', './b/c/c1.txt', './b/c/c2.txt']       
Rx.Observable.from(subFiles)
        .mergeMap((path) => rxfs.$$forceWriteFile(path, 'content in ' + path))
        .subscribe(x => console.log(x), e => console.error(e));     
        
        
        
        
// read content of a file
rxfs.$$readFile('./b/b.txt')
        .subscribe(x => console.log(x), e => console.error(e));    
              
        
        
        
// delete a file
rxfs.$$rmFile('./b/b.txt')
        .subscribe(x => console.log(x), e => console.error(e));    

        
        
                                                                                                                                                        
// list items in a directory
rxfs.$$walkDir('./test')
        .subscribe(x => console.log(x.name), e => console.error(e));    

   
        
// walk a directory to list all the items and items in sub-directory
// use depth to control the walk depth of directory
rxfs.$$walkDir('./b', 1)
        .subscribe(x => console.log(x), e => console.error(e));    
*/     
       
        
rxfs.$$walkDir('./', 5)
        .map(fsObj => ({name: fsObj.name, path: fsObj.path, isDir: fsObj.stats.isDirectory()}))
        .subscribe(x => console.log(x), e => console.error(e));            
        
        
       /*  
                                                                                                                                                                    
        
// create a directory
rxfs.$$mkdir('./d')
        .subscribe(x => console.log(x), e => console.error(e));       

        
rxfs.$$mkdir('./e/f')
        .subscribe(x => console.log(x), e => console.error(e));           
    
    
    


// create a directory with directories include this directory 
rxfs.$$forceMkdir('./e/f/g/h/i/j')
        .subscribe(x => console.log(x), e => console.log(e));   




// delete an empty directory
rxfs.$$rmdir('./e/f/g/')
        .subscribe(x => console.log(x), e => console.log(e));   

rxfs.$$rmdir('./e/')
        .subscribe(x => console.log(x), e => console.log(e));         



// force delete an directory and items in this directory
rxfs.$$forceRmdir('./e')
        .subscribe(x => console.log(x), e => console.log(e));  


*/