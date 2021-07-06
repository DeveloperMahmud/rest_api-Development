const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid');



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
app.get('/api/products',(req, res) => {
    res.json(products);
});

//show a specific products
app.get('/api/products/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find(prod => prod.id === id);

    if(!product){
        return res.status(404).json({
            error: 'No Products Found With this ID'
        })
    }
    
    return res.json(product);
})

//insert a product

app.use(express.json());

app.post('/api/products', (req, res) => {
    const product = {
        id : uuidv4(),
        name : req.body.name,
        price : req.body.price
    }

    products.push(product);

    return res.json(product);
})

//update a specific product(PUT)

//update a specific product(PATCH)

//Delete a specific product

//Delete all products


app.listen(3000, () => console.log('Server is running at port 3000'));