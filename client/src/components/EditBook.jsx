import React,{ useState } from 'react'
import { gql, useMutation, useSubscription } from "@apollo/client";

const EDIT_BOOK = gql`
  mutation EditBook($id: ID, $title: String, $author: String) {
    editBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
` 
const EDIT_BOOK_SUBSCRIPTION = gql`
subscription {
  subscribeBook {
    id
    title
    author
  }
}
`

export default function EditBook(props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const {id} = props

  const [editBook] = useMutation(EDIT_BOOK)

  useSubscription(
    EDIT_BOOK_SUBSCRIPTION,
    { onSubscriptionData: ({subscriptionData}) => {
      const editData = subscriptionData.data.subscribeEditBook
      console.log(editData)
    }}
  )

  const onSubmit = e => {
    e.preventDefault();
    editBook({ 
      variables: { id, title, author } 
    });
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input 
            onChange = {({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input 
            onChange = {({target}) => setAuthor(target.value)}
          />
        </div>
        <button type="submit">編集</button>
      </form>
    </div>
  )
}