const { getSerialPortList } = require('./serialport');
const {sendMessage} = require('./messagesWeb');

function messagesHandlerFromWeb(json, note) {
  console.log(json);
  const messageObj = JSON.parse(json);
  const event = messageObj.event;
  const data = messageObj.data;
  if (event === 'GET_USB_DEVICES') {
    getSerialPortList().then((ports) => {
      sendMessage(note.win, note.channelName, JSON.stringify({ event: 'USB_DEVICES', data: ports }));
    });
  } else if (event === 'CONNECT_USB_DEVICE') {
    getSerialPortList().then((ports) => {
      console.log(data.item.name)
      const port = ports.find((p) => p.path === messageObj.data.item.name);
      sendMessage(note.win, note.channelName, JSON.stringify({ event: 'USB_DEVICES', data: [port] }));
    });
  }
}

module.exports = { messagesHandlerFromWeb };
