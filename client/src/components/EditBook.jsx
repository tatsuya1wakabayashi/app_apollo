import React,{useState} from 'react'
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const EDIT_BOOK = gql`
  mutation EditBook($id: ID, $title: String, $author: String) {
    editBook(id: $id, title: $title, author: $author) {
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