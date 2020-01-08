import React from 'react'
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID) {
    deleteBook(id: $id) {
      id
    }
  }
` 

export default function DeleteBook(props) {
  const [deleteBook] = useMutation(DELETE_BOOK)
  const {id} = props

  console.log(id) 

  const del = e => {
    e.preventDefault()
    deleteBook({ 
      variables: { id } 
    });
  }
  return (
    <button onClick={del}>
      削除
    </button>
  )
}