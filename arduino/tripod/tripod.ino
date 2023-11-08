#define M1_ENABLE_PIN 2
#define M1_STEP_PIN 3
#define M1_DIR_PIN 4

#define M2_ENABLE_PIN 5
#define M2_STEP_PIN 6
#define M2_DIR_PIN 7

#define steps 200
#define waitingTime 1000
#define minWaitingTime 400
#define decrement 3

String inputString = ""; // Строка для хранения входящих данных
bool stringComplete = false; // Флаг, что строка получена полностью

void setup() {
  pinMode(M1_STEP_PIN, OUTPUT);
  pinMode(M1_DIR_PIN, OUTPUT);
  pinMode(M1_ENABLE_PIN, OUTPUT);

  pinMode(M2_STEP_PIN, OUTPUT);
  pinMode(M2_DIR_PIN, OUTPUT);
  pinMode(M2_ENABLE_PIN, OUTPUT);

  Serial.begin(9600);
  inputString.reserve(200); // Резервируем место для входящей строки
}

void loop() {
  if (stringComplete) {
    if (inputString == "up") {
      digitalWrite(M1_DIR_PIN, HIGH);
      smoothStepper(M1_STEP_PIN, steps);
    } else if (inputString == "down") {
      digitalWrite(M1_DIR_PIN, LOW);
      smoothStepper(M1_STEP_PIN, steps);
    } else if (inputString == "left") {
      digitalWrite(M2_DIR_PIN, HIGH);
      smoothStepper(M2_STEP_PIN, steps);
    } else if (inputString == "right") {
      digitalWrite(M2_DIR_PIN, LOW);
      smoothStepper(M2_STEP_PIN, steps);
    }

    inputString = ""; // Очищаем строку
    stringComplete = false; // Сбрасываем флаг
  }
}

void smoothStepper(int step_pin, int step_count) {
  int loopWaitingTime = waitingTime;
  for(int i = 0; i < step_count; i++) {
    digitalWrite(step_pin, HIGH);
    delayMicroseconds(loopWaitingTime);
    digitalWrite(step_pin, LOW);
    delayMicroseconds(loopWaitingTime);
    if (loopWaitingTime > minWaitingTime) {
      loopWaitingTime -= decrement;
    }
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      stringComplete = true;
    } else {
      inputString += inChar;
    }
  }
}
