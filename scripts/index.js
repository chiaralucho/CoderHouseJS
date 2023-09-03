//Variables
let program = 1,
  navigation = 0;
let option = 0,
  productTotal = 0;
productSelected = 0;
(precioTotal = 0), (QTYSelected = 0);
let aux = 1;

//Object Products
function Product(id, nombre, precio, stock, QTY) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
  this.QTY = QTY;
}

//Products
const panCiabatta = new Product(1, "Pan ciabatta", 2000, 4, 0);
const panHamburguesa = new Product(2, "Pan para hamburguesa x4", 2500, 10, 0);
const panCampo = new Product(3, "Pan de campo", 3000, 6, 0);
const panArabe = new Product(4, "Pan arabe x2", 2500, 2, 0);

const Products = [panCiabatta, panHamburguesa, panCampo, panArabe];

///////------------------------------Functions----------------------------------///////

function showProducts(products, showStock) {
  for (const product of products) {
    showStock(
      `${product.id}- ${product.nombre} $${product.precio} --Stock: ${product.stock}`
    );
  }
}

function addProduct() {
  let precio = 0,
    stock = 0,
    id = 0;
  let nombre = prompt("Ingrese el nombre del producto");
  do {
    if (isNaN(precio) || !(precio >= 0 && precio < 3)) {
      invalidNumber();
    }
    precio = parseInt(prompt("Ingrese el precio (solo números)"));
  } while (isNaN(precio));
  do {
    if (isNaN(stock) || !(stock >= 0 && stock < 3)) {
      invalidNumber();
    }
    stock = parseInt(prompt("Ingrese el stock disponible)"));
  } while (isNaN(stock));
  id = Products.reduce((acc, el) => el.id, 0) + 1;
  let newProduct = new Product(id, nombre, precio, stock, 0);
  Products.push(newProduct);
}

function invalidNumber() {
  alert("Por favor, ingrese un número válido");
}

function invoice(precioTotal, productTotal) {
  console.log(
    "-----------FACTURA------------\n\n\n Producto    Precio      Cantidad"
  );
  Products.forEach((element) => {
    if (element.QTY > 0) {
      console.log(`${element.nombre}    ${element.precio}      ${element.QTY}`);
    }
  });
  console.log(`Productos añadidos: ${productTotal}\n\n TOTAL: $${precioTotal}`);
}

function editProduct() {
  let productSelected = 1,
    editOption = 0,
    editScreen = 1;
  alert("Abra la consola Para ver los productos");
  do {
    showProducts(Products, console.log);
    productSelected = 1;
    do {
      if (
        isNaN(productSelected) ||
        !(productSelected > 0 && productSelected < Products.length)
      ) {
        invalidNumber();
      }
      productSelected = parseInt(prompt("¿Que producto desea editar?"));
    } while (
      isNaN(productSelected) ||
      !(productSelected > 0 && productSelected < Products.length)
    );
    //Buscar el producto por ID
    productSelected = Products.find((el) => el.id === productSelected);
    do {
      if (isNaN(editOption) || !(editOption >= 0 && editOption < 4)) {
        invalidNumber();
      }
      editOption = parseInt(
        prompt(
          "Ingrese un numero:\n\n 1- Editar nombre\n\n 2- Editar precio\n\n 3- Editar Stock\n\n\n Para ir hacia atras ingrese 0"
        )
      );
    } while (isNaN(editOption) || !(editOption >= 0 && editOption < 4));

    switch (editOption) {
      case 0:
        editScreen = 0;
        break;
      //Cambio de nombre
      case 1:
        productSelected.nombre = prompt(
          `Nombre actual: ${productSelected.nombre}\n\n Ingrese el nombre nuevo\n\n`
        );
        alert("Nombre editado correctamente");
        break;
      //Cambio de precio
      case 2:
        do {
          if (isNaN(productSelected.precio)) {
            invalidNumber();
          }
          productSelected.precio = parseInt(
            prompt(
              `Precio actual ${productSelected.precio}\n\n Ingrese el precio nuevo\n\n`
            )
          );
        } while (isNaN(productSelected.precio));
        alert("Precio editado correctamente");
        break;
      //editar Stock
      case 3:
        do {
          if (isNaN(productSelected.stock)) {
            invalidNumber();
          }
          productSelected.stock = parseInt(
            prompt(
              `Stock actual ${productSelected.stock}\n\n Ingrese el stock total del producto\n\n`
            )
          );
        } while (isNaN(productSelected.stock));
        alert("Stock editado correctamente");
        break;
    }
  } while (editScreen != 0);
}

function payment(productSelected, precioTotal) {
  switch (productSelected) {
    case 1:
      let pagoTerminado = 0,
        option = 0,
        ingreso = 0;
      do {
        ingreso = parseInt(prompt("Ingrese el importe aquí\n\n"));
        if (!isNaN(ingreso)) {
          if (ingreso >= precioTotal) {
            alert(
              ` Compra realizada correctamente, su vuelto es de $${
                ingreso - precioTotal
              }`
            );
            do {
              if (isNaN(option) || !(option >= 0 && option < 2)) {
                invalidNumber();
              }
              option = parseInt(
                prompt(
                  "Para seguir comprando, ingrese 1\n\n Para salir del programa, ingrese 0\n\n"
                )
              );
            } while (isNaN(option) || !(option >= 0 && option < 2));
            if (option == 0) {
              program = 0;
            }
            aux = 0;
            navigation = 0;
            precioTotal = 0;
            productTotal = 0;
            pagoTerminado = 1;
          } else {
            alert(
              `Saldo insuficiente, le faltan $${
                precioTotal - ingreso
              } por favor, intente de nuevo`
            );
          }
        } else {
          invalidNumber();
        }
      } while (!pagoTerminado || isNaN(ingreso));
      break;
    case 0:
      aux = 0;
      break;
    default:
      invalidNumber();
  }
}

////---------------------Loop---------------------//////
while (program) {
  navigation = parseInt(
    prompt(
      " ingrese:\n\n 1- Para comprar\n\n 2- Si eres administrador\n\n\n Para salir del programa ingrese 0\n\n"
    )
  );
  if (!isNaN(navigation) && navigation >= 0 && navigation < 3) {
    aux = 1;
    //Sección compra
    if (navigation == 1) {
      alert("Abra la consola para ver los productos");
      showProducts(Products, console.log);
      while (aux) {
        productSelected = parseInt(
          prompt(
            "Ingrese el número del producto que desea agregar al carrito\n\n\n Para finalizar la compra ingrese 0"
          )
        );
        if (
          !isNaN(productSelected) &&
          productSelected >= 0 &&
          productSelected <= Products.length
        ) {
          if (productSelected != 0) {
            productSelected = Products.find((el) => el.id === productSelected);
            QTYSelected = parseInt(prompt(" Ingrese la cantidad deseada\n\n"));

            if (QTYSelected <= productSelected.stock) {
              productSelected.QTY += QTYSelected;
              productSelected.stock -= QTYSelected;
              alert("Añadido al carrito correctamente");
            } else {
              alert(
                "No hay stock suficiente, por favor agregue otro producto 🙂"
              );
            }
          } else {
            aux = 0;
          }
        } else {
          invalidNumber();
        }
      }

      Products.forEach((product) => {
        precioTotal = precioTotal + product.precio * product.QTY;
      });

      alert(`El total de su compra es de $${precioTotal}`);

      do {
        if (
          isNaN(productSelected) ||
          !(productSelected >= 0 && productSelected < 2)
        ) {
          invalidNumber();
        }
        productSelected = parseInt(
          prompt(
            ` Para pagar ingrese 1\n\n Para cancelar la compra y volver al home ingrese 0\n\n`
          )
        );
      } while (
        isNaN(productSelected) ||
        !(productSelected >= 0 && productSelected < 2)
      );
      payment(productSelected, precioTotal);
      //Sección admins
    } else if (navigation == 2) {
      while (aux) {
        do {
          if (isNaN(option) || !(option >= 0 && option < 4)) {
            invalidNumber();
          }
          option = parseInt(
            prompt(
              " Para editar un producto ingrese 1\n\n Para agregar un producto ingrese 2\n\n Para ver todos los productos ingrese 3\n\n\n Para volver al home ingrese 0\n\n"
            )
          );
        } while (isNaN(option) || !(option >= 0 && option < 4));
        if (option == 1) {
          editProduct();
        } else if (option == 2) {
          addProduct();
        } else if (option == 3) {
          alert("Abra la consola para ver los productos");
          console.log("--------PRODUCTOS---------");
          showProducts(Products, console.log);
        } else {
          aux = 0;
        }
      }
    } else {
      program = 0;
    } //Finaliza el loop
  } else {
    invalidNumber();
  }
}
