import { describe, it } from 'mocha'
import { TreeNode } from '.'
import assert from 'assert'
const arr = TreeNode.create([
	6,
	[11, [4, [5, 12]]],
	[2, [6, 1]],
	[5, [3, 9]]
]) as TreeNode
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
describe('树: TreeNode', () => {
	describe('#create(arr: any[])', () => {
		it('通过数组创建树', () => {
			// Tree:
			//        6
			//    11   2   5
			const node1 = new TreeNode(6)
			const arr = [11, 2, 5]
			arr.forEach((v) => {
				node1.addChild(new TreeNode(v, node1))
			})
			assert.deepStrictEqual(TreeNode.create([6, [11, 2, 5]]), node1)
		})
	})
	describe('#setNull()', () => {
		it('置空树，前置方法: [ (create) ]', () => {
			const node = TreeNode.create([6, [11, [2, 5]]]) as TreeNode
			node.setNull()
			assert.deepStrictEqual(node, new TreeNode())
		})
	})
})
