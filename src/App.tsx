import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../src/utchat'


const App = () => {
  const [user] = useAuthState(auth)

  return (
    <div>
      {user ? <Chat/> : <SignIn/>}
    </div>
  );
}

export default App;
