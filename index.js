const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid');
const Joi = require('joi');



app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello Nice World..</h1>')
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
    
    return res.status(200).json(product);
})

//insert a product

app.use(express.json());

app.post('/api/products', (req, res) => {

    const {error} = validation(req.body);
    
    if(error){
       return res.status(400).json({
            message : error.details[0].message
        });
    };

    const product = {
        id : uuidv4(),
        name : req.body.name,
        price : req.body.price
    }

    products.push(product);

    return res.status(201).json(product);
})

//update a specific product(PUT)

app.put('/api/products/:id', (req, res) => {

    const {error} = validation(req.body);
    
    if(error){
       return res.status(400).json({
            message : error.details[0].message
        });
    };

    const index = products.findIndex(prod => prod.id === req.params.id);

    if(index === -1){
        return res.status(404).json({
            message: 'product is not found with this ID'
        });
    };
    
    products[index].name = req.body.name;
    products[index].price = req.body.price;

    return res.status(200).json({
        product : products[index] 
    });
});

//update a specific product(PATCH)

app.patch('/api/products/:id', (req, res) => {

    //VALIDATION

    const {error} = validationForPatch(req.body);
    
    if(error){
       return res.status(400).json({
            message : error.details[0].message
        });
    };

    const index = products.findIndex(prod => prod.id === req.params.id);

    if(index === -1){
        return res.status(404).json({
            message: 'product is not found with this ID'
        });
    };

    let updatedProduct = {
        ...products[index],
        ...req.body
    };
    products[index] = updatedProduct;

    return res.status(200).json(updatedProduct);
});

//Delete a specific product

app.delete('/api/products/:id', (req, res) => {

    const product = products.find(prod => prod.id === req.params.id);

    if(!product){
        return res.status(404).json({
            message: 'product is not found with this ID'
        });
    };

    const index = products.findIndex( prod => prod.id === req.params.id);

    products.splice(index, 1);

    res.status(200).json(product);

});    

//Delete all products

app.delete('/api/products', (req, res) => {

    products.splice(0);
    return res.status(200).json(products);

});


//FUNCTIONS

function validation (body){
    const schema = Joi.object ({
        name: Joi.string().min(3).max(20).required(),
        price: Joi.number().required()
    });

    return schema.validate(body);
}

function validationForPatch (body){
    const schema = Joi.object ({
        name: Joi.string().min(3).max(20),
        price: Joi.number()
    });

    return schema.validate(body);
}

app.listen(3000, () => console.log('Server is running at port 3000'));