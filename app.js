// Paste your Firebase config here (from Step 1)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const studentName = document.getElementById("studentName").value;
    const course = document.getElementById("course").value;
    const system = document.getElementById("system").value;
    const date = document.getElementById("date").value;
    const timeSlot = document.getElementById("timeSlot").value;
  
    // Check if course is already booked at this time
    database.ref("bookings").orderByChild("timeSlot").equalTo(timeSlot).once("value", (snapshot) => {
      let conflict = false;
      snapshot.forEach((booking) => {
        if (booking.val().course === course) {
          conflict = true;
        }
      });
      
      if (conflict) {
        document.getElementById("message").innerHTML = 
          '<span class="error">Error: This course is already booked at this time!</span>';
      } else {
        // Save booking
        database.ref("bookings").push({
          studentName,
          course,
          system,
          date,
          timeSlot,
          status: "booked"
        });
        document.getElementById("message").innerHTML = "✅ Slot booked successfully!";
        document.getElementById("bookingForm").reset();
      }
    });
  });