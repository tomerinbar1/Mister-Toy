import { useState } from 'react'
import { TextField, Button } from '@mui/material'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="login-page">
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </div>
  )
}
