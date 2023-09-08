//Variables
let program = 1,
  navigation = 0,
  option = 0,
  productTotal = 0,
  productSelected = 0,
  precioTotal = 0,
  QTYSelected = 0,
  aux = 1;

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

const panMolde = new Product(3, "Pan de molde", 3000, 10, 0);
const rapiditas = new Product(4, "Rapiditas", 2000, 5, 0);
const pionono = new Product(5, "Pionono", 1500, 6, 0);
const prepizza = new Product(6, "Mini-Prepizza", 1000, 5, 0);

const Products = [
  panCiabatta,
  panHamburguesa,
  panMolde,
  rapiditas,
  pionono,
  prepizza,
];

const btnCompra = document.getElementsByClassName("btn-compra");
const QTYselector = document.getElementsByClassName("QTYselector");
const btnMas = document.getElementsByClassName("btnMas");
const btnMenos = document.getElementsByClassName("btnMenos");
const QTYnumber = document.getElementsByClassName("QTYnumber");
const btnPedido = document.querySelector(".btn_pedido");
const containerPago = document.querySelector(".container_pago");

function handleCompraClick(i) {
  btnCompra[i].style.display = "none";
  QTYselector[i].style.display = "flex";

  function handleMasClick() {
    QTYnumber[i].innerHTML = `${
      (parseInt(QTYnumber[i].textContent) + 1).toString()
    }`;
  }

  function handleMenosClick() {
    if (parseInt(QTYnumber[i].textContent) === 1) {
      btnCompra[i].style.display = "flex";
      QTYselector[i].style.display = "none";

      btnMas[i].removeEventListener("click", handleMasClick);
      btnMenos[i].removeEventListener("click", handleMenosClick);
    } else {
      QTYnumber[i].innerHTML = `${
        (parseInt(QTYnumber[i].textContent) - 1).toString()
      }`;
    }
  }

  btnMas[i].addEventListener("click", handleMasClick);
  btnMenos[i].addEventListener("click", handleMenosClick);
}

for (let i = 0; i < btnCompra.length; i++) {
  btnCompra[i].addEventListener("click", function () {
    handleCompraClick(i);
  });
}

btnPedido.addEventListener("click", ()=>{
  
  containerPago.style.display = "block";
});