import React,{useState} from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const ADD_BOOK = gql`
  mutation AddBook($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`

export default function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const [addBook] = useMutation(ADD_BOOK);

  const onSubmit = e => {
    e.preventDefault()
    addBook({ 
      variables: { title, author } 
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
        <button type="submit">追加</button>
      </form>
    </div>
  );
};