"use client"
import React from 'react'
import Image from 'next/image'
type Props = {
    imageUrl: string
}

function CardImage(props: Props) {
  return (
    <Image /* onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "https://storage.googleapis.com/eventogether-general/fff%26text%3DUnavailable.png";
    }} */ alt="event-img" width={208} objectFit='cover' height={156} src={props.imageUrl} />
  )
}

export default CardImage