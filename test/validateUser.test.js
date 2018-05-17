var vpnPage = require('../pages/vpn.page');

describe('VPN User Management Page', function () {

    before(function () {});

    it('Should not submit invalid account number', function () {
      vpnPage.getDeviceData('111111');
	  expect(vpnPage.isDisplayed(vpnPage.formDeviceInfo)).to.eventually.equal(false); 
	});

    it('Should submit account number', function () {
	  vpnPage.getDeviceData('550883');
      expect(vpnPage.isDisplayed(vpnPage.formDeviceInfo)).to.eventually.equal(true);
    });

    it('Should check invalid ticket', function () {
	  vpnPage.validateTicket('111111-11111');
      expect(vpnPage.isDisplayed(vpnPage.messageInvalidTicket)).to.eventually.equal(true);
    });

    it('Should check valid ticket', function () {
	  vpnPage.validateTicket('160811-11745');
      expect(vpnPage.isDisplayed(vpnPage.ticketMessage)).to.eventually.equal(true);
    });

    it('Should allow to comment', function () {
	  element(vpnPage.chkComment).click();
	  element(vpnPage.chkComment).sendKeys('test comment');
      expect(vpnPage.isDisplayed(vpnPage.txtComment)).to.eventually.equal(true);
    });

    it('Should submit VPN user details', function () {
	  element(by.repeater('user in data.users').row(0)).element(by.css('.delete')).click();
	  element(vpnPage.btnSubmitUser).click();
      expect(vpnPage.isDisplayed(vpnPage.eventStatus)).to.eventually.equal(true);
    });

	describe('VPN user', function () {    
		it('Should not allow password less than 8 character', function () {
			vpnPage.addUser();
			expect(vpnPage.isDisplayed(vpnPage.pwdLongError)).to.eventually.equal(true);
		});
		/*
		it('Should add user', function () {
			element(vpnPage.txtPassword).clear();
			element(vpnPage.txtPassword).sendKeys('12345678');
			element(vpnPage.txtRePassword).clear();
			element(vpnPage.txtRePassword).sendKeys('12345678');
			element(by.css('#selectgroup')).$('[value="NETSECTRAINING"]').click();  
			element(vpnPage.btnSaveUser).click();
			var users = element.all(by.repeater('user in data.users').column('user.name')).map(function (elm) {
				return elm.getText();
			});
			users.then(function (result) {
				//expect(result.length).to.equal(6);
				expect(result).to.contain('New Name');
			});
		});

		it('Should edit user', function () {
			element(by.repeater('user in data.users').row(5)).element(by.css('.edit')).click();
			vpnPage.editUser();
			var users = element.all(by.repeater('user in data.users').column('user.attributes')).map(function (elm) {
				return elm.getText();
			});
			users.then(function (result) {
				expect(result[5]).to.equal('NETSECTRAINING-JOSH');
			});
		});
		*/
		it('Should allow to manage other device', function () {
		  vpnPage.manageDevice();
		  expect(vpnPage.isDisplayed(vpnPage.formDeviceInfo)).to.eventually.equal(false);
		});

	});

});
