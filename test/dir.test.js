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
    
    it('$$mkdir - create a directory', function(done) {
        rxfs.$$mkdir(dirA)
            .subscribe(x => {
                expect(x).to.equal(dirA);
                done();
            }, e => {
                console.log(e);
            }); 
        
    });
    
    it('$$mkdir - create a directory with a sub-directory', function(done) {
        rxfs.$$mkdir(dirB_C_D)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOENT');
                done();
            }); 
        
    });
    
    it('$$forceMkdir - create a directory with directories include this directory', function(done) {
        var dirs = [];

        rxfs.$$forceMkdir(dirB_C_D)
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
    
    it('$$readDir - list items in a directory', function(done) {
        var items =[];
        
        rxfs.$$readDir(tempDir)
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
    
    it('$$walkDir - walk a directory to list all the items and items in sub-directory', function(done) {
        var items =[];
        
        rxfs.$$walkDir(tempDir, 0)
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
    
    it('$$walkDir - walk a directory to list all the items and items in sub-directory', function(done) {
        var items =[];
        
        rxfs.$$walkDir(tempDir, 2)
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
    
    it('$$rmdir - delete an empty directory', function(done) {
        rxfs.$$rmdir(dirA)
            .subscribe(x => {
                expect(x).to.equal(dirA);
                done();
            }, e => {
                console.log(e);
            }); 
        
    });
       
    it('$$rmdir - delete an empty directory', function(done) {
        rxfs.$$rmdir(dirB)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOTEMPTY');
                done();
            }); 
        
    });

    it('$$forceRmdir - force delete an directory and items in this directory', function(done) {
        var items =[];
        
        rxfs.$$forceRmdir(dirB)
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