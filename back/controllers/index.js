const User = require('../users')
const fs = require('fs/promises')

const postForm = async (req, res) =>{
    const { 
        name,
        email,
        stack,
        gender,
        info,
        age
    } = req.body

    if(!name || !email) return res.status(400).json('🔴 Os campos NOME e EMAIL são obrigatórios!')
    
    const newUser = new User({
        name,
        email,
        stack,
        gender,
        info,
        age
    })

    const fileJSON = await fs.readFile('users.json')
    const userJSON = JSON.parse(fileJSON)

    
    userJSON.push(newUser)

    const usersJSON = JSON.stringify(userJSON)
    await fs.writeFile('users.json', usersJSON) 


    const save = await newUser.save()
    return res.json('Usuario cadastrado com sucesso ✅')
}

module.exports = { postForm }