const pkg = require('serialport');
const { SerialPort } = pkg;

async function getSerialPortList () {
  // Получаем список доступных портов
  return await SerialPort.list();
}

// async function setupSerialPort () {
//   // Получаем список доступных портов
//   const ports = await SerialPort.list();
//
//   console.log(ports);
//
//
// // для определения названия порта введи команду в консоли 'ls /dev | grep usbserial'
// //   const port = new SerialPort({
// //     path: '/dev/tty.usbserial-1110',
// //     baudRate: 9600,
// //   });
// //
// //   port.on('data', function (data) {
// //     console.log('Data:', data.toString());
// //   });
// }

module.exports = { getSerialPortList };
