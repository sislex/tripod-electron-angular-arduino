const { ipcRenderer,  } = require('electron');
const pkg = require('serialport');
const { SerialPort } = pkg;

// для определения названия порта введи команду в консоли 'ls /dev | grep usbserial'
const port = new SerialPort({
  path: '/dev/tty.usbserial-110',
  baudRate: 9600,
});

port.on('data', function (data) {
  console.log('Data:', data.toString());
});

document.getElementById('Up').addEventListener('click', () => {
  port.write('up\n');
});

document.getElementById('Down').addEventListener('click', () => {
  port.write('down\n');
});

document.getElementById('Right').addEventListener('click', () => {
  port.write('right\n');
});

document.getElementById('Left').addEventListener('click', () => {
  port.write('left\n');
});

document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowUp':
      port.write('up\n');
      break;
    case 'ArrowDown':
      port.write('down\n');
      break;
    case 'ArrowRight':
      port.write('right\n');
      break;
    case 'ArrowLeft':
      port.write('left\n');
      break;
    default:
      // Обработка других клавиш, если нужно
      break;
  }
});
