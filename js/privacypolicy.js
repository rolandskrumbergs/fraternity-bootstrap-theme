document.addEventListener("DOMContentLoaded",function(){

    var privacyAlert = document.querySelector(".privacyalert");
    var acceptPrivacy = document.querySelector(".acceptprivacy");

    if (!privacyAlert) {
       return;
    }

    privacyAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

    // Show the alert if we cant find the "acceptPolicy"
    if (!getPrivacy("acceptPrivacy")) {
        privacyAlert.classList.add("show");
    }

    // When clicking on the agree button, create a 1 year
    acceptPrivacy.addEventListener("click", function () {
        setPrivacy("acceptPrivacy", true, 365);
        privacyAlert.classList.remove("show");

        // dispatch the accepts event
        window.dispatchEvent(new Event("privacyAlertAccept"))
    });


});

// Cookie functions from w3schools
    function setPrivacy(cookieName, cookieValue, expirationTimeInDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationTimeInDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    function getPrivacy(cookieName) {
        var name = cookieName + "=";
        var decodedPrivacy = decodeURIComponent(document.cookie);
        var ca = decodedPrivacy.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }