const radioButtons = document.querySelectorAll('input[type="radio"]');
const choose = document.querySelector('#choose');
const list = document.querySelector('#list');


radioButtons.forEach((item)=>{
    item.addEventListener('click',(event)=>{
        getFilteredList(item.value)
    })
})
 
const getFilteredList = async(city) =>{
        let response = await fetch(`http://localhost:5000/flats?city=${city}`);
        let data= await response.json();
        console.log(data);
        list.innerHTML = '';
        data.forEach(element => {
            let li=document.createElement('li');
 
            li.innerHTML = `<p>${element.city}</p>  <p>adress: ${element.address}</p> <p>price: ${element.price}₼</p>`
            list.appendChild(li);
 
        });
 
}
 
 
fetch("http://localhost:5000/flats")
.then((res)=>{
    console.log(res);
    return res.json();
})
.then((data)=>console.log(data))