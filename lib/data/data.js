/**
* Keep track of all tag details required for 
*/

var TagData = funcion(opt) {
    this.Product = opt.Product;
    this.Projects = opt.Projects;
    this['Test Name'] = opt['Test Name'];
    this['Interface Type'] = opt['Interface Type'];
    this.Polarity = opt.Polarity;
    this.Suite = opt.Suite;
    this.Categories = opt.Categories;
    this.Status = opt.Status;
    this['Execution Method'] = opt['Execution Method'];
    this.Tickets = opt.Tickets;
}

exports.init = TagData;

teamName: encore Required field
Product: Required field (Could be mail folder name encore-vpn-manager or passed from cli)
Projects: optional
Interface Type: gui
Polarity: Required field (default to positive)
Priority: Optional ( default to empty)
Suite: Protractor config Suites (Optional)
Status: Required field (default to operational)
Execution Method: automated
Tickets: [] (only in case if status is not operational)

{
        "Product": "VPN manager",
        "Projects": [],
        "Test Name": "Should not allow password less than 8 character",
        "Interface Type": "gui",
        "Polarity": "positive",
        "Priority": "",
        "Suite": "integration",
        "Categories": [
            "VPN User Management Page",
            "VPN user"
        ],
        "Status": "operational",
        "Execution Method": "automated",
        "Tickets": ["JIRA-3344"]
    }