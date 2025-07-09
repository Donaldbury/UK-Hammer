$(document).ready(function () {
  // Inject custom alert container
  if (!$("#customAlert").length) {
    $("body").append(`
      <div id="customAlert" class="custom-alert d-none">
        <div class="alert-content">
          <span class="alert-text" id="alertMessage"></span>
          <img src="images/logo.png" alt="Logo" class="alert-logo" />
        </div>
      </div>
    `);
  }

  // Sanitizer
  function sanitizeInput(str) {
    return str.replace(/[<>&"'`]/g, function (c) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
      }[c];
    });
  }

  // Show alert
  function showCustomAlert(message) {
    const $alert = $("#customAlert");
    $("#alertMessage").text(message);
    $alert.removeClass("d-none fade-out");

    setTimeout(() => {
      $alert.addClass("fade-out");
      setTimeout(() => {
        $alert.addClass("d-none");
      }, 500);
    }, 4000);
  }

  // Init EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init("ZCz8hOapT8mU1brO4");
    const $form = $("#serviceForm");
    const $submitBtn = $form.find("button[type='submit']");

    function validateForm($form) {
      let isValid = true;

      $form.find(".is-invalid").removeClass("is-invalid");
      $form.find(".invalid-feedback").remove();

      if ($form.find("input[name='honey_field']").val()) return false;

      const selectedServices = $("input[name='services']:checked");
      if (!selectedServices.length) {
        $(".service-checkbox").closest(".service-option").addClass("is-invalid");
        $(".service-checkbox").last().after('<div class="invalid-feedback d-block">Please select at least one service.</div>');
        isValid = false;
      }

      const fields = {
        name: "Name is required",
        address: "Address is required",
        postcode: "Postcode is required",
        phone: "Valid UK phone number required",
        email: "Valid email address required"
      };

      for (const field in fields) {
        const $input = $form.find(`[name="${field}"]`);
        const value = $input.val().trim();
        let pattern = null;

        if (!value) {
          $input.addClass("is-invalid").after(`<div class="invalid-feedback">${fields[field]}</div>`);
          isValid = false;
        } else {
          if (field === "phone") {
            pattern = /^(?:0|\+44)(?:\d\s?){9,10}$/;
            if (!pattern.test(value)) {
              $input.addClass("is-invalid").after(`<div class="invalid-feedback">${fields[field]}</div>`);
              isValid = false;
            }
          }
          if (field === "email") {
            pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(value)) {
              $input.addClass("is-invalid").after(`<div class="invalid-feedback">${fields[field]}</div>`);
              isValid = false;
            }
          }
        }
      }

      if (!isValid) $form.find(".is-invalid").first().focus();
      return isValid;
    }

    if ($form.length) {
      $form.on("submit", function (e) {
        e.preventDefault();
        $submitBtn.prop("disabled", true);

        const selectedServices = [];
        $("input[name='services']:checked").each(function () {
          selectedServices.push($(this).val());
        });

        let $hidden = $("#services_combined");
        if (!$hidden.length) {
          $hidden = $('<input type="hidden" name="services_combined" id="services_combined">');
          $form.append($hidden);
        }
        $hidden.val(selectedServices.join(", "));

        // Sanitize user input
        const fieldsToSanitize = ["name", "address", "postcode", "phone", "email"];
        fieldsToSanitize.forEach(field => {
          const $input = $form.find(`[name="${field}"]`);
          $input.val(sanitizeInput($input.val()));
        });
        $form.find("textarea[name='details']").val(sanitizeInput($form.find("textarea[name='details']").val()));

        if (!validateForm($form)) {
          $submitBtn.prop("disabled", false);
          return;
        }

        emailjs.sendForm("service_16dqd6e", "template_40drt99", this).then(
          function () {
            showCustomAlert("Your request has been sent to UK Hammer. We’ll be in contact with you shortly.");
            $form[0].reset();
            $("#imagePreview").empty();
            $(".is-invalid").removeClass("is-invalid");
            $(".invalid-feedback").remove();
            $submitBtn.prop("disabled", false);
          },
          function (error) {
            showCustomAlert("Sorry, we couldn’t send your request right now. Please check your internet connection or try again in a moment.");
            $submitBtn.prop("disabled", false);
          }
        );
      });
    }
  } else {
    console.warn("EmailJS is not loaded.");
  }

  // Populate gallery
  const $container = $("#gallery-container");
  if ($container.length) {
    const imagePairs = ["image1", "image2", "image3", "image4"];
    imagePairs.forEach((name) => {
      const before = "images/" + name + "a.png";
      const after = "images/" + name + "b.png";
      const $row = $(`
        <div class="row comparison-row align-items-center">
          <div class="col-md-6 gallery-image mb-3 mb-md-0">
            <a href="${before}" data-lightbox="gallery" data-title="Before">
              <img src="${before}" class="img-fluid" alt="Before" />
            </a>
          </div>
          <div class="col-md-6 gallery-image mb-3 mb-md-0">
            <a href="${after}" data-lightbox="gallery" data-title="After">
              <img src="${after}" class="img-fluid" alt="After" />
            </a>
          </div>
        </div>
      `);
      $container.append($row);
    });
  }

  // Image preview
  const imageInput = document.querySelector('input[name="images"]');
  if (imageInput) {
    imageInput.addEventListener("change", function () {
      const preview = document.getElementById("imagePreview");
      if (preview) {
        preview.innerHTML = "";
        Array.from(this.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "img-thumbnail";
            img.style.maxWidth = "150px";
            img.style.height = "auto";
            preview.appendChild(img);
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }
});
