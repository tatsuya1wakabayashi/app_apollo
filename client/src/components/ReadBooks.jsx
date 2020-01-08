import React,{useState, useEffect} from "react";
import { gql } from "apollo-boost";
import { useQuery, useSubscription } from "@apollo/react-hooks";

import DeleteBook from './DeleteBook'
import EditBook from './EditBook'


export default function Books(){
  const [booksData, setBooksData] = useState([])

  const BOOKS_QUERY = gql`
    {
      books {
        id
        title
        author
      }
    }
  `;

  // const booksQuery2 = gql`
  //   {
  //     book(title: "Harry Potter") {
  //       title
  //       author
  //     }
  //   }
  // `;

  const BOOKS_SUBSCRIPTION = gql`
    subscription {
      subscribeBook {
        id
        title
        author
      }
    }
  `

  const { loading, error, data } = useQuery(BOOKS_QUERY);

  useSubscription(
    BOOKS_SUBSCRIPTION,
    { onSubscriptionData: ({subscriptionData}) => {
      const addData = subscriptionData.data.subscribeBook
      setBooksData([...booksData, addData])

      // const result = newBooksData.find(element.id === subscriptionData.data.subscribeBook.id)
      // if(!result){
      //   newBooksData.push(subscriptionData.data.subscribeBook)
      //   setBooksData[newBooksData]
      // } else {
      //   result = 
      //   setBooksData[newBooksData]
      // }
    }}
  )
  useEffect(() => {
    if(data){
      setBooksData(data.books)
    }
  },[data])

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error</p>;
  }

  return booksData.reverse().map(({ id, title, author }, index) => (
    <div key={id}>
      {/* <h3>book{index + 1}</h3> */}
      <div>title:{title} <br/>author:{author}</div>
      <DeleteBook id={id}/>
      <EditBook id={id}/>
    </div>
  ));
};
