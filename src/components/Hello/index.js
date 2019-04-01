import React from 'react'

function Hello({username = 'User'}) {
  return(
    <div>
      Hello, {username}
    </div>
  )
}

export default Hello