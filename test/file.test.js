var rxfs = require('../rxjs-nodefs');
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
        console.log('create temp folder before test: ' + tempDir)
    })
    
    it('writeFileAsObservable - write/create file', function(done) {
        rxfs.writeFileAsObservable(fileA.path, fileA.data)
            .subscribe(x => {
                expect(x.path).to.equal(fileA.path);
                expect(x.data).to.equal(fileA.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('fileStatAsObservable - read file state', function(done) {
        rxfs.fileStatAsObservable(fileA.path)
            .subscribe(x => {
                expect(x.extension).to.equal(fileA.extension);
                expect(x.name).to.equal(fileA.name);
                expect(x.path).to.equal(fileA.path);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('writeFileAsObservable - write/create file with none exist parent dir', function(done) {
        rxfs.writeFileAsObservable(fileB.path, fileB.data)
            .subscribe(x => {
            }, e => {
                expect(e.code).to.equal('ENOENT');
                done();
            }); 
    });
    
    it('forceWriteFileAsObservable - write/create file and also create parent dir', function(done) {
        rxfs.forceWriteFileAsObservable(fileB.path, fileB.data)
            .subscribe(x => {
                expect(x.path).to.equal(fileB.path);
                expect(x.data).to.equal(fileB.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('readFileAsObservable - read file', function(done) {
        rxfs.readFileAsObservable(fileB.path)
            .subscribe(x => {
                expect(x).to.equal(fileB.data);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    it('rmFileAsObservable - delete file', function(done) {
        rxfs.rmFileAsObservable(fileB.path)
            .subscribe(x => {
                expect(x).to.equal(fileB.path);
                done();
            }, e => {
                console.log(e);
            }); 
    });
    
    after(function(){
        console.log('remove temp folder after test: ' + tempDir)
    })
});