const { getSerialPortList } = require('./serialport');
const {sendMessage} = require('./messagesWeb');

function messagesHandlerFromWeb(json, note) {
  console.log(json);
  const messageObj = JSON.parse(json);
  const event = messageObj.event;
  if (event === 'GET_USB_DEVICES') {
    getSerialPortList().then((ports) => {
      console.log(ports);
      sendMessage(note.win, note.channelName, JSON.stringify({ event: 'USB_DEVICES', data: ports }));
    });
  }
}

module.exports = { messagesHandlerFromWeb };
