const express= require('express');
const cors=require("cors");
const app = express();
const HOST=5000;
 
 
app.use(cors());
 
let appartment=[
{ city: 'Bakı', address: 'Məmməd Araz küçəsi, 33', price: 980 },
  { city: 'Sumqayıt', address: 'Cavad Xan küçəsi, 88', price: 750 },
  { city: 'Gəncə', address: 'Nizami Ganjavi prospekti, 21', price: 1100 },
  { city: 'Bakı', address: 'Məhəmməd Hadi küçəsi, 15', price: 1150 },
  { city: 'Sumqayıt', address: 'Səid Hüseynov küçəsi, 42', price: 820 },
  { city: 'Gəncə', address: 'Heydər Cavad küçəsi, 77', price: 900 },
  { city: 'Sumqayıt', address: 'Xurşidbanu Natəvan küçəsi, 56', price: 990 },
  { city: 'Bakı', address: 'Nəriman Nərimanov prospekti, 27', price: 1050 },
  { city: 'Bakı', address: 'Fətəli Xan Xoyski prospekti, 64', price: 1250 },
  { city: 'Gəncə', address: 'Bəxtiyar Vahabzadə küçəsi, 38', price: 870 },
  { city: 'Sumqayıt', address: 'Rəşid Behbudov prospekti, 19', price: 780 },
  { city: 'Bakı', address: 'Leyla Məcnun küçəsi, 81', price: 970 },
  { city: 'Gəncə', address: 'Cəlil Məmmədquluzadə küçəsi, 53', price: 920 },
  { city: 'Bakı', address: 'Vəliyev Qurban küçəsi, 29', price: 1020 },
  { city: 'Sumqayıt', address: 'Emin Həbibbəyli küçəsi, 67', price: 850 },
  { city: 'Ağstafa', address: 'Həsən Aliyev küçəsi, 22', price: 850 },
  { city: 'Ağstafa', address: 'Elçin Əhmədov küçəsi, 5', price: 900 },
  { city: 'Ağstafa', address: 'Nigar Rafiq qızı küçəsi, 17', price: 780 }
]
 
app.get('/flats', (req, res)=>{
    let query = req.query;
    if(query.city === "Butun"){
    res.json(appartment);
    }else{
    let newArr =appartment.filter((item)=>item.city.startsWith(query.city));
    res.json(newArr);
    }
})
 
app.listen(HOST,()=>{
    console.log(HOST + ' works');
})