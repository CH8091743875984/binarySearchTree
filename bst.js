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
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//sorted and deduped this is [1,3,4,5,7,8,9,23,67,324,6345], len 11

let myTree = new Tree(testArray);

console.log(myTree);
console.log(myTree.prettyPrint());
