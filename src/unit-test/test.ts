import {fixture, Selector} from 'testcafe'

fixture('Getting Started').page('http://localhost:5173/test')

test('User can submit the form and see their info', async t => {
    await t.typeText('#name-input', 'Thien')
        .typeText('#birthdate-input', '27/10/2004')
        .typeText('#phone-input', '0123456789')
        .click('#submit-button')
        .wait(2000)

    const listItems1 = Selector('ul li').withText('Thien')

    await t
        .expect(listItems1.exists).ok()
        .expect(listItems1.innerText).contains('Thien')
        .expect(listItems1.innerText).contains('27/10/2004')

    await t.typeText('#name-input', 'Khang')
        .typeText('#birthdate-input', '04/03/2004')
        .typeText('#phone-input', 'abcdef')
        .click('#submit-button')
        .wait(2000)

    const listItems2 = Selector('ul li').withText('Khang')

    await t
        .expect(listItems2.exists).ok()
        .expect(listItems2.innerText).contains('Khang')
        .expect(listItems2.innerText).contains('04/03/2004')
        .expect(listItems2.innerText).notContains('NaN')
})
