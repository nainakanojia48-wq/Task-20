var services = [
    {
        name: "Washing",
        price: 100
    },
    {
        name: "Dry Cleaning",
        price: 200
    },
    {
        name: "Ironing",
        price: 80
    },
    {
        name: "Express Laundry",
        price: 250
    },
    {
        name: "Blanket Cleaning",
        price: 300
    },
    {
        name: "Shoe Cleaning",
        price: 150
    }
];


var cart = [];

var serviceList = document.getElementById("serviceList");

var cartList = document.getElementById("cartList");

var totalAmount = document.getElementById("totalAmount");


emailjs.init("pGkMGzrLWE6Vsa8AP");


function showServices() {

    serviceList.innerHTML = "";

    for (var i = 0; i < services.length; i++) {

        var service = services[i];

        var serviceDiv = document.createElement("div");

        serviceDiv.className = "service";


        var infoDiv = document.createElement("div");

        infoDiv.className = "service-info";


        var name = document.createElement("p");

        name.textContent = service.name;


        var price = document.createElement("p");

        price.textContent = "₹" + service.price;


        infoDiv.appendChild(name);

        infoDiv.appendChild(price);


        var buttonDiv = document.createElement("div");

        buttonDiv.className = "service-buttons";


        var addButton = document.createElement("button");

        addButton.textContent = "Add items";

        addButton.className = "add";


        addButton.addEventListener("click", function () {

            addService(service);

        });


        var removeButton = document.createElement("button");

        removeButton.textContent = "Remove Now";

        removeButton.className = "remove";


        removeButton.addEventListener("click", function () {

            removeService(service);

        });


        buttonDiv.appendChild(addButton);

        buttonDiv.appendChild(removeButton);


        serviceDiv.appendChild(infoDiv);

        serviceDiv.appendChild(buttonDiv);


        serviceList.appendChild(serviceDiv);
    }
}


function addService(service) {

    cart.push(service);

    localStorage.setItem(
        "laundryCart",
        JSON.stringify(cart)
    );

    showCart();
}


function removeService(service) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].name == service.name) {

            cart.splice(i, 1);

            break;
        }
    }


    localStorage.setItem(
        "laundryCart",
        JSON.stringify(cart)
    );

    showCart();
}


function showCart() {

    cartList.innerHTML = "";

    var amount = 0;


    if (cart.length == 0) {

        var emptyMessage = document.createElement("p");

        emptyMessage.className = "empty";

        emptyMessage.textContent = "No items added yet.";

        cartList.appendChild(emptyMessage);

        totalAmount.textContent = "0";

        return;
    }


    for (var i = 0; i < cart.length; i++) {

        var item = cart[i];


        var itemDiv = document.createElement("div");

        itemDiv.className = "cart-item";


        var itemName = document.createElement("span");

        itemName.textContent = item.name;


        var itemPrice = document.createElement("span");

        itemPrice.textContent = "₹" + item.price;


        itemDiv.appendChild(itemName);

        itemDiv.appendChild(itemPrice);


        cartList.appendChild(itemDiv);


        amount = amount + item.price;
    }


    totalAmount.textContent = amount;
}


function loadCart() {

    var savedCart = localStorage.getItem("laundryCart");


    if (savedCart != null) {

        cart = JSON.parse(savedCart);

    }


    showCart();
}


document.getElementById("bookService").addEventListener(
    "click",
    function () {

        document.getElementById("services").scrollIntoView({
            behavior: "smooth"
        });

    }
);


function checkEmail(email) {

    if (email.includes("@") && email.includes(".")) {

        return true;

    }

    return false;
}


function checkPhone(phone) {

    if (phone.length == 10 && !isNaN(phone)) {

        return true;

    }

    return false;
}


document.getElementById("bookingForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        var fullName =
            document.getElementById("fullName").value.trim();


        var email =
            document.getElementById("email").value.trim();


        var phone =
            document.getElementById("phone").value.trim();


        var valid = true;


        document.getElementById("nameError").textContent = "";

        document.getElementById("emailError").textContent = "";

        document.getElementById("phoneError").textContent = "";

        document.getElementById("bookingMessage").textContent = "";


        if (fullName == "") {

            document.getElementById("nameError").textContent =
                "Please enter your name.";

            valid = false;
        }


        if (!checkEmail(email)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email.";

            valid = false;
        }


        if (!checkPhone(phone)) {

            document.getElementById("phoneError").textContent =
                "Please enter a 10 digit phone number.";

            valid = false;
        }


        if (cart.length == 0) {

            alert("Please add a service to the cart.");

            valid = false;
        }


        if (!valid) {

            return;

        }


        var serviceNames = "";


        for (var i = 0; i < cart.length; i++) {

            serviceNames =
                serviceNames +
                cart[i].name +
                " - ₹" +
                cart[i].price +
                ", ";
        }


        var bookingData = {

            customer_name: fullName,

            customer_email: email,

            customer_phone: phone,

            services: serviceNames,

            total_amount: totalAmount.textContent

        };


        var button =
            document.getElementById("bookNow");


        button.disabled = true;

        button.textContent = "Sending...";


        emailjs.send(
            "service_4dxiz6b",
            "template_1dojb28",
            bookingData
        )


        .then(function () {

            document.getElementById("bookingMessage").textContent =
                "Thank you for booking the service. We will get back to you soon!";


            document.getElementById("bookingForm").reset();


            cart = [];


            localStorage.removeItem("laundryCart");


            showCart();

        })


        .catch(function () {

            document.getElementById("bookingMessage").textContent =
                "Booking failed. Please try again.";

        })


        .finally(function () {

            button.disabled = false;

            button.textContent = "Book Now";

        });

    }
);


document.getElementById("newsletterForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        var name =
            document.getElementById("newsletterName").value.trim();


        var email =
            document.getElementById("newsletterEmail").value.trim();


        var message =
            document.getElementById("newsletterMessage");


        message.textContent = "";


        if (name == "") {

            message.textContent =
                "Please enter your name.";

            return;
        }


        if (!checkEmail(email)) {

            message.textContent =
                "Please enter a valid email.";

            return;
        }


        var newsletterData = {

            subscriber_name: name,

            subscriber_email: email

        };


        var button =
            document.querySelector("#newsletterForm button");


        button.disabled = true;

        button.textContent = "Sending...";


        emailjs.send(
            "service_4dxiz6b",
            "template_9msr0ac",
            newsletterData
        )


        .then(function () {

            message.textContent =
                "Thank you for subscribing to our newsletter!";


            document.getElementById("newsletterForm").reset();

        })


        .catch(function () {

            message.textContent =
                "Subscription failed. Please try again.";

        })


        .finally(function () {

            button.disabled = false;

            button.textContent = "Subscribe";

        });

    }
);


showServices();

loadCart();