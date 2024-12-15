const allfood = document.getElementById("allfood");
const srcsec = document.getElementById("srcfood");
const nodata = document.getElementById("nodata");
const detaili = document.getElementById("detail");
const total_count = document.getElementById("tcount");
const liiteam = document.getElementById("liiteam");
const crtcnt=document.getElementById("crtcount")
const modalbdy=document.getElementById("modalbdy")


let cart=[]
let count=0

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
  .then((res) => res.json())
  .then((data) => {
    mealFrnt(data.meals);
  });

const mealFrnt = (x) => {
  allfood.innerHTML = "";
  srcsec.innerHTML = "";
  detaili.innerHTML = "";

  x.forEach((data) => {
    allfood.innerHTML += `
   
        <div class="col-md-4 mb-4">
                   <div class="card" style="width: 18rem;">
                       <img src=${
                         data.strMealThumb
                       } class="card-img-top" alt="...">
                       <div class="card-body">
                           <h5 class="card-title">${data.strMeal}</h5>
                           <p class="card-text">${data.strInstructions.slice(
                             0,
                             100
                           )}</p>
                           <a href="#" class="btn btn-primary" 
                           data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onclick="detailfunc('${data.idMeal}')"
                             >Details
                             </a>

                             <a href="#" class="ms-3 btn btn-primary"
                               onclick="addcart('${data.strMeal}','${data.idMeal}')" >Add to Cart
                             </a>
                       </div>
                   </div>
               </div>

   `;
  });
};

const searchfunc = (e) => {
  e.preventDefault();

  const hdesec = document.getElementById("hid");
  hdesec.innerHTML = "";

  const inputval = document.getElementById("val").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputval}`)
    .then((res) => res.json())
    .then((data) => {
      searchres(data);
    });
};

const searchres = (e) => {
  if (e.meals == null) {
    allfood.innerHTML = "";
    srcsec.innerHTML = "";
    detaili.innerHTML = "";

    srcsec.innerHTML += ` <h1 class="fw-bold text-center text-danger">No Food find !</h1>
        `;
  } else {
    allfood.innerHTML = "";
    srcsec.innerHTML = "";
    detaili.innerHTML = "";
    const dta = e.meals;

    dta.forEach((data) => {
      srcsec.innerHTML += `
            <div class="col-md-4 mb-4">
                       <div class="card" style="width: 18rem;">
                           <img src=${
                             data.strMealThumb
                           } class="card-img-top" alt="...">
                           <div class="card-body">
                               <h5 class="card-title">${data.strMeal}</h5>
                               <p class="card-text">${data.strInstructions.slice(
                                 0,
                                 100
                               )}</p>
                               <a href="#" class="btn btn-primary " 
                               onclick="detailfunc('${data.idMeal}')"
                               data-bs-toggle="modal" data-bs-target="#exampleModal"
                               >Details</a>


                                 <a href="#" class="ms-3 btn btn-primary"
                                  onclick="addcart('${data.strMeal}','${data.idMeal}')" >Add to Cart
                                 </a>
                           </div>
                       </div>
                   </div>
    
       `;
    });
  }
};

const detailfunc = (d) => {

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d}`)
    .then((res) => res.json())
    .then((data) => {
      const {strMeal,strCategory,strArea,strInstructions,
        strMealThumb,strTags,strIngredient1,strIngredient2,
        
        strIngredient3,strIngredient4} = data.meals[0]

        modalbdy.innerHTML=""
    
        modalbdy.innerHTML += `

         <div class="card mb-5 mx-auto" style="width: 700px; height: 500px;">
  <div class="row g-0 h-100">
 

    <div class="col-md-5">
      <img src=${strMealThumb} class="img-fluid rounded-start h-100" style="object-fit: cover;">
    </div>
    
    <div class="col-md-7">
      <div class="card-body d-flex flex-column justify-content-center">
        <h1 class="card-title fw-bold"> ${strMeal}</h1>
        <p class="card-text fs-5 text-secondary m-3">

      <strong>  Instraction :: </strong>  ${strInstructions.slice(0,200)}
        
          
        </p>
        <p class="card-text fs-6 text-muted">
          <strong>Category: </strong>   ${strCategory}
        </p>
        
        <p> <strong>Area : </strong> ${strArea}  </p>
        <p> <strong>Tags : </strong> ${strTags} </p>
        <p>  <strong> Ingredient:  </strong> 
        ${strIngredient1} ,
        ${strIngredient2} ,
        ${strIngredient3} ,
        ${strIngredient4} ,
         </p>
        
      </div>
    </div>
  </div>
</div>

       

        `
      
    });
};


const addcart=( strMeal,idMeal)=>{
   
   
    let alreadyext=cart.find(item => item.idMeal === idMeal);

    if (alreadyext) {
        alert(" already added ");
        return
      }
      

   if (count>=11){
    alert(`You can't add more than 11 iteams.`)
  

        return
   }
  

   else{
    count++
    cart.push({strMeal,idMeal})
    crtcnt.innerText=count 

    liiteam.innerHTML+=
                  `                   
                     <li class="list-group-item">${strMeal}</li>

                  `

   }


}


const clearCart=()=>{
  liiteam.innerHTML=""
  crtcnt.innerText="0"
  cart=[]
  count=0

}

