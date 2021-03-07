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
		const traverse = (
			arr: any[],
			arrLength: number,
			index: number
		): TreeNode | null => {
			if (index >= arrLength) {
				return null
			}
			const root = new TreeNode(
				arr[index],
				traverse(arr, arrLength, 2 * index + 1),
				traverse(arr, arrLength, 2 * index + 2)
			)
			return root
		}
		return traverse(arr, arr.length, 0)
	}
	preOrderTraversal(): any[] {
		const nodeStack = [this as TreeNode]
		const res: any[] = []
		while (nodeStack.length) {
			const node = nodeStack.pop()
			res.push(node?.value || 'NULL')
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
			res.push(root?.value || 'NULL')
			root = root?.right
		}
		return res
	}
	postOrderTraversal(): any[] {
		const traverse = (root: TreeNode | null, res: any[] = []): any[] => {
			if (!root) return res
			res = traverse(root.left, res)
			res = traverse(root.right, res)
			res.push(root.value || 'NULL')
			return res
		}
		const res = traverse(this as TreeNode)
		return res
	}
}
