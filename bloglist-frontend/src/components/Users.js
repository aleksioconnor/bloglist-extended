import React from 'react'
import { useState, useEffect } from 'react'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const Users =  () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getUsers()
      const asd = users.map(b => {
        return { name: b.name, username: b.username, blogs: b.blogs.length, id: b.id }
      })
      setUserList(asd)
    }
    getUsers()
  }, [])

  const userListElement = userList.map((user,i) => {
    return (
      <tr key={i}><td><Link to={`/user/${user.id}`}>{ user.name }</Link></td><td>{ user.blogs }</td></tr>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {userListElement}
        </tbody>
      </table>
    </div>
  )
}

export default Users