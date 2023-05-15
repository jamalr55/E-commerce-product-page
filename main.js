// Funtion to toggle the nav menu at mobile
(function toggleNav() {
  // Creating the variables
  const navMenu = document.querySelector('.menu');
  const navBox = document.querySelector('.nav-links');
  const closeNav = document.querySelector('#nav-close-btn');
  const navOverlay = document.querySelector('.overlay-nav');

  navMenu.addEventListener('click', (event) => {
    navBox.classList.add('show-nav');
    navOverlay.classList.add('show-overlay');
  });

  closeNav.addEventListener('click', (event) => {
    navBox.classList.remove('show-nav');
    navOverlay.classList.remove('show-overlay');
  });
})();

// Function to toggle the cart modal
(function toggleCart() {
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.querySelector('.cart-modal');

  cartIcon.addEventListener('click', (event) => {
    cartModal.classList.toggle('show-card-modal');
    if (cartModal.classList.contains('show-cart-modal')) {
      cartIcon.setAttribute('fill', '#1D2025');
    } else {
      cartIcon.setAttribute('fill', '#69707D');
    }
  });
})();

// Function for showing the Product Slideshow at mobile size
(function productSlideshow() {
  const prevBtn = document.querySelectorAll('.prev');
  const nextBtn = document.querySelectorAll('.next');

  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';
  }

  prevBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      plusSlides(-1);
    });
  });
  nextBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      plusSlides(1);
    });
  });
})();

// Function for slideshow of modal product showcase
(function productSlideshowDesktop() {
  const prevBtn = document.querySelectorAll('.modal__prev');
  const nextBtn = document.querySelectorAll('.modal__next');

  const modalPdtImages = document.querySelectorAll('.pdt-img-modal');

  let slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides__desktop');

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';

    // console.log(slides[slideIndex - 1].children[0].dataset.item)

    modalPdtImages.forEach((img) => {
      img.classList.remove('active-pdt-img__modal');
      img.parentElement.classList.remove('active-pdt-img-ctn__modal');
    });
    modalPdtImages.forEach((img) => {
      if (img.dataset.key == slideIndex) {
        img.classList.add('active-pdt-img__modal');
        img.parentElement.classList.remove('active-pdt-img-ctn__modal');
      }
      img.addEventListener('click', (e) => {
        const index = e.target.dataset.key;
        showSlides(index);
      });
    });
  }

  prevBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      plusSlides(-1);
    });
  });
  nextBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      plusSlides(1);
    });
  });
})();

// Function to show and remove the Product showcase Modal
function closePdtSlideshowModal() {
  const mainPdtCtn = document.querySelector('.main-pdt-ctn');
  const closeBtn = document.querySelector('.pdt-showcase-model__close-btn-ctn');
  const modal = document.querySelector('.pdt-showcase-modal__desktop');
  const overlay = document.querySelector('.overlay-nav');

  mainPdtCtn.addEventListener('click', () => {
    modal.classList.add('show-pdt-slideshow-modal');
    overlay.classList.add('show-overlay');
  });

  closeBtn.addEventListener('click', (event) => {
    modal.classList.remove('show-pdt-slideshow-modal');
    overlay.classList.remove('show-overlay');
  });
}
closePdtSlideshowModal();

// Function to add the items to the cart and show them in the cart.
(function addProductToCart() {
  const minusBtn = document.querySelector('.minus-icon');
  const plusBtn = document.querySelector('.plus-icon');
  const pdtQuantity = document.querySelector('.pdt-quantity');
  const cartNotify = document.querySelector('.cart-notify');

  const addToCartBtn = document.querySelector('#addToCart-btn');
  const cartContentCtn = document.querySelector('.cart-content-ctn');

  let pdtCount = 0;

  function showCount() {
    pdtQuantity.textContent = pdtCount;
  }

  minusBtn.addEventListener('click', () => {
    if (pdtCount > 0) {
      pdtCount--;
      showCount();
    }
  });
  plusBtn.addEventListener('click', () => {
    pdtCount++;
    showCount();
  });

  function showCartData() {
    if (pdtCount > 0) {
      cartNotify.textContent = pdtCount;
      cartNotify.classList.add('show-cart-notification');

      const totalPrice = (((250 * 50) / 100) * pdtCount).toFixed(2);

      cartContentCtn.innerHTML = `
        <div class="pdt-info-ctn">
                        <div class="pdt-preview-ctn">
                            <img src="images/image-product-1-thumbnail.jpg" alt="product thumbnail">
                        </div>
                        <div class="cart-modal__pdt-qnty-ctn">
                            <p>Autumn Limited Edition...</p>
                            <p class="cart-modal__pdt-qnty">
                                $125.00 x
                                <span class="pdt-qnty">
                                ${pdtCount}
                                </span>
                                <span class="total-price">
                                $${totalPrice}
                                </span>
                            </p>
                        </div>
                        <div class="cart-modal__delete-icon-ctn">
                            <img class="cart-modal__delete-icon" src="images/icon-delete.svg" alt="">
                        </div>
                    </div>
                    <div class="checkout-btn-ctn">
                        <button class="checkout-btn" type="checkout">
                            Checkout
                        </button>
                    </div>
            `;
      cartContentCtn.style.alignItems = 'stretch';

      const emptyCart = document.querySelector('.cart-modal__delete-icon');
      emptyCart.addEventListener('click', () => {
        pdtCount = 0;
        showCartData(0);
        pdtQuantity.textContent = pdtCount;
      });
    } else {
      cartNotify.classList.remove('show-cart-notification');

      cartContentCtn.innerHTML = `
        <p class="empty-cart-text">
        Your Cart is empty.
        </p>
        `;
      cartContentCtn.style.alignItems = 'center';
    }
  }

  addToCartBtn.addEventListener('click', () => {
    showCartData(pdtCount);
    console.log(pdtCount);
  });
})();

// Function to update the main product image
(function changeMainProduct() {
  const mainPdtImage = document.querySelector('.main-pdt-img');
  const pdtImages = document.querySelectorAll('.pdt-img');

  // const modalPdtImages = document.querySelectorAll('.pdt-img-modal')
  // changePdtImg(modalPdtImages);

  pdtImages.forEach((img) => {
    if (img.dataset.key == 1) {
      img.parentElement.classList.add('active-img-ctn');
    }

    img.addEventListener('click', () => {
      const key = img.dataset.key;
      mainPdtImage.setAttribute('src', `images/image-product-${key}.jpg`);

      pdtImages.forEach((img) => {
        img.parentElement.classList.remove('active-img-ctn');
      });

      img.parentElement.classList.add('active-img-ctn');
    });
  });
})();

// Function to update the main product image in modal
(function changeMainProduct() {
  const mainPdtImage = document.querySelector('.main-pdt-img');
  const pdtImages = document.querySelectorAll('.pdt-img');

  // const modalPdtImages = document.querySelectorAll('.pdt-img-modal')
  // changePdtImg(modalPdtImages);

  pdtImages.forEach((img) => {
    img.addEventListener('click', () => {
      const key = img.dataset.key;
      mainPdtImage.setAttribute('src', `images/image-product-${key}.jpg`);

      pdtImages.forEach((img) => {
        img.parentElement.classList.remove('active-img-ctn');
      });

      img.parentElement.classList.add('active-img-ctn');
    });
  });
})();
