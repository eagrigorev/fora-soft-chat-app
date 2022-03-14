class Message {
	userName;
	text;
	time;
	constructor(userName, text, time) {
		this.userName = userName;
		this.text = text;
		this.time = time;
	}
}

module.exports = Message;
