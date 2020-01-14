import React,{ useState, useEffect } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";

import DeleteBook from './DeleteBook'
import EditBook from './EditBook'

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

export default function Books(){
  const [booksData, setBooksData] = useState([])

  const { loading, error, data } = useQuery(BOOKS_QUERY);

  useSubscription(
    BOOKS_SUBSCRIPTION,
    { onSubscriptionData: ({subscriptionData}) => {
      const addData = subscriptionData.data.subscribeBook
      setBooksData([...booksData, addData])
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

  return booksData.map(({ id, title, author }, index) => (
    <div key={id}>
      <h3>book:{index + 1}</h3>
      <div>title:{title} <br/>author:{author}</div>
      <DeleteBook id={id}/>
      <EditBook id={id}/>
    </div>
  ));
};
