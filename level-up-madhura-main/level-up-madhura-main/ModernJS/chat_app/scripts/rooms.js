class ChatRoom {
  constructor() {
    this.rooms = db.collection('rooms');
    this.unsub;
  }
  async addRoom(roomName) {
    // format a chat object
    const now = new Date();
    const roomData = {
      room: roomName,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.rooms.add(roomData);
    return response;
  }

  getRooms(callback) {
    this.unsub = this.rooms.orderBy('created_at').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        callback(change.doc.data());
      });
    });
  }

 
}
