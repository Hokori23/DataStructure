export class Stack {
	private length: number = 0 // 当前元素数量
	private stack: any[] = []
	private size?: number // 最大元素数量
	constructor(size?: number) {
		if (size !== undefined) {
			this.size = size
			this.stack = new Array(size)
		}
	}
	getStack(): any[] {
		return this.stack
	}
	setNull(): void {
		this.stack = this.size !== undefined ? new Array(this.size) : []
		this.length = 0
	}
	isEmpty(): boolean {
		return this.length === 0
	}
	push(value: any): boolean {
		if (this.size !== undefined && this.length >= this.size) return false
		this.stack[this.length] = value
		this.length++
		return true
	}
	pop(): boolean | any {
		if (this.isEmpty()) return false

		const result = this.stack[this.length - 1]
		if (this.size !== undefined) {
			delete this.stack[this.length - 1]
		} else {
			this.stack.length--
		}
		this.length--
		return result
	}
	top(): boolean | any {
		if (this.isEmpty()) return false
		
		return this.stack[this.length - 1]
	}
}
export const demo = () => {
	console.log('infinity stack')
	const infinityStack = new Stack()
	for (let i = 1; i <= 3; i++) {
		console.log('push', i)
		infinityStack.push(i)
		console.log(infinityStack)
	}
	for (let i = 0; i < 3; i++) {
		console.log('pop')
		infinityStack.pop()
		console.log(infinityStack)
	}
	console.log('whether is empty', infinityStack.isEmpty())
	console.log('\nlimit stack')
	const limitStack = new Stack(3)
	for (let i = 1; i <= 3; i++) {
		console.log('push', i)
		limitStack.push(i)
		console.log(limitStack)
	}
	for (let i = 0; i < 3; i++) {
		console.log('pop')
		limitStack.pop()
		console.log(limitStack)
	}
	console.log('whether is empty', limitStack.isEmpty())
}
