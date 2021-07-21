import React, { useState } from 'react';

// Components
import Chat from './components/Chat';
import MyName from './components/MyName';

function App() {
  const [hasMyName, setHasMyName] = useState(localStorage.getItem('myName') || false)
  return hasMyName ? <Chat /> : <MyName setHasMyName={setHasMyName} />
}

export default App;
