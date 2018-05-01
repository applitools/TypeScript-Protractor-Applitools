import { ElementFinder, browser, By, element } from 'protractor';
import {Eyes, ConsoleLogHandler, StitchMode} from 'eyes.selenium';

let eyes = null;
beforeAll(() => {
    eyes = new Eyes();
    eyes.setApiKey("YOUR_API_KEY");
    //eyes.setLogHandler(new ConsoleLogHandler(true));
    //eyes.setStitchMode(StitchMode.CSS);
});
beforeEach(done => {
    eyes.open(browser, "TypeScript-Example", "NewTest", {width: 800, height: 600}).then(() => {
        done();
    });
});

describe('angularjs homepage todo list', () => { //Suite in Jasmine

    it('should add a todo', () => { // Test in Jasmine
        // Entering application url in browser
        browser.get('https://angularjs.org');

        // Applitools Visual checkpoint #1
        eyes.checkWindow("Entire window");

        element(By.model('todoList.todoText')).sendKeys('write first protractor test');

        // Applitools Visual checkpoint #2
        eyes.checkWindow("Entire Nxt window");

        element(By.css('[value="add"]')).click(); // Clicks on 'Add' button
        element.all(By.repeater('todo in')).then(todoList => {
            // Asserting the TODO's count as 3
            expect(todoList.length.toString()).toEqual('3');
            todoList[2].getText().then(text => {
                //Verifying newly entered TODO is added
                expect(text).toEqual('write first protractor test');
            });
        });
    });
});

afterEach(done => {
    eyes.close().then(() => {
        done();
    });
});

afterAll(done => {
    eyes.abortIfNotClosed().then(() => {
        done();
    });
});
