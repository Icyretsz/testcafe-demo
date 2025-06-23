import { fixture, Selector, RequestLogger } from 'testcafe';

const simpleLogger = RequestLogger('https://685998ba9f6ef9611153a902.mockapi.io/api/userinfo', {
    logRequestHeaders: true,
    logResponseHeaders: true
});

fixture('Getting Started').page('http://localhost:5173/test').requestHooks(simpleLogger);

test('User can submit the form and see their info', async t => {
    await t
        .typeText('#name-input', 'Thien')
        .typeText('#birthdate-input', '27/10/2004')
        .typeText('#phone-input', '123456789')
        .click('#submit-button')
        .wait(500);

    const thienRow = Selector('#local-user-list tr').withText('Thien');

    await t
        .expect(thienRow.exists).ok()
        .expect(thienRow.innerText).contains('27/10/2004')
        .expect(thienRow.innerText).contains('123456789');

    await t
        .typeText('#name-input', 'Khang', { replace: true })
        .typeText('#birthdate-input', '04/03/2004', { replace: true })
        .typeText('#phone-input', 'abcdef', { replace: true })
        .click('#submit-button')
        .wait(500);

    const khangRow = Selector('#local-user-list tr').withText('Khang');

    await t
        .expect(khangRow.exists).ok()
        .expect(khangRow.innerText).contains('04/03/2004')
        .expect(khangRow.innerText).match(/^\d+$/);
});

test('fetch user list from API', async t => {
    await t.click('#fetch-user-btn').expect(simpleLogger.contains(r => r.response.statusCode === 200)).ok();

    const req = simpleLogger.requests[0];
    console.log('Request URL:', req.request.url);
    console.log('Response status:', req.response.statusCode);
})


