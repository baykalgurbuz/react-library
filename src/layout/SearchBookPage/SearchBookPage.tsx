import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "react-bootstrap";
import { Paginations } from "../Utils/Paginations";

export const SearchBookPage=()=>{
    const [books,setBooks]=useState<BookModel[]>([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const [booksPerPage]=useState(5);
  const [totalAmountOfBooks,setTotalAmountOfBooks]=useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const[search,setSearch]=useState('');
  const[seacrhUrl,setSeacrhUrl]=useState('');
  const[categorySelection,setCategorySelection]=useState('Book category');



  useEffect(()=>{
    const fetchBooks=async()=>{
      const baseUrl:string="http://localhost:8080/api/books";
      let url:string='';
      if (seacrhUrl === '') {
        url=`${baseUrl}?page=${currentPage-1}&size=${booksPerPage}`;
      }
      else{
        let searchWithPage=seacrhUrl.replace('<pageNumber>',`${currentPage-1}`)
        url=baseUrl+searchWithPage;
      }
      const response=await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong ! ');
      }
      const responseJson=await response.json();
      const responseData=responseJson._embedded.books;
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);
      console.log(responseJson._embedded.books);
      const loadedBooks:BookModel[]=[];
      for (const key in responseData) {
        loadedBooks.push({
          id:responseData[key].id,
          title:responseData[key].title,
          author:responseData[key].author,
          description:responseData[key].description,
          copies:responseData[key].copies,
          copiesAvailable:responseData[key].copiesAvailable,
          category:responseData[key].category,
          img:responseData[key].img,
        });
      }
      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error:any)=>{
      setIsLoading(false);
      setHttpError(error.message);
    })
    window.scrollTo(0,0)
  },[currentPage,seacrhUrl]);
  if (isLoading) {
    return(
      <SpinnerLoading/>
    )
  }
  if (httpError) {
    return(
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }
  const searchHandleChange=()=>{
    setCurrentPage(1);
    if (search==='') {
        setSeacrhUrl('')
    }
    else{
        setSeacrhUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
    }
    setCategorySelection('Book Category')
  }
  
  const categoryField =(value:string)=>{
    setCurrentPage(1);
    if (
      value.toLowerCase() === 'fe' ||
      value.toLowerCase() === 'be' ||
      value.toLowerCase() === 'data' ||
      value.toLowerCase() === 'devops' 
    ) {
      setCategorySelection(value);
      setSeacrhUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
    }else{
      setCategorySelection('All');
      setSeacrhUrl(`?page=<pageNumber>&size=${booksPerPage}`)
    }
  }


  const indexOfLastBook:number=currentPage * booksPerPage;
  const indexOfFirstBook:number=indexOfLastBook - booksPerPage;
  let lastItem=  booksPerPage * currentPage<=totalAmountOfBooks?booksPerPage * currentPage : totalAmountOfBooks;

  const pagiante=(pageNumber:number)=>setCurrentPage(pageNumber);

  return(
    <div>
        <div className="container">
            <div>
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input type="search" className="form-control mt-2" 
                            placeholder="Seacrh" aria-labelledby="Search"
                            onChange={e=>setSearch(e.target.value)}
                           />
                            <button className="btn btn-outline-success"  onClick={()=>searchHandleChange()}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {categorySelection}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li onClick={()=>categoryField('All')}>
                                    <a href="#" className="dropdown-item">
                                        All
                                    </a>
                                </li>
                                <li onClick={()=>categoryField('FE')}> 
                                    <a href="#" className="dropdown-item">
                                        Front End
                                    </a>
                                </li>
                                <li onClick={()=>categoryField('BE')}>
                                    <a href="#" className="dropdown-item">
                                        Back End
                                    </a>
                                </li>
                                <li onClick={()=>categoryField('Data')}>
                                    <a href="#" className="dropdown-item">
                                        Data
                                    </a>
                                </li>
                                <li onClick={()=>categoryField('Devops')}>
                                    <a href="#" className="dropdown-item">
                                        Devops
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {totalAmountOfBooks>0 ?
                <>
                <div className="mt-3">
                    <h5>Number of Result:({totalAmountOfBooks})</h5>
                </div>
                <p>
                    {indexOfFirstBook+1} to {lastItem} of {totalAmountOfBooks} items:
                </p>
                {books.map(book=>(
                    <SearchBook book={book} key={book.id}/>
                ))}
                </>
                :
                <div className="m-5">
                    <h3>
                        Cant find what are u looking for ?
                    </h3>
                    <a href="#" type="button" className="btn main-color btn-md me-md-2 fw-bold text-white">Library Service</a>
                </div>
                }
                
                {
                    totalPages > 1 &&
                    <Paginations currentPage={currentPage} totalPages={totalPages} paginate={pagiante}  />
                }
            </div>
        </div>
    </div>
  )
}