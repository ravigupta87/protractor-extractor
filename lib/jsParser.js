/**
 * Parse JS code in structure tree with comment information
 * @param filePath
 */

 var esprima = require('esprima');
 var readline = require('readline');
 var fileReader = require('./fileReader');
 var Tree = require('./tree/tree');

 var jsParser = {
    parse: function (jsExpression) {
         if(!jsExpression)
             return null;
         //Assume it follows single parent describe pattern
         jsExpression = jsExpression.pop();

         var tree = new Tree(jsExpression.expression.arguments[0].value, jsExpression.expression.callee.name);
         buildTree(jsExpression.expression.arguments);
         
         /**
         * Type for node type
         * "BlockComment", "Identifier", "Literal", "CallExpression", "VariableDeclarator", "VariableDeclaration", 
         * "BlockStatement", "FunctionExpression", "FunctionDeclaration", "LineComment", "EmptyStatement", 
         * "MemberExpression", "ExpressionStatement", "ArrayExpression", "AssignmentExpression", 
         * "Property", "ObjectExpression", "Program"
         */
         function buildTree(expression) {
            if(expression.type === "CallExpression") {

            }

            if(expression.type === "FunctionExpression") {
            	//Keys: ["type", "id", "params", "body.body", "generator", "expression", "async", "loc"]
            	// describe or it callback
            	//expression.body.body which is array
            }

            if(expression.type === "VariableDeclaration") {
            	
            }

            if(expression.type === "ExpressionStatement") {
            	//keys: arguments:[], callee:{}, type:''
            	//callee: loc:{}, name:'', type:''
            	
            }

            if(expression.type === "BlockStatement") {
            	//Keys: ["type", "body", "loc"]
            }

            if(expression.type === "Literal") {
            	//type: "Literal" value: "Systems Home Page"
            	//describe or it name
            	//expression.value
            }

         }
    },

    read: function (filePath) {
         let fileContent = fileReader.read(filePath);
         let tree = esprima.parseScript(fileContent, { comment: true });
         return tree;
    },

     /**
     * Remove all variable and function declearation on the top
     * Keepn only describe expression
     * @param tree
     */
    trim: function (tree) {
         if(tree.body && tree.body.length > 0)
             return tree.body.filter(function (data){
                return data.type === "ExpressionStatement";
            });
    },

    /**
     * Make object of type tagData
     * @param tree
     */
    extractTag: function (tree) {

    }
 };

 module.exports = jsParser;