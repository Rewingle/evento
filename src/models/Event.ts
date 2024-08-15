export interface IEvent {
    name: string
    type: string
    id: string
    test: boolean
    url: string
    locale: string
    images: Image[]
    sales: Sales
    dates: Dates
    classifications: Classification[]
    _links: Links
    _embedded: Embedded
  }
  
  export interface Image {
    ratio: string
    url: string
    width: number
    height: number
    fallback: boolean
  }
  
  export interface Sales {
    public: Public
  }
  
  export interface Public {
    startDateTime: string
    startTBD: boolean
    startTBA: boolean
    endDateTime: string
  }
  
  export interface Dates {
    start: Start
    timezone: string
    status: Status
    spanMultipleDays: boolean
  }
  
  export interface Start {
    localDate: string
    localTime: string
    dateTime: string
    dateTBD: boolean
    dateTBA: boolean
    timeTBA: boolean
    noSpecificTime: boolean
  }
  
  export interface Status {
    code: string
  }
  
  export interface Classification {
    primary: boolean
    segment: Segment
    genre: Genre
    subGenre: SubGenre
    family: boolean
  }
  
  export interface Segment {
    id: string
    name: string
  }
  
  export interface Genre {
    id: string
    name: string
  }
  
  export interface SubGenre {
    id: string
    name: string
  }
  
  export interface Links {
    self: Self
    attractions: Attraction[]
    venues: Venue[]
  }
  
  export interface Self {
    href: string
  }
  
  export interface Attraction {
    href: string
  }
  
  export interface Venue {
    href: string
  }
  
  export interface Embedded {
    venues: Venue2[]
    attractions: Attraction2[]
  }
  
  export interface Venue2 {
    name: string
    type: string
    id: string
    test: boolean
    url: string
    locale: string
    timezone: string
    city: City
    country: Country
    address: Address
    location: Location
    markets: Market[]
    dmas: Dma[]
    upcomingEvents: UpcomingEvents
    _links: Links2
  }
  
  export interface City {
    name: string
  }
  
  export interface Country {
    name: string
    countryCode: string
  }
  
  export interface Address {
    line1: string
  }
  
  export interface Location {
    longitude: string
    latitude: string
  }
  
  export interface Market {
    name: string
    id: string
  }
  
  export interface Dma {
    id: number
  }
  
  export interface UpcomingEvents {
    "wts-tr": number
    _total: number
    _filtered: number
  }
  
  export interface Links2 {
    self: Self2
  }
  
  export interface Self2 {
    href: string
  }
  
  export interface Attraction2 {
    name: string
    type: string
    id: string
    test: boolean
    locale: string
    images: Image2[]
    classifications: Classification2[]
    upcomingEvents: UpcomingEvents2
    _links: Links3
  }
  
  export interface Image2 {
    ratio: string
    url: string
    width: number
    height: number
    fallback: boolean
  }
  
  export interface Classification2 {
    primary: boolean
    segment: Segment2
    genre: Genre2
    subGenre: SubGenre2
    family: boolean
  }
  
  export interface Segment2 {
    id: string
    name: string
  }
  
  export interface Genre2 {
    id: string
    name: string
  }
  
  export interface SubGenre2 {
    id: string
    name: string
  }
  
  export interface UpcomingEvents2 {
    "wts-tr": number
    _total: number
    _filtered: number
  }
  
  export interface Links3 {
    self: Self3
  }
  
  export interface Self3 {
    href: string
  }
  