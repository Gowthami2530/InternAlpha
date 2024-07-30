
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart');
    const cartBox = document.getElementById('cart-box');
    const userForm = document.querySelector('.userform');
    const menuIcon = document.getElementById('menu');
    const navBar = document.querySelector('.nav-bar');
    const searchBox = document.querySelector('.search-box');

    const updateCartTotal = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.price');
            if (priceElement) {
                const price = parseFloat(priceElement.innerText.replace('₹', ''));
                total += price;
            }
        });
        document.getElementById('cart-total').innerText = total.toFixed(2);
    };

    const saveCartToLocalStorage = () => {
        const cartItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            const productImage = item.querySelector('img').src;
            const productName = item.querySelector('h3').innerText;
            const productPrice = item.querySelector('.price').innerText;
            const productSize = item.querySelector('.size').innerText;
            cartItems.push({ productImage, productName, productPrice, productSize });
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const loadCartFromLocalStorage = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.productImage}" alt="${item.productName}">
                <div class="cart-matter">
                    <h3>${item.productName}</h3>
                    <div class="price">${item.productPrice}</div>
                    <div class="size">${item.productSize}</div>
                </div>
                <span class="remove-item"><i class="fas fa-trash remove-item"></i></span>
            `;
            document.querySelector('.cart-items').appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item').forEach(removeButton => {
            removeButton.addEventListener('click', removeCartItem);
        });

        updateCartTotal();
    };

    const hideAllSections = () => {
        cartBox.style.display = 'none';
        userForm.classList.remove('show');
        searchBox.style.display = 'none';
        if (window.innerWidth <= 991) {
            navBar.style.display = 'none';
        }
    };

    const toggleNavBar = () => {
        if (navBar.style.display === 'flex' || navBar.style.display === 'block') {
            navBar.style.display = 'none';
        } else {
            navBar.style.display = 'flex';
        }
    };

    const handleMenuClick = () => {
        toggleNavBar();
    };

    const handleScreenSizeChange = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 320 && screenWidth <= 991) {
            if (menuIcon) {
                menuIcon.addEventListener('click', handleMenuClick);
            }
        } else {
            if (menuIcon) {
                menuIcon.removeEventListener('click', handleMenuClick);
                navBar.style.display = ''; // Reset display property for larger screens
            }
        }
        if (screenWidth > 991) {
            navBar.style.display = 'flex';
        } else {
            navBar.style.display = 'none';
        }
    };

    window.addEventListener('resize', handleScreenSizeChange);
    handleScreenSizeChange(); // Initial check

    hideAllSections(); // Ensure nav-bar is hidden initially

    document.querySelectorAll('.nav-bar a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                navBar.style.display = 'none';
            }
        });
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartBox.style.display === 'block') {
                cartBox.style.display = 'none';
            } else {
                hideAllSections();
                cartBox.style.display = 'block';
                updateCartTotal();
            }
        });
    }

    const userIcon = document.getElementById('user');
    if (userIcon) {
        userIcon.addEventListener('click', () => {
            if (userForm.classList.contains('show')) {
                userForm.classList.remove('show');
            } else {
                hideAllSections();
                userForm.classList.add('show');
            }
        });
    }

    const searchInput = searchBox ? searchBox.querySelector('input[type="search"]') : null;
    const searchIcon = document.getElementById('search');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            if (searchBox.style.display === 'block') {
                searchBox.style.display = 'none';
            } else {
                hideAllSections();
                searchBox.style.display = 'block';
                searchInput.focus();
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.trim().toLowerCase();
                const productCards = document.querySelectorAll('.box');
                let productFound = false;

                productCards.forEach(card => {
                    const productName = card.querySelector('.cardtext h2').innerText.trim().toLowerCase();
                    if (productName === searchTerm) {
                        productFound = true;
                        card.scrollIntoView({ behavior: 'smooth' });
                        // Add any additional code to highlight the found product if necessary
                    }
                });

                if (!productFound) {
                    alert('Product not found');
                }
            }
        });
    }

    const addToCartButtons = document.querySelectorAll('#cart1');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.box');
            const productImage = productCard.querySelector('img').src;
            const productName = productCard.querySelector('.cardtext h2').innerText;
            const productPrice = productCard.querySelector('.price span').innerText;
            const productSize = productCard.querySelector('.size select').value; // Assuming size is selected from a dropdown

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <div class="cart-matter">
                    <h3>${productName}</h3>
                    <div class="price">${productPrice}</div>
                    <div class="size">Size: ${productSize}</div>
                </div>
                <span class="remove-item"><i class="fas fa-trash remove-item"></i></span>
            `;

            document.querySelector('.cart-items').appendChild(cartItem);
            updateCartTotal();
            saveCartToLocalStorage();

            cartItem.querySelector('.remove-item').addEventListener('click', removeCartItem);
        });
    });

    const removeCartItem = (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (cartItem) {
            cartItem.remove();
            updateCartTotal();
            saveCartToLocalStorage();
        }
    };

    loadCartFromLocalStorage();

    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
        },
    });
});


