/* jshint maxlen: 330 */
var homePage = require('../../pages/home.page');
var devicePage = require('../../pages/device.page');

var test = function () {};
function test() {};
//@quarantined 
describe('Systems Home Page', function () {

    var mailMessage = 'Success - Email has been sent to TVAs';
    var deleteMessage = 'Successfully deleted';

    beforeEach(function () {
        homePage.go();
        homePage.btnSystemOwner.click();
        devicePage.setRole(['ald-devs', 'ald-vul-ui-tva']);
    });

    //@needFix
    it('should display a page heading', function () {
        expect(encore.rxPage.main.title).to.eventually.equal('ERIS - Encore Rackspace Inventory System (System Information)');
    });

    //@skip
    it('should not be able to update systems not owned by the user ', function () {
        devicePage.selectSystem.select('ACS Project');
        expect(devicePage.btnUpdate.isEnabled()).to.eventually.equal(false);
        expect(devicePage.btnRefreshFromCore.isEnabled()).to.eventually.equal(true);
    });

    it('should be able to update systems owned by the user ', function () {
        devicePage.selectSystem.select('Dell');
        expect(devicePage.btnUpdate.isEnabled()).to.eventually.equal(true);
        expect(devicePage.btnAddDevice.get(0).isPresent()).to.eventually.equal(true);
        expect(devicePage.btnRefreshFromCore.isEnabled()).to.eventually.equal(true);
    });

    it('should display the column header in proper order', function () {
        devicePage.selectSystem.select('Dell');
        expect(devicePage.tblSystemRow('head',1).getText()).to.eventually.equal('System Primary Secondary');
    });

    it('should be able to update poc information for the systems owned by the user ', function () {
        devicePage.selectSystem.select('Dell');
        devicePage.txtPrimarySME = 'Bikash Pattnayak';
        devicePage.btnUpdate.click();
        devicePage.btnAddDevice.get(0).click();
        devicePage.txtDeviceAdd = '550883';
        devicePage.btnDeviceSave.click();
        var expectedData = {
            'all': false,
            'account': '1920573 - NetSec Ops Virt Training',
            'device': '550883 - 550883-FW-HYP-MGMT',
            'status': 'Support Maintenance',
            'platform': 'Firewall - Cisco ASA',
            'model': 'Cisco ASA 5520',
            'dataCenter': 'Chicago (ORD1)',
            'dracIP': '',
            'iplists': 'No Scan\n184.106.122.1 Gateway IP\n184.106.122.105 Primary IP\nSelect Others\n173.203.4.8 Primary DNS\n184.106.122.105 Primary IP CTK\n173.203.4.9 Secondary DNS\n184.106.122.105 Configured Monitored IP\n172.16.20.1 IP Addressess\n184.106.122.105 IP Addressess 1'
        };
        expect(devicePage.deviceTable.row(1).data).to.eventually.eql(expectedData);
        devicePage.btnSaveDevices.click();
        devicePage.btnConfirmDevices.click();
        expect(encore.rxNotify.all.isPresent(mailMessage, 'success')).to.eventually.be.true;
    });

    it('should be able to delete a device', function () {
        devicePage.selectSystem.select('Dell');
        devicePage.btnAddDevice.get(0).click();
        devicePage.txtDeviceAdd = '550883';
        devicePage.btnDeviceSave.click();
        devicePage.btnSaveDevices.click();
        devicePage.btnConfirmDevices.click();
        devicePage.chkIncludeAll.click();
        expect(devicePage.btnDeleteDevices.isPresent()).to.eventually.equal(true);
        devicePage.btnDeleteDevices.click();
        devicePage.btnConfirmDeleteDevice.click();
        expect(encore.rxNotify.all.isPresent(deleteMessage, 'success')).to.eventually.be.true;
    });
});
