import { EmployeeManagmentPage } from './app.po';

describe('EmpMgmt App', () => {
  let page: EmployeeManagmentPage;

  beforeEach(() => {
    page = new EmployeeManagmentPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
