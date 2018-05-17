function Node(data, type) {
    this.data = data;
    this.type = null;
    this.parent = null;
    this.children = [];
}

exports.Node = Node;