/**
 * 由栈实现的顺序队列
 * @description 有假溢出的缺点
 */
export class QueueByStack {
	private front: number = 0 // 队头元素下标
	private rear: number = 0 // 队尾元素下标
	private queue: any[] = []
	private size: number
	constructor(size: number) {
		this.size = size
	}
	getQueue(): any[] {
		return this.queue
	}
	setNull(): void {
		this.queue = new Array(this.size)
		this.front = null
		this.rear = null
	}
	isEmpty(): boolean {
		return this.front === this.rear
	}
	push(value: any): boolean {
		if (this.rear === this.size) return false
		this.queue[this.rear - 1] = value
		this.rear++
		return true
	}
	pop(): boolean | any {
		if (this.isEmpty()) return false
		const result = this.queue[this.front]
		delete this.queue[this.front]
		this.front++
		return result
	}
}

/**
 * 由栈实现的循环队列
 * @description 解决假溢出的问题
 */
export class CircularQueueByStack {
	private front: number = -1 // 队头元素下标
	private rear: number = -1 // 队尾元素下标
	private queue: any[] = []
	private size: number
	constructor(size: number) {
		if (!size) throw new RangeError('Except for { size: number } bigger than 0')
		// TODO: 检测是否可以size + 1
		this.size = size
		// this.size = size + 1
	}
	getQueue(): any[] {
		return this.queue
	}
	setNull(): void {
		this.queue = new Array(this.size)
		this.front = -1
		this.rear = -1
	}
	isEmpty(): boolean {
		return this.front === this.rear
	}
	push(value: any): boolean {
		if ((this.rear + 1) % this.size === this.front) return false
		this.rear = (this.rear + 1) % this.size
		this.queue[this.rear] = value
		return true
	}
	pop(): boolean {
		if (this.isEmpty()) return false
		this.front = (this.front + 1) % this.size
		return this.queue[this.front]
	}
	getFront(): any {
		if (this.isEmpty()) return undefined
		return this.queue[(this.front + 1) % this.size]
	}
	getRear(): any {
		if (this.isEmpty()) return undefined
		return this.queue[this.rear]
	}
}

/**
 * 由链表实现的循环队列
 * @description 不会溢出
 */
class Node {
	value: any
	next: Node | null
	constructor(value: any, next: Node | null = null) {
		this.value = value
		if (next) this.next = next
	}
}
export class CircularQueueByLinkList {
	private front: Node | null
	private rear: Node | null
	constructor() {
		this.front = this.rear = new Node(-1)
	}
	isEmpty(): boolean {
		return this.front === this.rear
	}
	push(value: any): void {
    const rear = new Node(value)
    this.rear.next = rear
    this.rear = rear
  }
	pop(): Node | null {
		if (this.isEmpty()) return null
    this.front = this.front.next
    return this.front
  }
	getFront(): any {
		if (this.isEmpty()) return undefined
    return this.front.next
	}
	getRear(): any {
		if (this.isEmpty()) return undefined
    return this.rear
	}
}

export const demo = () => {
	console.log('CircularQueueByStack')
	const circularQueue = new CircularQueueByStack(5)
	for (let i = 1; i <= 3; i++) {
		console.log('push', i)
		circularQueue.push(i)
		console.log(
			'Front',
			circularQueue.getFront(),
			'Rear',
			circularQueue.getRear()
		)
	}
	for (let i = 0; i < 3; i++) {
		console.log('pop', circularQueue.pop())
		console.log(
			'Front',
			circularQueue.getFront(),
			'Rear',
			circularQueue.getRear()
		)
	}
	console.log('whether is empty', circularQueue.isEmpty())
}
