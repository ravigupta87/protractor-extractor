var Queue = require('./queue');
var Node = require('./node');

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
         
        // step 1
    })(this._root);
 
};

Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
     
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};

/**
* Imagine that we want to log to the console any nodes that contain data with an odd number and traverse every node in our tree with BFS.
* This is the code we would write:
* @param callback to be executed
* @param traversal type of traversal (traverseBF or traverseDF)
* @example
* tree.contains(function(node){
*    if (node.data === 'two') {
*        console.log(node);
*    }
* }, tree.traverseBF);
*/
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

/**
* Add a node to a specific node
* @param data used to create new instance of Node
* @param toData is used to compare against every node in a tree
* @param traversal (traverseBF or traverseDF)
* @example
* var tree = new Tree('CEO');
* tree.add('VP of Happiness', 'CEO', tree.traverseBF);
*/
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

/**
* Method will remove a node and all of its children
* @param data used to create new instance of Node
* @param fromData is used to compare against every node in a tree
* @param traversal (traverseBF or traverseDF)
* @example
* var tree = new Tree('CEO');
* tree.add('VP of Happiness', 'CEO', tree.traverseBF);
*/
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};

function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}

exports.Tree = Tree;