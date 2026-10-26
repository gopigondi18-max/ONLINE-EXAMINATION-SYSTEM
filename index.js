import { liteClient } from "algoliasearch/lite";

const searchClient = liteClient(
    "MOZARA7WCG",
    "70e1758c91ffb5e4613cbf69de997ea6"
);

let resultsRootElement = document.querySelector(".results");

document.querySelector("#searchInput").addEventListener("keyup", async () => {

    let Searchterm = document.querySelector("#searchInput").value;

    let result = await searchClient.search([
        {
            indexName: "search",
            params: {
                query: Searchterm
            }
        }
    ]);

    renderproducts(result.results[0].hits);
});

function renderproducts(products) {

    document.querySelectorAll(".result").forEach(prod => {
        prod.remove();
    });

    products.forEach(product => {
        rendersingleproduct(product);
    });
}

function rendersingleproduct(product) {

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("result");

    let resultimage = document.createElement("img");
    let resultTitle = document.createElement("h4");
    let resultprice = document.createElement("p");

    resultimage.src = product.image;
    resultTitle.innerText = product.title;
    resultprice.innerText = product.price;

    resultDiv.appendChild(resultimage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultprice);

    resultsRootElement.appendChild(resultDiv);
}