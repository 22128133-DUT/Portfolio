/* Count to a specific number */
function count(els) {
	els.each(function () {
		$(this)
			.prop('Counter', 0)
			.animate(
				{
					Counter: $(this).text(),
				},
				{
					duration: 3000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					},
				}
			);
	});
}
/* Count when the counter section is in viewport */
const counterEls = $('.counter .counter__count');
new Waypoint({
	element: counterEls,

	handler: function () {
		count(counterEls);

		this.destroy();
	},

	offset: 'bottom-in-view',
});

/* Make navbar fixed when scrolled down and hide it when scrolled up */
const navbar = $('.navbar-top');
let previousScroll = 0;
$(window).on('scroll', function (event) {
	let currentScroll = $(window).scrollTop(); //Distance scrolled down the page
	let navHeight = $(navbar).height(); //Height of navbar
	if (currentScroll > 10) {
		$('.navbar-top').addClass('navbar-top--scrolled');
	} else {
		$('.navbar-top').removeClass('navbar-top--scrolled');
	}

	//When scrolling down AND you've scrolled past navHeight * 2.25, add .scrollUp
	if (currentScroll > previousScroll && currentScroll > navHeight * 2.25) {
		$(navbar).addClass('scrollUp');
		//When scrolling up AND you've scrolled less than navHeight, remove .scrollUp
	} else if (previousScroll > currentScroll && !(currentScroll <= navHeight)) {
		$(navbar).removeClass('scrollUp');
	}
	previousScroll = currentScroll;
});

/* Add navbar background color when it is not collapsed */
$('#navbarTopCollapsible').on('show.bs.collapse', function () {
	$('.navbar-top').addClass('bg-dark-trans');
});
$('#navbarTopCollapsible').on('hide.bs.collapse', function () {
	$('.navbar-top').removeClass('bg-dark-trans');
});

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("RWjHDC7C7oGUSYDB-");

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('Email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            to_name: 'Muhammad Sameer Abdul Aziz',
            from_name: email, 
            message: `Subject: ${subject}\n\n${message}`,
            reply_to: email
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send("service_y1nbbld", "template_xoeopri", templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
               alert('Email sent successfully!');
            }, function(error) {
               console.error('FAILED...', error);
               alert('Failed to send email. Please try again later.');
            });
    });

	// Calculate age based on birth date
    const birthDate = new Date(2002, 8, 15); // Months are 0-indexed, so 8 is September
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    // Update the age in the HTML
    document.getElementById('age').textContent = age;

	const certificates = document.querySelectorAll('.certificate-item');
    const toggleCertificatesBtn = document.getElementById('toggleCertificatesBtn');
    let showingAll = false;

    // Initially hide all certificates except the first three
    certificates.forEach((certificate, index) => {
        if (index >= 3) {
            certificate.style.display = 'none';
        }
    });

    // Toggle certificates visibility when the button is clicked
    toggleCertificatesBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (showingAll) {
            // Hide all certificates except the first three
            certificates.forEach((certificate, index) => {
                if (index >= 3) {
                    certificate.style.display = 'none';
                }
            });
            toggleCertificatesBtn.textContent = 'Show all';
        } else {
            // Show all certificates
            certificates.forEach(certificate => {
                certificate.style.display = 'block';
            });
            toggleCertificatesBtn.textContent = 'See less';
        }
        showingAll = !showingAll;
    });
});