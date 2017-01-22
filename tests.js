var rxfs = require('./rxjs-nodefs');
var Rx = require('rxjs/Rx');
                                                                                                                                /*
// create a file
rxfs.writeFileAsObservable('a.txt', 'content in a.txt')
        .mergeMap(file => rxfs.fileStatAsObservable(file.path))
        .subscribe(x => console.log(x), e => console.error(e)); 

        
rxfs.writeFileAsObservable('./b/b.txt', 'content in b.txt')
        .subscribe(x => console.log(x), e => console.error(e));     
        
        
      
        
// create a file with directories include this file
rxfs.forceWriteFileAsObservable('./b/b.txt', 'content in b.txt')
        .subscribe(x => console.log(x), e => console.error(e));     

var subFiles = ['./b/b1.txt', './b/b2.txt', './b/b3.txt', './b/b4.txt', './b/c/c1.txt', './b/c/c2.txt']       
Rx.Observable.from(subFiles)
        .mergeMap((path) => rxfs.forceWriteFileAsObservable(path, 'content in ' + path))
        .subscribe(x => console.log(x), e => console.error(e));     
        
        
        
        
// read content of a file
rxfs.readFileAsObservable('./b/b.txt')
        .subscribe(x => console.log(x), e => console.error(e));    
              
        
        
        
// delete a file
rxfs.rmFileAsObservable('./b/b.txt')
        .subscribe(x => console.log(x), e => console.error(e));    

        
        
                                                                                                                                                        
// list items in a directory
rxfs.readDirAsObservable('./b')
        .subscribe(x => console.log(x), e => console.error(e));    

        
        
        
// walk a directory to list all the items and items in sub-directory
// use depth to control the walk depth of directory
rxfs.walkDirAsObservable('./b', 1)
        .subscribe(x => console.log(x), e => console.error(e));    

        
rxfs.walkDirAsObservable('./b', 2)
        .map(fsObj => ({name: fsObj.name, path: fsObj.path, isDir: fsObj.stats.isDirectory()}))
        .subscribe(x => console.log(x), e => console.error(e));            
        
        
        
                                                                                                                                                                    
        
// create a directory
rxfs.mkdirAsObservable('./d')
        .subscribe(x => console.log(x), e => console.error(e));       

        
rxfs.mkdirAsObservable('./e/f')
        .subscribe(x => console.log(x), e => console.error(e));           
    
    */
    

// create a directory with directories include this directory 
rxfs.forceMkdirAsObservable('./e/ee/f</')
        .subscribe(x => console.log('i' + x), e => console.log('e' + e));   

// delete an empty directory


// force delete an directory and items in this directory

