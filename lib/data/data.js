/**
* Keep track of all tag details required for Splunk report
*/

var TagData = function (opt) {
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

