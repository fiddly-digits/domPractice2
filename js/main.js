let productsArray = [];
let searchedText = "";

const makeProductObjects = () => {
  let productObject = {};
  let productNameElement = document.querySelector("input[name=product-name");
  let productDescriptionElement = document.querySelector(
    "input[name=product-description]"
  );
  let productAvailabilityElement = document.querySelector(
    "input[name=product-availability]"
  );
  productObject.name = productNameElement.value;
  productObject.description = productDescriptionElement.value;
  productObject.availability = productAvailabilityElement.checked;
  return productObject;
};

const createListElements = (name, elementClassType, whereToAppend) => {
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

const appendListElements = (array) => {
  let finalItemIndex = array.length - 1;
  array[finalItemIndex].availability === true
    ? createListElements(
        array[finalItemIndex].name,
        "list-group-item-primary",
        ".list-group"
      )
    : createListElements(
        array[finalItemIndex].name,
        "list-group-item-danger",
        ".list-group"
      );
};

let submitButton = document.getElementById("add-product");

submitButton.addEventListener("click", (event) => {
  productObject = makeProductObjects();
  productsArray.push(productObject);
  appendListElements(productsArray);
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
      item.name.toLowerCase().includes(searchedText.toLowerCase())
    )
    .forEach((item) =>
      item.availability === true
        ? createListElements(
            item.name,
            "list-group-item-primary",
            ".search-results"
          )
        : createListElements(
            item.name,
            "list-group-item-danger",
            ".search-results"
          )
    );
  cleanInputs("input[name=search]");
});
