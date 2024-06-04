import { useState, useEffect } from "react"

const BookCard = ({uid,title,edition_count}:{
    uid:string,
    title:string,
    edition_count:number
}) => {

    const [inBookshelf, setInBookshelf] = useState(false);

    useEffect(() => {
        const localStorageBookshelf = JSON.parse(localStorage.getItem("bookshelf") as string) || [];
        setInBookshelf(localStorageBookshelf.some((book:any) => book.uid === uid));

        // Cleanup function to prevent memory leaks
        return () => {
        console.log("BookCard component unmounted");
        };
    }, [uid])

    const handleAddToBookshelf = () => {
        const localStorageBookshelf = JSON.parse(localStorage.getItem("bookshelf") as string) || [];
        localStorageBookshelf.push({ uid, title, edition_count });
        localStorage.setItem("bookshelf", JSON.stringify(localStorageBookshelf));
        setInBookshelf(true);
    };

    return (
        <div className="flex flex-col h-auto w-[20vw] p-4 m-2 border rounded-md" >
            <div className="flex"><span className="font-bold">Book Title:</span> {title}</div>
            <div className="flex mb-4"><span className="font-bold">Edition Count:</span> {edition_count}</div>
            {(!inBookshelf) && <button className="p-2 rounded-md bg-green-600 text-white" onClick={handleAddToBookshelf}>Add to Bookshelf</button>}
        </div>
    )
}

export default BookCard