import { isFlat } from '../utils'
export class TreeNode {
	value: any
	parent: TreeNode | null = null
	child: TreeNode[] | null = null
	constructor(value: any, parent?: TreeNode | null, child?: TreeNode[]) {
		this.value = value
		if (parent) this.parent = parent
		if (child) this.child = child
	}
	static create(arr: any[]): TreeNode | null {
		const traverse = (root: TreeNode, childArr?: any[]) => {
			if (!childArr) return root
			const newChild = []
			childArr.forEach((child) => {
				if (Array.isArray(child)) {
					if (isFlat(child)) {
						const parent: TreeNode = newChild[newChild.length - 1]
						parent.child = child.map((v) => new TreeNode(v, parent))
					} else {
						const rootValue = child[0]
						const children = child[1]
						newChild.push(traverse(new TreeNode(rootValue, root), children))
					}
				} else {
					newChild.push(new TreeNode(child, root))
				}
			})
			root.child = newChild
			return root
		}
		return traverse(new TreeNode(arr.shift()), arr)
	}
	setNull(): void {
		this.parent = null
		this.value = null
		this.child = null
	}
	getParent(): TreeNode | null {
		return this.parent
	}
	getRoot(): TreeNode | null {
		let parent = this.parent
		while (parent.parent) {
			parent = parent.parent
		}
		return parent
	}
	rightSibling(): TreeNode | null {
		const siblings = this.parent.child
		const length = siblings.length
		for (var i = 0; i < length; i++) {
			if (siblings[i] === this) {
				if (i === length - 1) {
					return null
				}
				return siblings[i + 1]
			}
		}
	}
	leftSibling(): TreeNode | null {
		const siblings = this.parent.child
		const length = siblings.length
		for (var i = 0; i < length; i++) {
			if (siblings[i] === this) {
				if (i === 0) {
					return null
				}
				return siblings[i - 1]
			}
		}
	}
	deleteChild(): void {
		const siblings = this.parent.child
		for (var i = 0; i < siblings.length; i++) {
			if (siblings[i] === this) {
				siblings.splice(i, 1)
				return
			}
		}
	}
	/**
	 *
	 * @param child // 子树
	 * @param idx? // 插入子树的位置
	 * @description 如果没有传入idx，则默认推入数组末端
	 */
	addChild(child: TreeNode, idx?: number): boolean {
		if (idx === undefined) {
			if (this.child.length) {
				this.child.push(child)
			} else {
				this.child = [child]
			}
			return true
		}
		if (idx > this.child.length) return false
		this.child.splice(idx, 0, child)
		return true
	}
	/**
	 * 层级遍历
	 */
	levelTraversal(): any[] {
		console.log('LevelTraversal')
		const nodeStack = [this as TreeNode]
		const res = []
		while (nodeStack.length) {
			const level = []
			const length = nodeStack.length
			let verbose = ''
			for (var i = 0; i < length; i++) {
				const node = nodeStack.shift()
				level.push(node.value)
				node.child &&
					node.child.forEach((child) => {
						nodeStack.push(child)
					})
			}
			console.log(level.join(', '))
			res.push(level)
		}
		return res
	}
	/**
	 * 前序遍历
	 */
	preTraversal(): any[] {
		console.log('PreTraversal')
		const nodeStack = [this as TreeNode]
		const res = []
		while (nodeStack.length) {
			const node = nodeStack.pop()
			res.push(node.value)
			if (node.child) {
				for (let i = node.child.length - 1; i > -1; i--) {
					nodeStack.push(node.child[i])
				}
			}
		}
		console.log(res.join(', '))
		return res
	}
}
// const arr = [6, [1, [4, 5]], [2, [6, 1]], [5, [3, 9]]]
const arr = [6, [11, [4, [5, 12]]], [2, [6, 1]], [5, [3, 9]]]
// Tree:
//        6
//    1   2   5
//   4 5 6 1 3 9
// Tree:
//        6
//    11   2   5
//   4  x 6 1 3 9
//  5 12
// =========================== //
// Array:
// [
// 	6,
// 	[1,
// 		[4, 5
// 	],
// 	[2,
// 		[6, 1]
// 	],
// 	[5,
// 		[3, 9]
// 	]
// ]
const tree = TreeNode.create(arr)
tree.levelTraversal()
tree.preTraversal()
