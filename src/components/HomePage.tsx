import { useState } from 'react'
import BookCard from './BookCard'
import { useNavigate } from 'react-router-dom'

function HomePage() {

  const [name, setName] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchBooks(name)
      console.log('Enter key pressed')
    }
  }

  const fetchBooks = async (query: string) => {
    try {
      setLoading(true)
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
      const data = await response.json()
      const booksArr = data.docs.map((book: any) => {
        return {
          key: book.key,
          title: book.title,
          edition_count: book.edition_count
        }
      });
      setBooks(booksArr)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/bookshelf')
    }

  return (
    <>
      <div className='w-fit mx-auto'>
        <h1 className='text-xl font-bold mb-2'>Search by book name:</h1>
        <input type='text' className='border border-gray-400 p-1 w-full rounded-md' onChange={handleChange} onKeyDown={handleKeyDown} value={name}/>
      </div>
      <button className='p-2 rounded-md bg-green-600 text-white absolute right-2 top-2' onClick={handleNavigate}>Bookshelf</button>
      <div className='flex flex-wrap p-2 justify-center'>
        {loading ? <div className='w-fit mx-auto my-2 text-lg font-bold'>Loading...</div> : (books.length > 0 && (books.map((book: any) => (
          <BookCard key={book.key} uid={book.key} title={book.title} edition_count={book.edition_count} />
        ))))}
      </div>
    </>
  )
}

export default HomePage
