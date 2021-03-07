import { isDef } from '../utils'
export class LinkNode {
	private value: any = null
	private next: LinkNode | null = null
	private pre: LinkNode | null = null
	constructor(value: any, next?: LinkNode | null, pre?: LinkNode | null) {
		this.value = value
		if (next !== undefined) this.next = next
		if (pre !== undefined) this.pre = pre
	}
	public getValue(): any {
		return this.value
	}
	public getNext(): LinkNode | null {
		return this.next
	}
	/**
	 * @description 只有双向链表这个方法才有意义
	 */
	public getPre(): LinkNode | null {
		return this.pre
	}
	getLast(isReverse: boolean = false): LinkNode | null {
		let curr: LinkNode | null = this
		if (isReverse) {
			while (curr?.pre) {
				curr = curr.getPre()
			}
		} else {
			while (curr?.next) {
				curr = curr.getNext()
			}
		}
		return curr
	}
	public setValue(value: any): void {
		this.value = value
	}
	public setNext(next: LinkNode): void {
		this.next = next
	}
	public setPre(pre: LinkNode): void {
		this.pre = pre
	}
	static create(
		arr: any[],
		isUnidireactional: boolean = true // 单向链表
	): LinkNode | null {
		const length = arr.length
		if (!length) return null

		const last = new LinkNode(arr[length - 1], null, null)
		let curr = last
		let idx = length - 2
		if (isUnidireactional) {
			while (idx >= 0) {
				const pre = new LinkNode(arr[idx], curr)
				curr = pre
				idx--
			}
		} else {
			while (idx >= 0) {
				const pre = new LinkNode(arr[idx], curr, null)
				curr.pre = pre
				curr = pre
				idx--
			}
		}
		return curr
	}
	find(idx: number): LinkNode | null {
		let currIdx = 0
		let curr: LinkNode | null = this
		while (curr) {
			if (currIdx === idx) {
				return curr
			}
			currIdx++
			curr = curr.next
		}
		return null
	}
	insert(value: any, idx?: number): boolean {
		const pre = isDef(idx) ? this.find((idx as number) - 1) : this.getLast()
		if (!pre) {
			// error idx
			return false
		}
		const curr = new LinkNode(value, pre.next)
		pre.next = curr
		return true
	}
	delete(idx: number): boolean {
		const pre = this.find(idx - 1)
		if (!pre || !pre.next) {
			// error idx
			return false
		}
		pre.next = pre.next.next
		return true
	}
	traverse(isReverse?: boolean): any[] {
		const res: any[] = []
		let curr: LinkNode | null = this
		if (isReverse) {
			while (curr) {
				res.push(curr.getValue())
				curr = curr.getPre()
			}
		} else {
			while (curr) {
				res.push(curr.getValue())
				curr = curr.getNext()
			}
		}
		return res
	}
}
