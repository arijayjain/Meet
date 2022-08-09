// replace these values with those generated in your Video API account
var apiKey = "47552721";
var sessionId = "1_MX40NzU1MjcyMX5-MTY2MDA2MDkxMTU0NH5jaitDVjNFdlhRNklhNEZUcnY5enB2NFd-fg";
var token = "T1==cGFydG5lcl9pZD00NzU1MjcyMSZzaWc9YmU2NDA3M2Y5NTFiNTNkNTc5Y2YxODM3NjM3ZDRjN2JkNGNjZjFlZDpzZXNzaW9uX2lkPTFfTVg0ME56VTFNamN5TVg1LU1UWTJNREEyTURreE1UVTBOSDVqYWl0RFZqTkZkbGhSTmtsaE5FWlVjblk1ZW5CMk5GZC1mZyZjcmVhdGVfdGltZT0xNjYwMDYwOTEyJm5vbmNlPTAuOTYzNzkyNDY0MjQ2NzgzOSZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNjYyNjUyOTEyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();
// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });
  // (optional) add server code here
  var SERVER_BASE_URL = 'https://learninggroup.herokuapp.com';
  fetch(SERVER_BASE_URL + '/session').then(function(res) {
    return res.json()
  }).then(function(res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;
    initializeSession();
  }).catch(handleError);

