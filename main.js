window.addEventListener("load", () => {
    const errorBox = document.getElementById("error");
    const errorDetails = document.getElementById("error-details");
  
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    const utf8Encoder = new TextEncoder();
  
    function bitSet(number, bit) {
      return (number >> bit) & 1 != 0;
    }
  
    function* findIdenticalBits(aString, bString) {
      var a = utf8Encoder.encode(aString);
      var b = utf8Encoder.encode(bString);
  
      for (var i = 0; i < Math.min(a.length, b.length); i++) {
        for (var j = 0; j < 8; j++) {
          if (bitSet(a[i], j) == bitSet(b[i], j)) {
            yield i * 8 + j;
          }
        }
      }
    }
  
    function setErrorMessage(message) {
      errorBox.style.display = message == null ? "none" : "block";
      if (message != null) errorDetails.innerText = message;
    }
  
    function updateErrorMessage() {
      var bits = Array.from(findIdenticalBits(usernameInput.value, passwordInput.value));
  
      if (bits.length > 0) {
        var message = "Bits ";
  
        for (var i = 0; i < bits.length; i++) {
          message += bits[i] + 1;
  
          if (i < bits.length - 2) message += ", ";
          if (i == bits.length - 2) message += " and ";
        }
  
        message += " are the same in both the password and username."
  
        setErrorMessage(message);
      } else {
        setErrorMessage(null);
      }
    }
  
    updateErrorMessage();
  
    usernameInput.addEventListener("input", () => updateErrorMessage());
    passwordInput.addEventListener("input", () => updateErrorMessage());
  });