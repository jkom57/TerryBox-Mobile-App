//Pines componentes
const int pinLED = 18;
const int pinTCRT = 4;
//const int pinTCRT2 = 5;

//Librerias
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

WiFiMulti WiFiMulti;
HTTPClient ask;
// Configuración del usuario
const char* ssid = "TP-LINK_DD0D7E"; //Nombre Wifi
const char* password = "6141336565"; //Contraseña Wifi
const char* apiKeyOut = "ApqcSEMXPV8ILyI7H6tZLZ503JwfHBpb"; // Key de la API del Actuador
const char* apiKeyIn = "twaR4DW4SR2JEuFOdOQ9PzeDJr0P0WAb";      // Key de la API del Sensor
const unsigned int readInterval = 2000; // Intervalo

// Configuración de la API de AskSensors
const char* host = "api.asksensors.com"; //Nombre del host del API
const int httpPort = 80; // puerto
void setup(){
 
  // Abrir Serial
  Serial.begin(115200);
  Serial.println("*****************************************************");
  Serial.println("********** Inicio del programa");
  Serial.println("Conectando... ");

  // Conectando ESP al WiFi
  WiFiMulti.addAP(ssid,password);
  while (WiFiMulti.run() != WL_CONNECTED) {
     Serial.print(".");
    delay(500);
   }
   // Conectado
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());

  //Inicializando pines
  pinMode(pinLED,OUTPUT);
  pinMode(pinTCRT,INPUT);
//  pinMode(pinTCRT2,INPUT);
}

void loop(){
  //Se establecen valores predeterminados
   int mod1 = 0;
   //int mod2 = 0;
  
   //Se lee los sensor
   int val1 = digitalRead(pinTCRT);
   //int val2 = digitalRead(pinTCRT2);
   
   // Utiliza WiFiClient para crear usuarios TCP
   WiFiClient client;
  //Manda error en caso de que la creacion del usuario falle
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }else {

  // Creación de URL que lea el boton, puede cambiarse por cualquier api REST
  String urlIn = "http://api.asksensors.com/read/";
  urlIn += apiKeyOut;
  urlIn += "?module=module1";
  urlIn += "&maxResults=1";
  
  //Creación de URL que mande los datos del sensor, puede cambiarse por cualquier api REST
  String urlOut = "http://api.asksensors.com/write/";
  urlOut += apiKeyIn;
  
  // Se recibe datos de la API del boton
  ask.begin(urlIn); //Especifica la URL

   //Revisa el codigo que retorna
  int httpCode = ask.GET();

  if (httpCode > 0) {

    String payload = ask.getString();
    String command_value;
    JSONVar askObject = JSON.parse(payload);

    // JSON.typeof(jsonVar) se utiliza para tener el tipo de var
    if (JSON.typeof(askObject[0]) == "undefined") {
    Serial.println("Fallo de Parseo");
    return;
  }

  // Se lee el valor del comando y se convierte a integrer
   if (askObject[0].hasOwnProperty("value")) {
    command_value = (const char*)askObject[0]["value"];
    int com = command_value.toInt();
    //Se configura que se va a enviar a AskSensors
    switch(com){
      case 0:
            digitalWrite(pinLED,LOW);
            digitalWrite(pinLED,HIGH);
            break;
      case 1:
            digitalWrite(pinLED,HIGH);
            digitalWrite(pinLED,LOW);
            //En caso de que se cumpla la condicion de que este prendido, cambia el valor por defecto a 100
               if(val1 == HIGH){
                  mod1 = 100;
               }
               //if(val2 == HIGH){
               //   mod2 = 100;
               //}
         }
    //Se termina de armar la API para enviar
    urlOut += "?module1=";
    urlOut += mod1;
    urlOut += "&module2=";
    urlOut += mod1;
    //Se manda los datos a la base de datos
    ask.begin(urlOut);


    //Valida que se haya recebido los datos de manera correcta
    int httpCode = ask.GET();          
 
    if (httpCode > 0) { 
      Serial.println("Successful HTTP request");
      }else {
      Serial.println("Error on HTTP request");
    }

  }
//  // Se lee la fecha
//   if (askObject[0].hasOwnProperty("date")) {
//     Serial.print("Ultima fecha de actualización: ");
//     Serial.println((const char*)askObject[0]["date"]);
//  }else {
//    Serial.println("Fallo en la petición HTTP");
//  }

  ask.end(); //Finaliza

   }

  client.stop(); // Detiene el cliente
  delay(readInterval); // delay
}}
