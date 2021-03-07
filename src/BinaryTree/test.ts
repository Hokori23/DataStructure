import { describe, it } from 'mocha'
import { TreeNode } from '.'
import assert from 'assert'

const root = TreeNode.create([
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
]) as TreeNode
describe('二叉树: BinaryTree', () => {
	describe('#create()', () => {
		it('通过数组创建二叉树', () => {
			/**
			 *       A
			 *    B     C
			 *  D   x  x  x
			 */
			const actualChild1 = new TreeNode('D')
			const actualChild2 = new TreeNode('B', actualChild1)
			const actualChild3 = new TreeNode('C')
			const actualRoot = new TreeNode('A', actualChild2, actualChild3)
			assert.deepStrictEqual(TreeNode.create(['A', 'B', 'C', 'D']), actualRoot)
		})
	})
	describe('#preOrderTraversal()', () => {
		it('前序遍历', () => {
			assert.deepStrictEqual(root.preOrderTraversal(), [
				'A',
				'B',
				'D',
				'H',
				'I',
				'NULL',
				'NULL',
				'NULL',
				'C',
				'F',
				'L',
				'M',
				'G',
				'N',
				'O'
			])
		})
	})
	describe('#inOrderTraversal()', () => {
		it('中序遍历', () => {
			assert.deepStrictEqual(root.inOrderTraversal(), [
				'H',
				'D',
				'I',
				'B',
				'NULL',
				'NULL',
				'NULL',
				'A',
				'L',
				'F',
				'M',
				'C',
				'N',
				'G',
				'O'
			])
		})
	})
	describe('#postOrderTraversal()', () => {
		it('中序遍历', () => {
			assert.deepStrictEqual(root.postOrderTraversal(), [
        'H','I','D','NULL','NULL','NULL','B','L','M','F','N','O','G','C','A'
			])
		})
	})
})
