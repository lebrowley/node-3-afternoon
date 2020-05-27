module.exports = {
    create: (req, res, next) => {                               //why is next an argument?? 
        const dbInstance = req.app.get('db')
        const {name, description, price, image_url} = req.body //these have to be in the same order as what is in the create_product.sql right? that way the line up with the $1, $2, $3, $4 placeholders? 

        dbInstance.create_product([name, description, price, image_url])  //hold up- what is this doing? why is it an array? why are we passing them in as arguments?
        .then( () => res.sendStatus(200))    //when do you have to send something and when don't you have to send something?
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'})
            console.log(err)
        })
    },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params

        dbInstance.read_product(id)
        .then( product => res.status(200).send(product))
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'})
            console.log(err)
        })  
    },

    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.read_products()
        .then( products => res.status(200).send(products))
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'})
            console.log(err)
        })
    },

    update: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {params, query} = req

        dbInstance.update_product([params.id, query.desc])   //why is description abbreviated?
        .then( () => res.sendStatus(200))
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'})
            console.log(err)
        })
    },

    delete: (req, res, next) => {
        const dbInstance = req.app.get('db') 
        const {id} = req.params

        dbInstance.delete_product(id)
        .then( () => res.sendStatus(200))
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'})
        })
    }
};