var rxfs = require('../rxjs-nodefs');
var expect = require('chai').expect;

var testDir = './test/temp';
var dirA = testDir + '/a';
var dirB = testDir + '/b';
var dirB_C_D = testDir + '/b/c/d';

describe('dir api test', function() {

    it('mkdirAsObservable - create a directory', function(done) {
        rxfs.mkdirAsObservable(dirA)
            .subscribe(x => {
                expect(x).to.equal(dirA);
                done();
            }, e => {
                console.log(e);
            }); 
        
    });
    
    it('mkdirAsObservable - create a directory with a sub-directory', function(done) {
        rxfs.mkdirAsObservable(dirB_C_D)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOENT');
                done();
            }); 
        
    });
    
    it('forceMkdirAsObservable - create a directory with directories include this directory', function(done) {
        var dirs = [];

        rxfs.forceMkdirAsObservable(dirB_C_D)
            .subscribe(x => {
                dirs.push(x)
            }, e => {
                console.log(e);
            },
            () => {
                expect(dirs.length).to.equal(3);
                expect(dirs[2]).to.equal(dirB_C_D)
                done();
            }); 
        
    });    
    
    it('readDirAsObservable - list items in a directory', function(done) {
        var items =[];
        
        rxfs.readDirAsObservable(testDir)
            .subscribe(x => {
                items.push(x);
            }, e => {
                console.log(e);
            },
            () => {
                expect(items.length).to.equal(2);
                done();
            }); 
        
    });
    
    it('walkDirAsObservable - walk a directory to list all the items and items in sub-directory', function(done) {
        var items =[];
        
        rxfs.walkDirAsObservable(testDir, 1)
            .subscribe(x => {
                items.push(x);
            }, e => {
                console.log(e);
            },
            () => {
                console.log(items.length)
                expect(items.length).to.equal(2);
                done();
            }); 
        
    });
    
    it('walkDirAsObservable - walk a directory to list all the items and items in sub-directory', function(done) {
        var items =[];
        
        rxfs.walkDirAsObservable(testDir, 2)
            .subscribe(x => {
                items.push(x);
            }, e => {
                console.log(e);
            },
            () => { console.log(items.length)
                expect(items.length).to.equal(2);
                done();
            }); 
        
    });
    
    it('rmdirAsObservable - delete an empty directory', function(done) {
        rxfs.rmdirAsObservable(dirA)
            .subscribe(x => {
                expect(x).to.equal(dirA);
                done();
            }, e => {
                console.log(e);
            }); 
        
    });
       
    it('rmdirAsObservable - delete an empty directory', function(done) {
        rxfs.rmdirAsObservable(dirB)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOTEMPTY');
                done();
            }); 
        
    });

    it('forceRmdirAsObservable - force delete an directory and items in this directory', function(done) {
        var items =[];
        
        rxfs.forceRmdirAsObservable(dirB)
            .subscribe(x => {
                console.log(x)
                expect(x).to.equal(dirA);
                done();
            }, e => {
                console.log(e);
            }); 
        
    });
    
});