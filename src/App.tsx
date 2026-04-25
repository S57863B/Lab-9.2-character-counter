import { useState } from 'react'
import { CharacterCounter } from './components/CharacterCounter/CharacterCounter'

function App() {

  return (
    <>
      <div className='main-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
        <CharacterCounter minWords={25} maxWords={100}/>
      </div>
    </>
  )
}

export default App
