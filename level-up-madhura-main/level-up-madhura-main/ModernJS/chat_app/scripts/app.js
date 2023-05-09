// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const newChannelForm = document.querySelector('.new-channel');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const addRoomButton = document.querySelector('.add-room');
const uname = document.querySelector('.updatename');

// add a new chat
newChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chats
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

// update the username
newNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const uname = document.querySelector('.updatename');
  // update name via chatroom
  console.log(e);
  const newName = newNameForm.name.value.trim();
  chats.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  uname.innerText=`Current Username : ${newName}`;
  updateMssg.innerText = `Your name was updated to ${newName}`;
  console.log(uname,newName,e);
  setTimeout(() => (updateMssg.innerText = ''), 3000);
});

// update the chat room
rooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    appUI.clearChats();
    chats.updateRoom(e.target.getAttribute('id'));
    chats.getChats((chat) => appUI.renderChatList(chat));
  }
});

newChannelForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // update name via chatroom
  const newChannelName = newChannelForm.channel.value.trim();
  console.log('name ' + newChannelName);
  chatsRoom
    .addRoom(newChannelName)
    .then(() => {})
    .catch((err) => console.log(err));
  // reset the form
  newChannelForm.reset();
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';
uname.innerHTML = `Current username: ${username}`;




// class instances
const appUI = new UI(chatList, rooms);

const chatsRoom = new ChatRoom(username);

// chatsRoom.deleteRooms();

var chats = undefined;

// get rooms & chats & render
chatsRoom.getRooms((data) => {
  appUI.renderRoomsList(data);
  var room = sessionStorage.getItem("room");
  if(!room){
    chats = new Chats(room, username);
    // get chats & render
    chats.getChats((data) => appUI.renderChatList(data));

    //change default selected button color
    UI.updatePageHeading(room);
    UI.updateChannelColor(room, room);

  }
  else if(!chats) {
    chats = new Chats(data.room, username);
    // get chats & render
    chats.getChats((data) => appUI.renderChatList(data));

    //change default selected button color
    UI.updatePageHeading(data.room);
    UI.updateChannelColor(data.room, data.room);
  }
});
