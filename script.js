

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

// Hero button
const bookServiceBtn = document.getElementById("bookServiceBtn");

// Cart
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");

// Booking form
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Newsletter
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

// Add buttons
const addButtons = document.querySelectorAll(".add-btn");


let cart = [];


menuBtn.addEventListener("click", function () {


    navLinks.classList.toggle("active");

});



const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});



bookServiceBtn.addEventListener("click", function () {


    const bookingSection = document.getElementById("services");

    
    bookingSection.scrollIntoView({
        behavior: "smooth"
    });

});


addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

    
        const serviceName = button.getAttribute("data-name");
        const servicePrice = Number(
            button.getAttribute("data-price")
        );


    
        const service = {
            name: serviceName,
            price: servicePrice
        };



        cart.push(service);


    
        updateCart();

    });

});



function updateCart() {

    
    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                No items added yet.
            </p>
        `;

        totalAmount.textContent = "₹0";

        return;
    }


    let total = 0;
    cart.forEach(function (item, index) {
        total = total + item.price;
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            
            <div>
                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ₹${item.price}
                </div>
            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">
                Remove Now
            </button>

        `;
        cartItems.appendChild(cartItem);

    });

    totalAmount.textContent = `₹${total}`;

}


function removeItem(index) {
    cart.splice(index, 1);
    updateCart();

}


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (cart.length === 0) {

        bookingMessage.textContent =
            "Please add at least one service before booking.";

        bookingMessage.style.color = "#d63031";

        return;
    }


    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    if (
        fullName === "" ||
        email === "" ||
        phone === ""
    ) {

        bookingMessage.textContent =
            "Please fill all the fields.";

        bookingMessage.style.color = "#d63031";

        return;
    }


    let total = 0;

    cart.forEach(function (item) {

        total = total + item.price;

    });

    let serviceList = "";

    cart.forEach(function (item) {

        serviceList +=
            `${item.name} - ₹${item.price}\n`;

    });


    const templateParams = {

        customer_name: fullName,

        customer_email: email,

        customer_phone: phone,

        services: serviceList,

        total_amount: `₹${total}`

    };


    emailjs.send(
        "service_4dxiz6b",
        "template_1dojb28",
        templateParams
    )
    .then(function(response) {

        console.log("Email sent successfully!", response);

        showBookingSuccess();

    })
    .catch(function(error) {

        console.error("Email error:", error);

        bookingMessage.textContent =
            "Booking submitted, but email could not be sent.";

        bookingMessage.style.color = "#d63031";

    });

    showBookingSuccess();

});


function showBookingSuccess() {

    bookingMessage.textContent =
        "Thank you For Booking the Service We will get back to you soon!";

    bookingMessage.style.color = "#198754";


    bookingForm.reset();



    cart = [];


    updateCart();

}

newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document
        .getElementById("newsletterName")
        .value
        .trim();

    const email = document
        .getElementById("newsletterEmail")
        .value
        .trim();


    if (name === "" || email === "") {

        newsletterMessage.textContent =
            "Please fill all the fields.";

        return;
    }


    const newsletterData = {

        subscriber_name: name,

        subscriber_email: email

    };

    emailjs.send(
        "service_4dxiz6b",
        "template_9msr0ac",
        newsletterData
    )

    .then(function (response) {

        console.log(
            "Newsletter email sent!",
            response.status,
            response.text
        );

        newsletterMessage.textContent =
            "Thank you for subscribing to our newsletter!";

        newsletterForm.reset();

    })

    .catch(function (error) {

        console.error(
            "Newsletter email error:",
            error
        );

        newsletterMessage.textContent =
            "Something went wrong. Please try again.";

    });

});