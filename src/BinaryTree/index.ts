export class TreeNode {
	value: any
	left: TreeNode | null
	right: TreeNode | null
	constructor(
		value: any,
		left: TreeNode | null = null,
		right: TreeNode | null = null
	) {
		this.value = value
		this.left = left
		this.right = right
	}
	static create(arr: any[]) {
		const recur = (
			arr: any[],
			arrLength: number,
			index: number
		): TreeNode | null => {
			if (index >= arrLength) {
				return null
			}
			const root = new TreeNode(
				arr[index],
				recur(arr, arrLength, 2 * index + 1),
				recur(arr, arrLength, 2 * index + 2)
			)
			return root
		}
		return recur(arr, arr.length, 0)
	}
	levelOrderTraversal(): any[] {
		const nodeStack = [this as TreeNode]
		const res: any[] = []
		while (nodeStack.length) {
			const level: any[] = []
			const length = nodeStack.length
			for (let i = 0; i < length; i++) {
				const node = nodeStack.shift()
				level.push(node?.value)
				if (node?.left) nodeStack.push(node?.left)
				if (node?.right) nodeStack.push(node?.right)
			}
			res.push(level)
		}
		return res
	}
	preOrderTraversal(): any[] {
		const nodeStack = [this as TreeNode]
		const res: any[] = []
		while (nodeStack.length) {
			const node = nodeStack.pop()
			res.push(node?.value || null)
			if (node?.right) nodeStack.push(node.right)
			if (node?.left) nodeStack.push(node.left)
		}
		return res
	}
	inOrderTraversal(): any[] {
		const nodeStack: TreeNode[] = []
		let root: TreeNode | null | undefined = this as TreeNode
		const res: any[] = []
		while (root || nodeStack.length) {
			while (root) {
				nodeStack.push(root)
				root = root.left
			}
			root = nodeStack.pop()
			res.push(root?.value || null)
			root = root?.right
		}
		return res
	}
	postOrderTraversal(): any[] {
		const traverse = (root: TreeNode | null, res: any[] = []): any[] => {
			if (!root) return res
			res = traverse(root.left, res)
			res = traverse(root.right, res)
			res.push(root.value || null)
			return res
		}
		const res = traverse(this as TreeNode)
		return res
	}
	// 针对非重复结点的二叉树
	static buildTreeByPreNInTraversal(
		preOrder: any[],
		inOrder: any[]
	): TreeNode | null {
		const map = new Map()
		inOrder.forEach((v, i) => {
			map.set(v, i)
		})
		const recur = (
			rootIdx: number, // 前序遍历根节点下标
			leftIdx: number,
			rightIdx: number
		): TreeNode | null => {
			if (leftIdx > rightIdx) return null
			const root = new TreeNode(preOrder[rootIdx])
			const i = map.get(preOrder[rootIdx]) // 中序遍历根结点的下标
			root.left = recur(rootIdx + 1, leftIdx, i - 1)
			root.right = recur(rootIdx + 1 + i - leftIdx, i + 1, rightIdx) // i - leftIdx 指 中序遍历左子树的数量
			return root
		}
		return recur(0, 0, preOrder.length - 1)
	}
	static depth(root: TreeNode | null): number {
		let h, lh, rh
		if (!root) {
			h = 0
		} else {
			lh = TreeNode.depth(root.left)
			rh = TreeNode.depth(root.right)
			h = lh >= rh ? lh + 1 : rh + 1
		}
		return h
	}
}
