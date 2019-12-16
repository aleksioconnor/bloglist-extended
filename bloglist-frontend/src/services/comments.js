import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (newObject, id) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const getAll = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

export default { getAll, create }