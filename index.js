let product = document.querySelector(".product");
let fetchData = [];
let api = "https://fakestoreapi.com/products ";
fetch(api).then((request) => {
    return request.json();
}).then((res) => {
   fetchData = res
    Display(fetchData)
    console.log(fetchData);
}).catch((err) => {
    console.log(err);
})

let searchEl = document.getElementById("search");
let searchInp = document.getElementById("search-fun");
let search_btn = document.getElementById("search-btn");
// search_btn.addEventListener("click",()=>{
//     let searchpara = searchInp.value;
//      let filtered = fetchData.filter((element,index)=>{
//         if(element.category.toUpperCase().includes(searchpara.toUpperCase())==true){
//             return true
//         }else{
//             return false
//         }
//      })
//      Display(filtered);
// })
// search_btn.addEventListener("click", () => {
//     let searchParams = searchInp.value;
//     let filtered = fetchData.filter((ele, i) => {
//       if (
//         ele.category.toUpperCase().includes(searchParams.toUpperCase()) === true
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//     Display(filtered);
//   });

let cart = JSON.parse(localStorage.getItem("cart"))||[];
function Display(data) {

    product.innerHTML = "";
    data.forEach((element, index) => {
    
        let div = document.createElement("div");
        div.setAttribute("class","mycard")
        let img = document.createElement("img");
        img.src = element.image;
        let category = document.createElement("h3");
        category.innerText = element.category
        let price = document.createElement("h3");
        price.innerText = `₹${element.price}`
        let title = document.createElement("h2");
        title.innerText = element.title
        let add_to_cart = document.createElement("button");
            add_to_cart.innerText = "Add to cart"
          add_to_cart.addEventListener("click",()=>{
            if(checkDuplicate(element)){
                alert("product is already added");
            }else{
                cart.push({...element,quantity:1});
              localStorage.setItem("cart",JSON.stringify(cart));
              alert("product added to cart")
            }
          })


        product.append(div)
        div.append(img, title,category,price,add_to_cart);
    })
}
function checkDuplicate(product){
       for(let i=0; i<cart.length; i++){
        if(cart[i].id === product.id){
            return true;
        }
       }return false;
}