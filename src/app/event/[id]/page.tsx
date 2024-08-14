import React from 'react'

type Props = {}

function EventDetails({params}: {params: {id: string}}) {

    

  return (
    <div>
        EVENT ID {params.id}
    </div>
  )
}

export default EventDetails