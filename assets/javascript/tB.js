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


  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var name = $('#train-name-input').val().trim();
  console.log(name)
  var destination = $('#destination-input').val().trim();
  var firstTTime = moment($('#first-train-input').val().trim(), "HH:mm").subtract(1, "years").format("X");
  var frequency = $('#frequency-input').val().trim();


  database.ref().push({
    name: name,
    destination: destination,
    firstTTime: firstTTime,
    frequency: frequency,
  });

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  return false;

});

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFirstTTime = childSnapshot.val().firstTTime;
  var tFrequency = childSnapshot.val().frequency;


  var differenceTimes = moment().diff(moment.unix(tFirstTTime), "minutes");
  var trainReminder = moment().diff(moment.unix(tFirstTTime), "minutes") % tFrequency;
  var trainMinutes = tFrequency - trainReminder;

  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A")
  console.log(trainMinutes);
  console.log(trainArrival);

  console.log(moment().format("hh:mm A"));
  console.log(trainArrival);
  console.log(moment().format("X"));



  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");

  });
