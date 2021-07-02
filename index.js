const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Nice World..</h1>')
})

const products = [
    {
        id:'1',
        name: 'Mango',
        price: 123
    },
    {
        id:'2',
        name:'Banana',
        price: 23
    }
]

//show list of products
app.get('/products',(req, res) => {
    res.json(products);
});



app.listen(3000, () => console.log('Server is running at port 3000'));