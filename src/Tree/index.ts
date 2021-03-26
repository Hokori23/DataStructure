import { isFlat, isUndef } from '../utils'
export class TreeNode {
	value: any = null
	parent: TreeNode | null = null
	child: TreeNode[] = []
	constructor(value?: any, parent?: TreeNode | null, child?: TreeNode[]) {
		if (!isUndef(value)) this.value = value
		if (!isUndef(parent)) this.parent = parent
		if (!isUndef(child)) this.child = child
	}
	static create(arr: any[]): TreeNode | null {
		const traverse = (root: TreeNode, childArr?: any[]) => {
			if (!childArr) return root
			/**
			 * childArr
			 * [ [ 1, 2, 3 ] ]
			 * [ [ 1, [ 2, 3 ] ] ]
			 * [ [ 1, [ 2, 3 ] ], [ 4, [ 5, 6 ] ] ]
			 */
			childArr.forEach((child) => {
				if (Array.isArray(child)) {
					if (isFlat(child)) {
						const newChild = child.map((v: any) => new TreeNode(v, root))
						root.child.push(...newChild)
					} else {
						const rootValue = child[0]
						const children = child[1]
						root.child.push(traverse(new TreeNode(rootValue, root), children))
					}
				} else {
					root.child.push(new TreeNode(child, root))
				}
			})
			return root
		}
		return traverse(new TreeNode(arr.shift()), arr)
	}
	setNull(): void {
		this.parent = null
		this.value = null
		this.child = []
	}
	getParent(): TreeNode | null {
		return this.parent
	}
	getRoot(): TreeNode | null {
		let parent = this.parent
		while (parent?.parent) {
			parent = parent.parent
		}
		return parent
	}
	rightSibling(): TreeNode | null {
		if (!this.parent) return null
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
		return null
	}
	leftSibling(): TreeNode | null {
		if (!this.parent) return null
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
		return null
	}
	deleteChild(): boolean {
		if (!this.parent) return false
		const siblings = this.parent.child
		for (var i = 0; i < siblings.length; i++) {
			if (siblings[i] === this) {
				siblings.splice(i, 1)
				return true
			}
		}
		return false
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
	levelOrderTraversal(): any[] {
		console.log('LevelTraversal')
		const nodeStack = [this as TreeNode]
		const res: any[] = []
		while (nodeStack.length) {
			const level: any[] = []
			const length = nodeStack.length
			let verbose = ''
			for (var i = 0; i < length; i++) {
				const node = nodeStack.shift()
				level.push(node?.value || 'NULL')
				node?.child &&
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
	preOrderTraversal(): any[] {
		console.log('PreTraversal')
		const nodeStack = [this as TreeNode]
		const res: any[] = []
		while (nodeStack.length) {
			const node = nodeStack.pop()
			res.push(node?.value || 'NULL')
			if (node?.child) {
				for (let i = node.child.length - 1; i > -1; i--) {
					nodeStack.push(node.child[i])
				}
			}
		}
		console.log(res.join(', '))
		return res
	}
}

// const tree = TreeNode.create(arr) as TreeNode
// tree.levelOrderTraversal()
// tree.preOrderTraversal()
