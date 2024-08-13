import React from 'react'

type Props = {}

function Categories({ params }: { params: { categoryName: string } }) {
  return (
    <div className='flex justify-center items-center'>
        <h1>{params.categoryName.toUpperCase()}</h1>
    </div>
  )
}
export default Categories