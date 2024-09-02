"use client"
import { Button } from '@/components/ui/button'
import { Earth } from 'lucide-react';
import { University } from 'lucide-react';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSpring, animated } from '@react-spring/web'
import React, { useCallback } from 'react'
import { getCitiesService, getCountriesService } from '@/services/location';
import { Input } from '@/components/ui/input';
import { getSearchEventsByLocation } from '@/services/eventService';
import { IEvent } from '@/models/Event';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

type Props = {}
interface City {
    name: string
    lat: string
    lng: string
}
interface Country {
    name: string
    iso2: string
}


function CreateGroup({ }: Props) {

   

    return (
        <div className='relative'>
      
        </div>
    )
}

export default CreateGroup