import './App.css'
import HomePage from './components/HomePage'
import BookShelf from './components/BookShelf';
import { Route,Routes } from 'react-router-dom';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bookshelf' element={<BookShelf />} />
      </Routes>
    </>
  )
}

export default App
