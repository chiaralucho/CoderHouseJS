let productsArray = [],
  cart = [];
let btnCompra,
  QTYselector,
  btnMas,
  btnMenos,
  QTYnumber,
  priceProduct,
  btnPedido,
  totalNumber,
  containerPago;

//Object Products
function ObjectProducts(id, title, precio, stock) {
  this.id = id;
  this.title = title;
  this.precio = precio;
  this.stock = stock;
}

function updateProducts() {
  fetch("../products.json")
    .then((response) => response.json())
    .then((data) => {
      const productsContainer = document.querySelector(".container-products");
      data.forEach((product) => {
        if (product.stock > 0) {
          productsArray.push(
            new ObjectProducts(
              product.id,
              product.title,
              product.price,
              product.stock
            )
          );
          const t_product = document.createElement("div");
          t_product.className =
            "d-flex flex-column col-10 col-sm-8 col-md-7 col-lg-2 col-xxl-4 t_product p-0 mx-3";
          t_product.innerHTML = `
            <img
            class="col-12 product_photo"
            src="${product.img}"
            alt="${product.title}"
          />
          <div
            class="col d-flex flex-column align-items-center justify-content-between content_product px-1 px-sm-3 py-4"
          >
            <h2 class="mb-2">${product.title}</h2>
            <div class="col-12">
              <div
                class="d-flex col-12 align-items-center justify-content-center mb-2" 
              >
                
                <h3 class="mb-0 ms-2 price_symbol">$<span class="price_product" data-productid="${product.id}">${product.price}</span></h3>
              </div>
              <div class="col-12 d-flex justify-content-center">
                <div
                  class="QTYselector flex-row justify-content-center align-items-center mt-2"
                >
                  <button
                    class="btn btnMas d-flex justify-content-center align-items-center"
                  >
                    +
                  </button>
                  <h3 class="mx-3 QTYnumber my-0">1</h3>
                  <button
                    class="btn btnMenos d-flex justify-content-center align-items-center"
                  >
                    -
                  </button>
                </div>
                <button class="btn-compra col-auto col-xxl-11" data-productid="${product.id}">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
            `;
          productsContainer.appendChild(t_product);
        }
      });
    })

    .catch((error) => {
      const productsContainer = document.querySelector(".container-products");
      productsContainer.innerHTML =
        "No fue posible cargar los productos, por favor intentelo más tarde. " +
        error;
    });
}

function addToCart(productID, productTitle, productPrice, productQTY, action) {
  cart = JSON.parse(localStorage.getItem("cart"));
  const productIndex = cart.findIndex((item) => item.id === productID);
  if (action == "add") {
    if (productIndex !== -1) {
      cart[productIndex].QTY = productQTY;
    } else {
      const addProduct = {
        id: productID,
        title: productTitle,
        price: productPrice,
        QTY: productQTY,
      };
      cart.push(addProduct);
    }
  } else {
    cart.splice(productIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function disableScroll() {
  TopScroll = document.documentElement.scrollTop;
  (LeftScroll = document.documentElement.scrollLeft),
    (window.onscroll = function () {
      window.scrollTo(LeftScroll, TopScroll);
    });
}

containerPago = document.querySelector(".container_pago");
function showTicket() {
  const liProducts = document.getElementById("liProducts"),
    totalCart = document.getElementById("totalCart"),
    buyBtn = document.getElementById("buyBtn"),
    QTYnumber = document.getElementsByClassName("QTYnumber"),
    QTYselector = document.getElementsByClassName("QTYselector"),
    btnCompra = document.getElementsByClassName("btn-compra");
  let totalBuy = 0;
  cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.style = "font-size: 18px;";
    productItem.innerHTML = `${product.title} <strong>Price: </strong>$${
      product.price
    } <strong>Units: </strong>${product.QTY} --> <strong>Total: </strong>$${
      product.price * product.QTY
    }`;
    liProducts.appendChild(productItem);
    totalBuy += product.price * product.QTY;
    productsArray[product.id].stock -= product.QTY;
  });
  totalCart.innerHTML = `${totalBuy}`;
  buyBtn.addEventListener("click", () => {
    cart.splice(0, cart.length);
    enableScroll();
    for (let i = 0; i < btnCompra.length; i++) {
      btnCompra[i].style.display = "flex";
      QTYselector[i].style.display = "none";
      QTYnumber[i].innerHTML = "1";
    }
    containerPago.style.display = "none";
    localStorage.setItem("cart", JSON.stringify(cart));
    toastr.success("purchase made successfully");
    location.reload();
  });
}

function enableScroll() {
  window.onscroll = function () {};
}

function handleCompraClick(i, productID) {
  btnCompra[i].style.display = "none";
  QTYselector[i].style.display = "flex";

  if (parseInt(QTYnumber[i].textContent) > productsArray[productID].stock) {
    toastr.error("There is no sufficent stock");
  } else {
    totalNumber.innerHTML = `${(
      parseInt(totalNumber.textContent) + productsArray[productID].precio
    ).toString()}`;
    addToCart(
      productsArray[productID].id,
      productsArray[productID].title,
      parseInt(totalNumber.textContent),
      parseInt(QTYnumber[i].textContent),
      "add"
    );
  }

  function handleMasClick() {
    if (parseInt(QTYnumber[i].textContent) > productsArray[productID].stock) {
      toastr.error("There is no sufficent stock");
    } else {
      QTYnumber[i].innerHTML = `${(
        parseInt(QTYnumber[i].textContent) + 1
      ).toString()}`;
      totalNumber.innerHTML = `${(
        parseInt(totalNumber.textContent) + productsArray[productID].precio
      ).toString()}`;
      addToCart(
        productsArray[productID].id,
        productsArray[productID].title,
        parseInt(totalNumber.textContent),
        parseInt(QTYnumber[i].textContent),
        "add"
      );
    }
  }

  function handleMenosClick() {
    if (parseInt(QTYnumber[i].textContent) === 1) {
      btnCompra[i].style.display = "flex";
      QTYselector[i].style.display = "none";
      totalNumber.innerHTML = `${(
        parseInt(totalNumber.textContent) - productsArray[productID].precio
      ).toString()}`;
      addToCart(
        productsArray[productID].id,
        productsArray[productID].title,
        parseInt(totalNumber.textContent),
        parseInt(QTYnumber[i].textContent),
        "remove"
      );
      btnMas[i].removeEventListener("click", handleMasClick);
      btnMenos[i].removeEventListener("click", handleMenosClick);
    } else {
      QTYnumber[i].innerHTML = `${(
        parseInt(QTYnumber[i].textContent) - 1
      ).toString()}`;

      totalNumber.innerHTML = `${(
        parseInt(totalNumber.textContent) - productsArray[productID].precio
      ).toString()}`;
      addToCart(
        productsArray[productID].id,
        productsArray[productID].title,
        parseInt(totalNumber.textContent),
        parseInt(QTYnumber[i].textContent),
        "add"
      );
    }
  }

  btnMas[i].addEventListener("click", handleMasClick);
  btnMenos[i].addEventListener("click", handleMenosClick);
}

updateProducts();
localStorage.setItem("cart", JSON.stringify(cart));

setTimeout(() => {
  //Tiempo de espera de carga
    btnCompra = document.getElementsByClassName("btn-compra"),
    QTYselector = document.getElementsByClassName("QTYselector"),
    btnMas = document.getElementsByClassName("btnMas"),
    btnMenos = document.getElementsByClassName("btnMenos"),
    QTYnumber = document.getElementsByClassName("QTYnumber"),
    priceProduct = document.getElementsByClassName("price_product"),
    btnPedido = document.querySelector(".btn_pedido"),
    totalNumber = document.querySelector(".totalNumber"),
    containerPago = document.querySelector(".container_pago");

  for (let i = 0; i < priceProduct.length; i++) {
    let priceProductID = parseInt(
      priceProduct[i].getAttribute("data-productid")
    );
    priceProduct[i].textContent =
      productsArray[priceProductID].precio.toString();
  }

  for (let i = 0; i < btnCompra.length; i++) {
    btnCompra[i].addEventListener("click", function () {
      let productID = parseInt(btnCompra[i].getAttribute("data-productid"));
      handleCompraClick(i, productID);
    });
  }

  btnPedido.addEventListener("click", () => {
    containerPago.style.display = "Flex";
    disableScroll();
    showTicket();
  });
}, 2000);
