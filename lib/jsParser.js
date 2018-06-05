/**
 * Parse JS code in structure tree with comment information
 * @param filePath
 */

 var esprima = require('esprima');
 var fileReader = require('./fileReader');
 var Tree = require('./tree/tree');
 var types = require("ast-types");
 var tagData = require("./data/data");
 var q = require('q');

 var jsParser = {

    readTypes: function (filePath) {
        let fileContent = fileReader.read(filePath);
        let ast = esprima.parseScript(fileContent, { attachComment: true });
        let nodes = {};
        let programData = {
            type: 'program',
            name: 'program'
        };
        let tree = new Tree.Tree(programData);

        function insertElement (path, originalPath) {
            if(!path || !path.parent ) return false;

            if(path.parent.node.type === 'ExpressionStatement') {
                let node = originalPath.node.expression;
                let parent = path.parent.node.expression;
                //if parent is "describe" or "it" but not the program
                if(checkWhiteList(parent)) {
                    let comment = originalPath.node['leadingComments'] ? originalPath.node.leadingComments[0].value : '';
                    let data = {
                        type: getType(node),
                        name: node.arguments[0].value,
                        comment: comment
                    };
                    tree.add(data, {type: getType(parent), name: parent.arguments[0].value}, tree.traverseBF);
                    return true;
                } else {
                    insertElement(path.parent, originalPath);
                }
            } else {
                insertElement(path.parent, originalPath);
            }
        }

        function getType (node) {
            return node.callee.name || node.callee.object.name + '.' + node.callee.property.name;
        }

        function checkWhiteList(node) {
            if(!node.callee) return false;

            let workingTest = (node.callee.name === 'describe' || node.callee.name === 'it') ? true : false;
            let skippedTest = (node.callee.object &&
                node.callee.property &&
                (node.callee.object.name === 'describe' || node.callee.object.name === 'it') &&
                node.callee.property.name === 'skip'
            ) ? true : false;
            return workingTest || skippedTest;
        }

        types.visit(ast, {
            // This method will be called for any node with .type "MemberExpression":
            visitExpressionStatement: function(path) {
                // Visitor methods receive a single argument, a NodePath object
                // wrapping the node of interest.
                let node = path.node.expression;
                let isAllowed = checkWhiteList(node);
                if(path.parent.node.type == 'Program' && isAllowed) {
                    //insert parent level describe or it
                    let comment = path.node['leadingComments'] ? path.node.leadingComments[0].value : '';
                    let data = {
                        type: getType(node),
                        name: node.arguments[0].value,
                        comment: comment
                    }
                    tree.add(data, programData, tree.traverseBF);

                } else if(isAllowed) {
                    insertElement(path, path);
                }

                // It's your responsibility to call this.traverse with some
                // NodePath object (usually the one passed into the visitor
                // method) before the visitor method returns, or return false to
                // indicate that the traversal need not continue any further down
                // this subtree.
                this.traverse(path);
            }
        });

        return tree;
    },

    processSpces: function (files) {
        let deferred = q.deferred;

        if(allSpecs.length >0) {
            allSpecs.forEach(function (file,index) {
              let tree = JSParser.read(file);
              console.log(JSON.stringify(tree));
            });
          } else {
            log.warn('No test file found');
        }
        return deferred.promise;
    },

    /**
     * Make object of type tagData
     * @param tree
     */
    extractTag: function (comment) {
        let regxStatus = new RegExp('')
    },

    getSplunkObj: function (node) {

    },

    parseTree: function (tree) {
        let objs = [];
        let self = this;
        tree.traverseBF(function (node) {
            if(node.data.type === 'it') {
                let categories = self.getCategories(node, []);
                let obj = {
                    "Product": "VPN manager",
                    "Projects": [],
                    "Test Name": node.data.name,
                    "Interface Type": "gui",
                    "Polarity": "positive",
                    "Priority": "",
                    "Suite": "integration",
                    "Categories": categories,
                    "Status": "operational",
                    "Execution Method": "automated",
                    "Tickets": ["JIRA-3344"]
                };
                objs.push(obj);
            }
       });

       return objs;
    },

    getCategories: function getCategories (node, categories) {
        if(!node || !node.parent || node.parent.data.type === 'program') {
            return true;
        } else {
            categories.unshift(node.parent.data.name);
               getCategories(node.parent, categories);
        }
        return categories;
    }
 };

 module.exports = jsParser;