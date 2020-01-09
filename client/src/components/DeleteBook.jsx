import React from 'react'
import { gql, useMutation } from "@apollo/client";

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