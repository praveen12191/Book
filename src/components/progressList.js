import axios from "axios";
import { useEffect, useState } from "react";

const ProgressList = () => {
    //const user = [{
    //    user_id: "65e6e84e27c9a8b05a9fe94c",
    //    book_id: "65e7038a26669de0ffed87f6"
    //  },{
    //    user_id: "65e6e84e27c9a8b05a9fe94c",
    //    book_id: "65e7038a26669de0ffed87f6"
    //  },{
    //    user_id: "65e6e84e27c9a8b05a9fe94c",
    //    book_id: "65e7038a26669de0ffed87f6"
    //  },{
    //    user_id: "65e6e84e27c9a8b05a9fe94c",
    //    book_id: "65e7038a26669de0ffed87f6"
    //  }]
    const [rented,setrent] = useState([])
    const [bought,setbought] = useState([])
    useEffect(()=>
    {
        let userId = "65e6e84e27c9a8b05a9fe94c"
        axios.get(`http://localhost:8000/transactions/user_transactions/${userId}`).then(result => 
        {
        result.data.res.bought.length ? setbought([...result.data.res.bought]) : setbought([])
        result.data.res.rented.length ? setrent([...result.data.res.rented]): setrent([])
            
        })

    },[])
    console.log(rented,bought);

    return ( 
        <div>
            hello
        </div>
     );
}
 
export default ProgressList;