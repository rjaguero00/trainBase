  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbLMhfKLMAPqV1WQge65Qqn5-yIfXY094",
    authDomain: "trainbase-41fa9.firebaseapp.com",
    databaseURL: "https://trainbase-41fa9.firebaseio.com",
    projectId: "trainbase-41fa9",
    storageBucket: "trainbase-41fa9.appspot.com",
    messagingSenderId: "187402706088"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTTime = 0;
  var frequency = 0;

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var name = $('#train-name-input').val().trim();
  console.log(name)
  var destination = $('#destination-input').val().trim();
  var firstTTime = $('#first-train-input').val().trim();
  var frequency = $('#frequency-input').val().trim();


  database.ref().push({
    name: name,
    destination: destination,
    firstTTime: firstTTime,
    frequency: frequency,
  });

});

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTTime = childSnapshot.val().firstTTime;
  var frequency = childSnapshot.val().frequency;

  console.log(name);
  console.log(destination);
  console.log(firstTTime);
  console.log(frequency);

  var date = moment().format("MMM Do YY")

  var trainFirsttime =  moment(date + firstTTime);
  console.log(trainFirsttime.hours());
  // time.add(20, 'hours'); // time operations follow time-math logic
  // var s = time.format("HH:mm");

  var currentTrainTime = moment();

  var timeBetween = currentTrainTime.diff(trainFirsttime, "minutes");

  console.log(timeBetween)

  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    "</td><td>" + frequency + "</td><td>");

  });
