import './styles.css'
import { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api'

function Register() {
    const [form, setForm] = useState({ name: '', email: '', stack: [], gender: '', info: '',  age: '18' })
    const [error, setError] = useState(false)
    const [backMessage, setBackMessage] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = e => {
        const key = e.target.name
        const value = e.target.value

        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    const handleClick = e => {
        const key = e.target.name
        const value = e.target.value

        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    const handleStack = e => {
        const localStack = [...form.stack]

        const hasStack = localStack.includes(e.target.value)
        console.log(hasStack)
        const index = localStack.indexOf(e.target.value)

        if(hasStack) localStack.splice(index, 1)
        if(!hasStack) localStack.push(e.target.value)

        setForm({ ...form, [e.target.name]: localStack })
        console.log(form.stack)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!form.name || !form.email || !form.info) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        }

        try {
            const response = await api.post('/form', {
                name: form.name, 
                email: form.email,
                stack: form.stack,
                gender: form.gender,
                info: form.info,
                age: form.age
            })
            setMessage(response.data)
            setBackMessage(true)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.log(error.response.data)
            setMessage(error.response.data)
            setBackMessage(true)
            setTimeout(() => {
                setBackMessage(false)
                window.location.reload()
            }, 3000)
        }

    }

    return (
        <div className="form-container">
            <Form className='register__form'>
                <img src="https://saltsystems.com.br/logo_salt.png" alt="logo SaltSystems" className='mb-4' />

                <Form.Group className='mb-4 size'>
                    <FloatingLabel  label='Nome'>
                        <Form.Control
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            id="name"
                            placeholder="Nome"
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className='mb-4 size'>
                    <FloatingLabel className='input__title' htmlFor="email" label='Email'>
                        <Form.Control
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="email@email.com"
                        />
                    </FloatingLabel>
                </Form.Group>

                <h1 className='title__form'>stack</h1>
                <Form.Group className="mb-4 size">
                    <div className="check__container">
                        <Form.Check
                            name='stack'
                            value='Javascript'
                            type="checkbox"
                            label="Javascript"
                            onClick={handleStack}
                        />
                        <Form.Check
                            name='stack'
                            value='Node'
                            type="checkbox"
                            label="Node"
                            onClick={handleStack}
                        />
                        <Form.Check
                            name='stack'
                            value='React'
                            type="checkbox"
                            label="React"
                            onClick={handleStack}
                        />
                        <Form.Check
                            name='stack'
                            value='SQL'
                            type="checkbox"
                            label="SQL"
                            onClick={handleStack}
                        />
                    </div>
                </Form.Group>

                <h1 className='title__form'>Gênero</h1>
                <Form.Group className="mb-4 size" >
                    <div className="check__container">
                        <Form.Check
                            name='gender'
                            value='Masculino'
                            type="radio"
                            label="Masculino"
                            onChange={handleClick}
                        />
                        <Form.Check
                            name='gender'
                            value='Feminino'
                            type="radio"
                            label="Feminino"
                            onChange={handleClick}
                        />
                        <Form.Check
                            name='gender'
                            value='Outro'
                            type="radio"
                            label="Outro"
                            onChange={handleClick}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 size">
                    <FloatingLabel  label='Informações adicionais'>
                        <Form.Control
                            name='info'
                            value={form.info}
                            as="textarea"
                            style={{ height: '100px' }}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Form.Group>

                <>
                    <h1 className='title__form'>Idade: {form.age === '65' ? '65+' : form.age}</h1>
                    <Form.Range
                        className='mb-3'
                        name='age'
                        min='18'
                        max='65'
                        value={form.age}
                        onChange={handleChange}
                    />
                </>

                <Button className='size'
                    onClick={handleSubmit}
                >
                    Cadastrar
                </Button>

                {error && <span className='error'>Todos os campos são obrigatórios</span>}
                {backMessage && <span className={error ? 'error' : 'sucess'}>{message}</span>}
            </Form>

        </div>
    )
}

export default Register