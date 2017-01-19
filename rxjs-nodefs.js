var fs = require('fs');
var Rx = require('rxjs/Rx');
var Path = require('path');
var _ = require('underscore');

var fileStatAsObservable = (path) => Rx.Observable.create(function(observer) {
	
    var cb = (e, stats) => {
        if(e)  observer.error(e);
        
        observer.next({
            extension: Path.extname(path),
            name: Path.basename(path, this.extension),
            location: Path.dirname(path),
            path: path,
            stats: stats
        })
        observer.complete();
    };
    
    fs.stat(path, cb);
    
});




var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readfile);
var writeFileAsObservable =  Rx.Observable.bindNodeCallback(fs.writeFile);
var forceWriteFileAsObservable = (path, file) => forceMkdirAsObservable(path, true)
                                                                            .ignoreElements()
                                                                            .concat(writeFileAsObservable(path, file));
var rmFileAsObservable = Rx.Observable.bindNodeCallback(fs.unlink);




var readDirAsObservable = (path) => Rx.Observable.create(function(observer) {
    var cb = (e, items) => {
        if(e)  observer.error(e);
        
        items = _.map(items, _.partial((a, b) => a + '/' + b, path));
        _.each(items, item => observer.next(item));
        observer.complete();
    };
    
    fs.readdir(path, cb);
    
});
var walkDirAsObservable = (path, depth) => {
    if(isNaN(depth)) depth = 1;
    
    var readDirWithStatsAsObservable = (path) => {
        depth -= 1;
        return readDirAsObservable(path)
                        .mergeMap(path => fileStatAsObservable(path));
    }
    
    return readDirWithStatsAsObservable(path)
                    .expand(
                        fsObj => (fsObj.stats.isDirectory() && depth > 0) ? readDirWithStatsAsObservable(fsObj.path) : Rx.Observable.empty()
                    );
};
var mkdirAsObservable = Rx.Observable.bindNodeCallback(fs.mkdir);
var forceMkdirAsObservable = (path) => {
    var dirs = path.split('/');
    if(dirs[0] === '.') dirs.pop();
    
    return Rx.Observable.from(dirs)
                    .scan((a, b) => a + '/' + b)
                    .mergeMap(mkdirAsObservable)
                    .onErrorResumeNext(Rx.Observable.empty());
};
var rmdirAsObservable = Rx.Observable.bindNodeCallback(fs.rmdir);
var forceRmdirAsObservable = (path) => {

    var readDirWithStatsAsObservable = (path) => {
        return readDirAsObservable(path)
                        .mergeMap(path => fileStatAsObservable(path));
    }
    return readDirWithStatsAsObservable(path)
                    .mergeMap(fsObj => fsObj.stats.isDirectory() ? forceRmdirAsObservable(fsObj.path) : rmFileAsObservable(fsObj.path))
                    .concat(rmdirAsObservable(path));
                   
                 
};
