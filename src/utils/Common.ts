export class Common {
	/**
	 * 生成一个新的唯一的Guid
	 * @returns 新的Guid
	 */
	public static getNewGuid(): string {
		return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
			.replace(/[xy]/g, function (c) {
				let r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			})
			.toUpperCase();
	}
}
