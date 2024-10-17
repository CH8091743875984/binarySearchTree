class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.arr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    //sort and dedup array

    if (start > end) {
      return null;
    } else {
      let mid = start + Math.floor((end - start) / 2);

      let root = new Node(arr[mid]);

      root.left = this.buildTree(arr, start, mid - 1);

      root.right = this.buildTree(arr, mid + 1, end);

      return root;
    }
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    //adds given value

    // initilize the current node (say, currNode or node) with root node
    // let node = this.root

    // Compare the key with the current node.
    // Move left if the key is less than or equal to the current node value.
    // Move right if the key is greater than current node value.
    // Repeat steps 2 and 3 until you reach a leaf node.
    // Attach the new key as a left or right child based on the comparison with the leaf node’s value.

    if (root === null) {
      return new Node(value);
    }
    if (root.value === value) {
      return root;
    }
    if (value <= root.value) {
      root.left = this.insert(value, root.left);
    } else if (value > root.value) {
      root.right = this.insert(value, root.right);
    }
    return root;

    // while (node.left || node.right) {
    //   if (value <= node.value) {
    //     node = node.left
    //   } else {
    //     node = node.right
    //   }
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, root = this.root) {
    //deletes given value
    if (root === null) {
      return root;
    }

    if (root.value > value) {
      root.left = this.deleteItem(value, root.left);
    } else if (root.value < value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      let successor = this.getSuccessor(root);
      root.value = successor.value;
      root.right = this.deleteItem(successor.value, root.right);
    }
    return root;
  }

  //remove it

  find(value, root = this.root) {
    //returns node with given value
    if (root.value === value) {
      return root;
    }
    if (root.left === null && root.right === null) {
      return null;
    }
    if (root.value > value) {
      root = this.find(value, root.left);
    } else if (root.value < value) {
      root = this.find(value, root.right);
    }
    return root;
  }

  levelOrder(callback) {
    //(breadth first)
    if (typeof callback !== "function") {
      throw new Error("Parameter must be a function.");
    }

    let queue = [];

    if (this.root === null) {
      return;
    } else {
      queue.push(this.root);
    }
    while (queue.length > 0) {
      let node = queue.shift();
      callback(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  preOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter must be a function.");
    }

    if (root === null) {
      return;
    }
    callback(root.value);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter must be a function.");
    }

    if (root === null) {
      return;
    }
    this.inOrder(callback, root.left);
    callback(root.value);
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Parameter must be a function.");
    }

    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root.value);
  }
  height(node) {}
  depth(node) {}
  isBalanced() {}
  rebalance() {}
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//sorted and deduped this is [1,3,4,5,7,8,9,23,67,324,6345], len 11

let myTree = new Tree(testArray);

console.log(myTree);
console.log(myTree.prettyPrint());

console.log("Test: insert");
myTree.insert(6);
myTree.insert(99);
myTree.insert(9999);
myTree.insert(222);
myTree.insert(8);
console.log(myTree.prettyPrint());

console.log("Test: delete");
myTree.deleteItem(8);
console.log(myTree.prettyPrint());

console.log("Test: find");
let foundRoot = myTree.find(9);
console.log(foundRoot);
let notfoundRoot = myTree.find(66);
console.log(notfoundRoot);

function testCallbackConsoleLog(value) {
  console.log(value);
}

console.log("Test: levelOrder");
myTree.levelOrder(testCallbackConsoleLog);
// myTree.levelOrder(3);

console.log("Test: preOrder");
console.log(myTree.prettyPrint());
myTree.preOrder(testCallbackConsoleLog);

console.log("Test: inOrder");
console.log(myTree.prettyPrint());
myTree.inOrder(testCallbackConsoleLog);

console.log("Test: postOrder");
console.log(myTree.prettyPrint());
myTree.postOrder(testCallbackConsoleLog);
