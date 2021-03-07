class TreeNode {
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
		const traverse = (arr: any[], arrLength: number, index: number) => {
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
	preOrderTraversal(): void {
		const nodeStack = [this as TreeNode]
		const res = []
		while (nodeStack.length) {
			const node = nodeStack.pop()
			res.push(node.value || 'NULL')
			if (node.right) nodeStack.push(node.right)
			if (node.left) nodeStack.push(node.left)
		}
		console.log(res.join(', '))
	}
	inOrderTraversal(): void {
		const nodeStack = []
		let root = this as TreeNode
		const res = []
		while (root || nodeStack.length) {
			while (root) {
				nodeStack.push(root)
				root = root.left
			}
			root = nodeStack.pop()
			res.push(root.value || 'NULL')
			root = root.right
		}
		console.log(res.join(', '))
	}
	postOrderTraversal(): void {
		const traverse = (root: TreeNode, res = []): any[] => {
			if (!root) return res
			res = traverse(root.left, res)
			res = traverse(root.right, res)
			res.push(root.value || 'NULL')
			return res
		}
		const res = traverse(this as TreeNode, [])
    console.log(res.join(', '));
	}
}
let arr = [
	'A',
	'B',
	'C',
	'D',
	null,
	'F',
	'G',
	'H',
	'I',
	null,
	null,
	'L',
	'M',
	'N',
	'O'
]
const root = TreeNode.create(arr)
root.preOrderTraversal()
root.inOrderTraversal()
root.postOrderTraversal()
