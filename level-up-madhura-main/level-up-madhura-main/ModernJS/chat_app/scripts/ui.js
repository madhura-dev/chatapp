class UI {
  constructor(list, rooms) {
    this.list = list;
    this.rooms = rooms;
  }
  clearChats() {
    this.list.innerHTML = '';
  }

  clearRoome() {
    this.rooms.innerHTML = '';
  }

  renderChatList(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</span>
      </li>
    `;
    // const tempList = this.list.innerHTML;
    // this.list.innerHTML = html;
    // this.list.innerHTML += tempList;
    this.list.innerHTML += html;
  }

  renderRoomsList(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
    <button class="btn mt-1 text-center" id="${data.room}">
    #${data.room}
  </button>
    `;
    this.rooms.innerHTML += html;
  }

  static updateChannelColor(room, prevRoom) {
    const prevSelectedChanel = document.getElementById(prevRoom);
    const selectedChannel = document.getElementById(room);

    if (room != this.prevRoom) {
      prevSelectedChanel.style.backgroundColor = '';
      selectedChannel.style.backgroundColor = 'green';
    } else {
      selectedChannel.style.backgroundColor = 'green';
    }
  }

  static updatePageHeading(channelName) {
    document.getElementById('heading').innerHTML =
      'Current chatroom : ' + channelName;
  }
}
