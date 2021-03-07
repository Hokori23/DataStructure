import { describe, it } from 'mocha'
import { LinkNode } from '.'
import assert from 'assert'
const linkNode = LinkNode.create([1, 2, 3, 4, 5], false) as LinkNode
describe('链表: LinkNode', () => {
	describe('#getValue()', () => {
		it('获取当前结点值，前置方法: [ (create) ]', () => {
			assert.strictEqual(linkNode.getValue(), 1)
		})
	})
	describe('#getNext()', () => {
		it('获取下一个结点，前置方法: [ (create) ]', () => {
			const node = LinkNode.create([2, 3, 4, 5], false) as LinkNode
			node.setPre(new LinkNode(1, node))
			assert.deepStrictEqual(linkNode.getNext(), node)
		})
	})
	describe('#getPre()', () => {
		it('获取上一个结点，前置方法: [ (create, getNext) ]', () => {
			// 只有双向链表这个方法才有意义
			const node = LinkNode.create(
				[1, 2, 3, 4, 5],
				false
			)!.getNext() as LinkNode
			assert.deepStrictEqual(node.getPre(), linkNode)
		})
	})
	describe('#getLast(isReverse: boolean = false)', () => {
		it('获取最后一个结点，前置方法: [ (create, getNext) ]', () => {
			const node = LinkNode.create([1, 2, 3], false) as LinkNode
			assert.deepStrictEqual(node.getLast(), node.getNext()!.getNext())
		})
	})
	describe('#setValue(value: any)', () => {
		it('设置当前结点值，前置方法: [ (create) ]', () => {
			const node = LinkNode.create([1, 2, 3]) as LinkNode
			node.setValue(5)
			assert.deepStrictEqual(node, LinkNode.create([5, 2, 3]))
		})
	})
	describe('#setNext(next: LinkNode)', () => {
		it('设置下一个结点，前置方法: [ (create) ]', () => {
			const node = LinkNode.create([1, 2, 3]) as LinkNode
			node.setNext(new LinkNode(10))
			assert.deepStrictEqual(node, LinkNode.create([1, 10]))
		})
	})
	describe('#setPre(pre: LinkNode)', () => {
		it('设置上一个结点，前置方法: [ (create, getNext, getPre) ]', () => {
			let node = LinkNode.create([1, 2, 3], false) as LinkNode
			node = node.getNext() as LinkNode
			node.setPre(new LinkNode(10, node))
			node = node.getPre() as LinkNode
			assert.deepStrictEqual(node, LinkNode.create([10, 2, 3], false))
		})
	})
	describe('#create(arr: any[], isUnidireactional: boolean = true)', () => {
		it('通过数组创建链表，前置方法: [ (create, setNext) ]', () => {
			// 单向链表
			const uniNode = LinkNode.create([1, 2, 3])
			const shouldUniNode1 = new LinkNode(1)
			const shouldUniNode2 = new LinkNode(2)
			const shouldUniNode3 = new LinkNode(3)
			shouldUniNode1.setNext(shouldUniNode2)
			shouldUniNode2.setNext(shouldUniNode3)
			assert.deepStrictEqual(uniNode, shouldUniNode1)

			// 双向链表
			const node = LinkNode.create([1, 2, 3], false)
			const shouldNode1 = new LinkNode(1)
			const shouldNode2 = new LinkNode(2, null, shouldNode1)
			const shouldNode3 = new LinkNode(3, null, shouldNode2)
			shouldNode1.setNext(shouldNode2)
			shouldNode2.setNext(shouldNode3)
			assert.deepStrictEqual(node, shouldNode1)
		})
	})
	describe('#find(idx: number = 0)', () => {
		it('通过偏移量查询结点，前置方法: [ (getNext) ]', () => {
			assert.deepStrictEqual(linkNode.find(3), linkNode.getNext()?.getNext()?.getNext())
			assert.strictEqual(linkNode.find(100), null)
		})
	})
	describe('#insert(value: any, idx: number)', () => {
		it('插入结点，前置方法: [ find, getLast, (create) ]', () => {
			const node = LinkNode.create([1, 2, 3, 4, 5]) as LinkNode
			node.insert(6)
			assert.deepStrictEqual(node, LinkNode.create([1, 2, 3, 4, 5, 6]))
			node.insert(100, 3)
			assert.deepStrictEqual(node, LinkNode.create([1, 2, 3, 100, 4, 5, 6]))
		})
	})
	describe('#delete(idx: number)', () => {
		it('删除结点，前置方法: [ find ]', () => {
			const node = LinkNode.create([1, 2, 3, 4, 5]) as LinkNode
			node.delete(3)
			assert.deepStrictEqual(node, LinkNode.create([1, 2, 3, 5]))
		})
	})
	describe('#traverse(isReverse: boolean = false)', () => {
		it('返回链表的所有值，前置方法: [ getValue, getPre, getNext, (create, getLast) ]', () => {
			assert.deepStrictEqual(linkNode.traverse(false), [1, 2, 3, 4, 5])
			assert.deepStrictEqual(linkNode.getLast()!.traverse(true), [
				5,
				4,
				3,
				2,
				1
			]) // 从末结点向前遍历
		})
	})
})
