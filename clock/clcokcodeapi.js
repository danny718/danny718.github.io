var cities = [];
var weather = [];

var url = "https://api.openweathermap.org/data/2.5/weather?q=";
  var setting = "&units=imperial";
  var appid = "&APPID=4caad04fcb4cb56a34de54f40cb622c4";

function preload(){
  
  for(i = 0; i < cities.length; i ++){
    var city = cities[i];
    weather.push(loadJSON(url + city + setting + appid));
  }
}

var input;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  var button = select('#submit');
  button.mousePressed(getWeather);
  
  
}

function getWeather() {
  
  input = select('#city');
  //console.log(input);
  var api = url + input.value() + setting + appid;
  //console.log(api);
  loadJSON(api, gotData);
  
  }

function gotData(data) {
  weather = data;
  //console.log(weather);
}

function draw(getWeather) {
  //setting the time 
 
  let hr = hour();
  let mn = minute();
  let sc = second();
  
  //text
  push();
  fill(0, 0, 100, 100);
  textAlign(CENTER);
  translate(width/2, 0);
  
  //testing API number works in if else statement and mapping or not
  // var a = -40;
  // if (a > -70 && a <=58){
  //   let color1 = map(a, -70, 58, 255, 175);
  //   background(color1, 100, 100, 100);
  // } else {
  //   let color1 = map(a, 58, 134, 405, 325);
  //   background(color1%360, 100, 100, 100);
  // }
  
  for(i = 0; i < weather.length; i++){
    if(weather[i].main.temp > -70 && weather[i].main.feels_like <= 58){
      let color1 = map(weather[i].main.feels_like, -70, 58, 255, 175);
      background(color1%360, 100, 100, 100);
    } else{
      let color1 = map(weather[i].main.feels_like, 58, 134, 425, 345);
      background(color1%360, 100, 100, 100);
    }
    textSize(40);
    text(cities[i], 0, 100);
    textSize(30);
    text(weather[i].main.temp + " °F", 0, 135);
    textSize(20);
    text(hr + " : " + mn + " : " + sc, 0, 600);
  }
  pop();
  
  push();
  fill(0, 0, 100, 100);
  textSize(15);
  text("Instruction", 10, 740);
  textSize(12);
  text("Second stroke color = temperature", 10, 760);
  text("Hour stroke color = wearing indicator", 10, 772);
  text("Background color = temperature feels like", 10, 784);
  pop();
  
  
  push();
  translate(400, 400);
  rotate(-90);
  
  //second angel rotation 
  
  strokeWeight(3);
  for(i = 0; i < weather.length; i++){
    if(weather[i].main.temp > -70 && weather[i].main.temp <= 58){
      let color1 = map(weather[i].main.temp, 70, 58, 255, 175);
      stroke(color1%360, 100, 100, 100);
    } else{
      let color1 = map(weather[i].main.temp, 58, 134, 425, 345);
      stroke(color1%360, 100, 100, 100);
    }
  }
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, secondAngle);
  
  //minute angel rotation 
  
  strokeWeight(5);
  stroke(0, 0, 0, 100);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);
  
  //hour angel rotation 

  strokeWeight(6);
  for(i = 0; i < weather.length; i++){
    if(weather[i].main.temp > -70 && weather[i].main.temp <= 58){
      let color1 = map(weather[i].main.temp, -70, 58, 345, 425);
      stroke(color1%360, 100, 100, 100);
    } else{
      let color1 = map(weather[i].main.temp, 58, 134, 175, 255);
      stroke((color1)%360, 100, 100, 100);
    }
  }
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 260, 260, 0, hourAngle);
  
  //inside second line movement 
  
  push();
  rotate(secondAngle);
  for(i = 0; i < weather.length; i++){
    if(weather[i].main.temp > -70 && weather[i].main.temp <= 58){
      let color1 = map(weather[i].main.temp, 70, 58, 255, 175);
      stroke(color1%360, 100, 100, 100);
    } else{
      let color1 = map(weather[i].main.temp, 58, 134, 425, 345);
      stroke(color1%360, 100, 100, 100);
    }
  }
  strokeWeight(3);
  line(0, 0, 100, 0);
  pop();
  
  //inside minute line movement 
  
  push();
  rotate(minuteAngle);
  strokeWeight(4);
  stroke(0, 0, 0, 100);
  line(0, 0, 80, 0);
  pop();
  
  //inside hour line movement 
  
  push();
  rotate(hourAngle);
  strokeWeight(6);
  for(i = 0; i < weather.length; i++){
    if(weather[i].main.temp > -70 && weather[i].main.temp <= 58){
      let color1 = map(weather[i].main.temp, -70, 58, 345, 425);
      stroke(color1%360, 100, 100, 100);
    } else{
      let color1 = map(weather[i].main.temp, 58, 134, 175, 255);
      stroke(color1%360, 100, 100, 100);
    }
  }
  line(0, 0, 60, 0);
  pop();
  pop();
  
  push();
  noStroke();
  for(var i = 0; i < 10; i++){
    if(i < 5){
      fill(255-i*16, 100, 100, 100);
    } else{
      fill((425-(i-6)*16)%360, 100, 100, 100);
    }
    rect(22*i+567, 765, 20, 20);
  }
  pop();

}