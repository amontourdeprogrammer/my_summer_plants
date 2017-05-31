
#include <Servo.h>

Servo myservo; // create servo object to control a servo

// this constant won't change:
const int  buttonPin = 2;    // the pin that the pushbutton is attached to

// Variables will change:
int buttonState = 0;         // current state of the button
int pos = 0;                // variable to store the servo position

void setup() {
  myservo.attach(3);  // attaches the servo on pin 3 to the servo object
  pinMode(buttonPin, INPUT);  // initialize the button pin as a input
  myservo.write(0);
}


void loop() {
  // read the pushbutton input pin:
  buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
      
    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
      // in steps of 1 degree
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
    delay(5000);
    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
    pos = 0;
  }
  delay(50); // Delay a little bit to avoid bouncing
}
