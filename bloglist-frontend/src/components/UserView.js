import React from 'react'
import { useState, useEffect } from 'react'
import userService from '../services/users'

const UserView =  (props) => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getUsers()
      setUserList(users)
    }
    getUsers()
  }, [])

  const BlogList = () => {
    if(userList.length) {
      const userD = userList.find(n => n.id === props.user)
      console.log(props.id)
      const blogs = userD.blogs.map(n => <li key={n._id}> {n.title} </li>)
      return(
        <div>
          <h1>{userD.name}</h1>
          <h2>Added blogs</h2>
          <ul>{blogs}</ul>
        </div>
      )
    }
    else return null
  }
  return (
    <div>
      <BlogList/>
    </div>
  )
}

export default UserView