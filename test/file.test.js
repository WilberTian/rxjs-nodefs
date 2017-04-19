var rxfs = require('../rxjs-nodefs');
var rimraf = require('rimraf');
var fs = require('fs');
var expect = require('chai').expect;

var tempDir = './test/temp/';
var fileA =  {
    path: tempDir + 'a.txt',
    extension: '.txt',
    name: 'a.txt',
    data: 'content in a.txt'
};
var fileB = {
    path: tempDir + 'b/b.txt',
    data: 'content in b.txt'
};


describe('file api test', function() {
    before(function(){
        rimraf.sync(tempDir, {});
        fs.mkdirSync(tempDir);
        console.log('clean up before test, folder: ' + tempDir)
    });
    
    it('$$writeFile - write/create file', function(done) {
        rxfs.$$writeFile(fileA.path, fileA.data)
            .subscribe(x => {
                expect(x.path).to.equal(fileA.path);
                expect(x.data).to.equal(fileA.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('$$fileStat - read file state', function(done) {
        rxfs.$$fileStat(fileA.path)
            .subscribe(x => {
                expect(x.extension).to.equal(fileA.extension);
                expect(x.name).to.equal(fileA.name);
                expect(x.path).to.equal(fileA.path);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('$$writeFile - write/create file with none exist parent dir', function(done) {
        rxfs.$$writeFile(fileB.path, fileB.data)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOENT');
                done();
            }); 
    });
    
    it('$$forceWriteFile - write/create file and also create parent dir', function(done) {
        rxfs.$$forceWriteFile(fileB.path, fileB.data)
            .subscribe(x => {
                expect(x.path).to.equal(fileB.path);
                expect(x.data).to.equal(fileB.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('$$readFile - read file', function(done) {
        rxfs.$$readFile(fileB.path)
            .subscribe(x => {
                expect(x).to.equal(fileB.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('$$rmFile - delete file', function(done) {
        rxfs.$$rmFile(fileB.path)
            .subscribe(x => {
                expect(x).to.equal(fileB.path);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    after(function(){
        rimraf.sync(tempDir, {});
        console.log('clean up after test, folder: ' + tempDir)
    });
});