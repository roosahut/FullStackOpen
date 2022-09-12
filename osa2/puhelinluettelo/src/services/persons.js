import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deleteId = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    deleteId: deleteId
}
