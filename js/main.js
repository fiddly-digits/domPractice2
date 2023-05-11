let productsArray = [];
let productName = "";
let productAvailability = "";
let productDescription = "";
let searchedText = "";

const makeProductObjects = () => {
  let productNameElement = document.querySelector("input[name=product-name");

  productNameElement.addEventListener("keyup", (event) => {
    productName = event.target.value;
  });

  console.log(productName);

  let productDescriptionElement = document.querySelector(
    "input[name=product-description]"
  );

  productDescriptionElement.addEventListener("keyup", (event) => {
    productDescription = event.target.value;
  });

  let productAvailabilityElement = document.querySelector(
    "input[name=product-availability]"
  );
  productAvailability = productAvailabilityElement.checked;

  return { productName, productDescription, productAvailability };
};

const appendProductToList = (name, elementClassType, whereToAppend) => {
  let ul = document.querySelector(whereToAppend);
  let li = document.createElement("li");
  li.classList.add("list-group-item", elementClassType);
  let liText = document.createTextNode(name);
  li.appendChild(liText);
  ul.appendChild(li);
};

const cleanInputs = (inputsToClean) => {
  let inputs = document.querySelectorAll(inputsToClean);
  inputs.forEach((input) => {
    input.value = "";
    input.checked = true;
  });
};

const AddItemsToList = (array) => {
  let finalItemIndex = array.length - 1;
  array[finalItemIndex].productAvailability === true
    ? appendProductToList(
        array[finalItemIndex].productName,
        "list-group-item-primary",
        ".list-group"
      )
    : appendProductToList(
        array[finalItemIndex].productName,
        "list-group-item-danger",
        ".list-group"
      );
};

let submitButton = document.getElementById("AddProductButton");

makeProductObjects();

submitButton.addEventListener("click", (event) => {
  productObject = makeProductObjects();
  productsArray.push(productObject);
  console.log(productsArray);
  AddItemsToList(productsArray);
  cleanInputs(
    "input[name=product-name], input[name=product-description], input[name=product-availability]"
  );
});

let searchElement = document.querySelector("input[name=search");
searchElement.addEventListener("keyup", (event) => {
  searchedText = event.target.value;
});

let searchButton = document.getElementById("searchButton");

const cleanUL = () => {
  let ul = document.querySelector(".search-results");
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }
};

searchButton.addEventListener("click", (event) => {
  cleanUL();
  productsArray
    .filter((item) =>
      item.productName.toLowerCase().includes(searchedText.toLowerCase())
    )
    .forEach((item) =>
      item.productAvailability === true
        ? appendProductToList(
            item.productName,
            "list-group-item-primary",
            ".search-results"
          )
        : appendProductToList(
            item.productName,
            "list-group-item-danger",
            ".search-results"
          )
    );
  cleanInputs("input[name=search]");
});
