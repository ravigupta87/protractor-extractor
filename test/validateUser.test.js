var vpnPage = require('../pages/vpn.page');

//@first-skip
describe('VPN User Management Page', function () {

    before(function () {});

    //@first-it-skip
    it('Should not submit invalid account number', function () {
      vpnPage.getDeviceData('111111');
      expect(vpnPage.isDisplayed(vpnPage.formDeviceInfo)).to.eventually.equal(false);
    });

    //@first-describe-qura
    describe('VPN user2', function () {

        //@first-it-slow
        it('Should edit user2', function () {
            element(by.repeater('user in data.users').row(5)).element(by.css('.edit')).click();
            vpnPage.editUser();
            var users = element.all(by.repeater('user in data.users').column('user.attributes')).map(function (elm) {
                return elm.getText();
            });
            users.then(function (result) {
                expect(result[5]).to.equal('NETSECTRAINING-JOSH');
            });
        });
    });

});

//@squarantined ALD-776
describe.skip('VPN user1', function () {

        //@second-it-fast
        it('Should edit user1', function () {
            element(by.repeater('user in data.users').row(5)).element(by.css('.edit')).click();
            vpnPage.editUser();
            var users = element.all(by.repeater('user in data.users').column('user.attributes')).map(function (elm) {
                return elm.getText();
            });
            users.then(function (result) {
                expect(result[5]).to.equal('NETSECTRAINING-JOSH');
            });
        });
    });