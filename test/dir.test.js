var rxfs = require('../rxjs-nodefs');
var rimraf = require('rimraf');
var fs = require('fs');
var expect = require('chai').expect;

var tempDir = './test/temp';
var dirA = tempDir + '/a';
var dirB = tempDir + '/b';
var dirB_C_D = tempDir + '/b/c/d';

describe('dir api test', function() {
    before(function(){
        rimraf.sync(tempDir, {});
        fs.mkdirSync(tempDir);
        console.log('clean up before test, folder: ' + tempDir)
    });
    
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
        
        rxfs.readDirAsObservable(tempDir)
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
        
        rxfs.walkDirAsObservable(tempDir, 0)
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
        
        rxfs.walkDirAsObservable(tempDir, 2)
            .subscribe(x => {
                items.push(x);
            }, e => {
                console.log(e);
            },
            () => { 
                expect(items.length).to.equal(4);
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
                items.push(x)
            }, e => {
                console.log(e);
            }, () => {
                expect(items.length).to.equal(3);
                done();
            }); 
        
    });
    
    after(function(){
        rimraf.sync(tempDir, {});
        console.log('clean up after test, folder: ' + tempDir)
    });
});