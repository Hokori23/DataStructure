export class LinkNode {
	private value: any
	private next: LinkNode | null
	private pre: LinkNode | null
	constructor(value: any, next: LinkNode | null, pre?: LinkNode | null) {
		this.value = value || null
		this.next = next || null
		if (pre !== undefined) this.pre = pre
	}
	public getValue(): any {
		return this.value
	}
	public getNext(): LinkNode {
		return this.next
	}
	public getPre(): LinkNode {
		return this.pre
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
		isUnidireactional: boolean = true	// 单向链表
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
		let curr: LinkNode = this
		while (curr) {
			if (currIdx === idx) {
				return curr
			}
			currIdx++
			curr = curr.next
		}
		return null
	}
	insert(value: any, idx: number): boolean {
		const pre = this.find(idx - 1)
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
	print(isReverse?: boolean): void {
		let res = ''
		let curr: LinkNode = this
		if (isReverse) {
			while (curr) {
				res += curr.getValue()
				curr = curr.getPre()
			}
		} else {
			while (curr) {
				res += curr.getValue()
				curr = curr.getNext()
			}
		}
		console.log(res)
	}
	getLast(isReverse?: boolean): LinkNode {
		let curr: LinkNode = this
		if (isReverse) {
			while (curr.pre) {
				curr = curr.getPre()
			}
		} else {
			while (curr.next) {
				curr = curr.getNext()
			}
		}
		return curr
	}
}

export const demo = () => {
	const arr = [1, 2, 3, 4, 5]
	const head = LinkNode.create(arr, false)
	console.log('-- print')
	head.print()
	let last = head.getLast()
	console.log('\n-- print reverse')
	last.print(true)
	console.log('\n-- insert 6 into the position of index 3')
	head.insert(6, 3)
	console.log('\n-- print')
	head.print()
	console.log('\n-- delete the value from the position of index 4')
	head.delete(4)
	console.log('\n-- print')
	head.print()
}
