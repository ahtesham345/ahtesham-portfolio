/**
* PHP Email Form Validation - v3.7
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.error-message').style.display = 'none';
      thisForm.querySelector('.sent-message').style.display = 'none';

      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        thisForm.querySelector('.loading').style.display = 'none';

        if (data.success) {
          thisForm.querySelector('.sent-message').style.display = 'block';
          thisForm.reset();
        } else {
          throw new Error(data.message || 'Form submission failed');
        }
      })
      .catch((error) => {
        thisForm.querySelector('.loading').style.display = 'none';
        displayError(thisForm, error.message);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').style.display = 'block';
  }

})();

