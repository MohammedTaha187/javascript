let allData = [];


function gatData(query, product) {
    if (!query && !product) {
       
        document.querySelector('#myData').innerHTML = '';
        return;
    }

    let myHttp = new XMLHttpRequest();
    myHttp.open('GET', `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`);
    myHttp.open('GET', `https://forkify-api.herokuapp.com/api/v2/recipes?search=salad`);
    myHttp.open('GET', `https://forkify-api.herokuapp.com/api/v2/recipes?search=pasta`);
    myHttp.send();

    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4 && myHttp.status == 200) {
            let data = JSON.parse(myHttp.response);
            allData = data.data.recipes;
            display(query); 
        }
    });
}


function display(query) {
    let cartone = ``;
 
    const filteredData = allData.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));

    for (let i = 0; i < filteredData.length; i++) {
        cartone += `<div class="col-md-4">
            <img src="${filteredData[i].image_url}" class="w-100" alt="${filteredData[i].title}">
            <h3>${filteredData[i].title}</h3>
        </div>`;
    }
    document.querySelector('#myData').innerHTML = cartone;
}


document.getElementById('saershInpot').addEventListener('input', function () {
    const searchQuery = document.getElementById('saershInpot').value;
    const selectedProduct = document.getElementById('productSelect').value;

   
    if (searchQuery.trim() !== '' && selectedProduct !== '') {
        gatData(searchQuery, selectedProduct);
    } else {
        document.querySelector('#myData').innerHTML = ''; 
    }
});

document.getElementById('productSelect').addEventListener('change', function () {
    const selectedProduct = document.getElementById('productSelect').value;
    const searchQuery = document.getElementById('saershInpot').value;

   
    if (searchQuery.trim() !== '' && selectedProduct !== '') {
        gatData(searchQuery, selectedProduct);
    } else {
        document.querySelector('#myData').innerHTML = ''; 
    }
});
