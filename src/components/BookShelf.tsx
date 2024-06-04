import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const BookShelf = () => {

    const localStorageBookshelf = JSON.parse(localStorage.getItem("bookshelf") as string) || [];
    const [books, setBooks] = useState(localStorageBookshelf);

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleRemove = (uid:string) => {
        const newBookshelf = books.filter((book:any) => book.uid !== uid);
        setBooks(newBookshelf);
        localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
    }

  return (
    <>
        <h1 className="w-fit text-xl mx-auto font-bold">My Bookshelf</h1>
        <button className="bg-green-600 p-2 rounded-md absolute right-2 top-2 text-white" onClick={handleNavigate}>Home</button>
        <div className='p-4 flex flex-wrap justify-center'>
            {books.map((book:any) => (
                <div key={book.uid} className="flex flex-col h-auto md:w-[20vw] w-[70vw] p-4 m-2 border rounded-md">
                    <div className="flex"><span className="font-bold">Book Title:</span> {book.title}</div>
                    <div className="flex mb-4"><span className="font-bold">Edition Count:</span> {book.edition_count}</div>
                    <button className='w-full bg-red-400 rounded-md p-1 text-white' onClick={()=>{handleRemove(book.uid)}}>Remove</button>
                </div>
            ))}
        </div>
    </>
  )
}

export default BookShelf