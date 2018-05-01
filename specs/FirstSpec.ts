import { ElementFinder, browser, By, element } from 'protractor';
import {Eyes, ConsoleLogHandler, StitchMode} from 'eyes.selenium';

let eyes = null;
beforeAll(function(){
    eyes = new Eyes();
    eyes.setApiKey("HZeTQj103qqbLJkpT0Ez81CTbivkDEYQx4Q7GjM104Kv2Hg110");
    //eyes.setLogHandler(new ConsoleLogHandler(true));
    //eyes.setStitchMode(StitchMode.CSS);
});
beforeEach(function(done){
    eyes.open(browser, "Test98343", "NewJsTeswewet", {width: 800, height: 600}).then(function () {
        done();
    });
});

describe('angularjs homepage todo list', function () { //Suite in Jasmine

    it('should add a todo', function () { // Test in Jasmine
        // Entering application url in browser
        browser.get('https://angularjs.org');

        // Applitools Visual checkpoint #1
        eyes.checkWindow("Entire window");

        element(By.model('todoList.todoText')).sendKeys('write first protractor test');

        // Applitools Visual checkpoint #2
        eyes.checkWindow("Entire Nxt window");

        element(By.css('[value="add"]')).click(); // Clicks on 'Add' button
        element.all(By.repeater('todo in')).then(function (todoList) {
            // Asserting the TODO's count as 3
            expect(todoList.length.toString()).toEqual('3');
            todoList[2].getText().then(function (text) {
                //Verifying newly entered TODO is added
                expect(text).toEqual('write first protractor test');
            });
        });
    });
});

afterEach(function(done) {
    eyes.close().then(function () {
        done();
    });
});

afterAll(function(done) {
    eyes.abortIfNotClosed().then(function () {
        done();
    });
});