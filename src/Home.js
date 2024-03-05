import Navbar from "./Navbar";
import Carousel from 'react-elastic-carousel';
import Cart from './components/cart'
import './css/home.css'
import axios from "axios";

import {useState, useEffect, useRef} from 'react'
import PdfViewer from "./components/PdfViewer";
import ProgressCart from "./components/progressCart";

function Home() {
    const [allBooks, setAllBooks] = useState([])
    const [rentedBooks, setRentedBooks] = useState([])
    const [purchasedBooks, setPurchasedBooks] = useState([])

    
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
  
    const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    // const items = [{
    //     id : 1,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // },
    // {
    //     id : 2,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // },
    // {
    //     id : 3,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // },
    // {
    //     id : 4,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // },
    // {
    //     id : 5,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // },
    // {
    //     id : 6,
    //     book_name: "Harry Potter",
    //     author_name: "Rasika",
    //     ratings: 4,
    //     img : "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=600"
    // }]

    const breakPoints = [
        { width: 1200, itemsToShow: 4 },
      ];

    const handleInitialState = (result) => {
        // console.log(result.data.res.rented);
        // console.log(result.data.res.bought);
        setRentedBooks(result.data.res.rented);
        setPurchasedBooks(result.data.res.bought);
    }

      useEffect(() => {
        const token = localStorage.getItem("token")
        const user_id = localStorage.getItem("id")
        axios.get("http://localhost:8000/books", {headers: {'Authorization': `Bearer ${token}`}}).then(result=> setAllBooks(result.data.res))
        //axios.get(`http://localhost:8000/transactions/user_transactions/${user_id}`).then(result=> handleInitialState(result))
      }, [])
      

    return (
        <div className="home">
            <Navbar scrollToSection2={() => scrollToSection(section2Ref)}
            scrollToSection3={() => scrollToSection(section3Ref)}/>

            <div className="home-wrapper">
                <div className="all-books">
                    <h3>All Books</h3>
                    <Carousel breakPoints={breakPoints}>
                        {allBooks.map(item => <Cart key={item.id} id={item.book_id} bookName={item.book_name} rating={item.ratings} author={item.author_name} img={item.img}></Cart>)}
                    </Carousel>
                </div>

                <div className="rented-books" ref={section2Ref}>
                    <h3>Rented Books</h3>
                    <Carousel breakPoints={breakPoints}>
                        {rentedBooks.map(item => <Cart key={item.id} id={item.book_id} bookName={item.book_name} rating={item.ratings} author={item.author_name} img={item.img}></Cart>)}
                        <ProgressCart />
                    </Carousel>
                </div>

                <div className="purchased-books" ref={section3Ref}>
                    <h3>Purchased Books</h3>
                    <Carousel breakPoints={breakPoints}>
                        {purchasedBooks.map(item => <Cart key={item.id} id={item.book_id} bookName={item.book_name} rating={item.ratings} author={item.author_name} img={item.img}></Cart>)}
                    </Carousel>
                </div>
            </div>

            {/* <PdfViewer/> */}

        </div>
    )
}

export default Home;