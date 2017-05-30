// this constant won't change:
const int  buttonPin = 2;    // the pin that the pushbutton is attached to
const int ledPin = 13;       // the pin that the LED is attached to

// Variables will change:
int buttonState = 0;         // current state of the button

void setup() {
  // initialize the button pin as a input:
  pinMode(buttonPin, INPUT);
  // initialize the LED as an output:
  pinMode(ledPin, OUTPUT);
}


void loop() {
  // read the pushbutton input pin:
  buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
      digitalWrite(ledPin, HIGH);
      delay(2000);
      digitalWrite(ledPin, LOW);
    // Delay a little bit to avoid bouncing
  }
  delay(50);
}
