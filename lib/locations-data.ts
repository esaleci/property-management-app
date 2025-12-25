export interface Location {
  id: string
  name: string
  type: "country" | "state" | "city" | "area" | "community"
  parent?: string
  propertyCount?: number
}

export const locations: Location[] = [
  // ============================================
  // MIDDLE EAST
  // ============================================

  // United Arab Emirates
  { id: "uae", name: "United Arab Emirates", type: "country", propertyCount: 35 },
  { id: "dubai", name: "Dubai", type: "city", parent: "United Arab Emirates", propertyCount: 18 },
  { id: "abu-dhabi", name: "Abu Dhabi", type: "city", parent: "United Arab Emirates", propertyCount: 8 },
  { id: "sharjah", name: "Sharjah", type: "city", parent: "United Arab Emirates", propertyCount: 5 },
  { id: "ajman", name: "Ajman", type: "city", parent: "United Arab Emirates", propertyCount: 4 },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah", type: "city", parent: "United Arab Emirates", propertyCount: 3 },
  { id: "fujairah", name: "Fujairah", type: "city", parent: "United Arab Emirates", propertyCount: 2 },
  { id: "umm-al-quwain", name: "Umm Al Quwain", type: "city", parent: "United Arab Emirates", propertyCount: 1 },
  // Dubai Areas
  { id: "downtown-dubai", name: "Downtown Dubai", type: "area", parent: "Dubai", propertyCount: 5 },
  { id: "dubai-marina", name: "Dubai Marina", type: "area", parent: "Dubai", propertyCount: 4 },
  { id: "palm-jumeirah", name: "Palm Jumeirah", type: "area", parent: "Dubai", propertyCount: 3 },
  { id: "business-bay", name: "Business Bay", type: "area", parent: "Dubai", propertyCount: 3 },
  { id: "dubai-hills", name: "Dubai Hills Estate", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "jumeirah", name: "Jumeirah", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "dubai-creek", name: "Dubai Creek Harbour", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "dubai-south", name: "Dubai South", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "jvc", name: "Jumeirah Village Circle (JVC)", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "jvt", name: "Jumeirah Village Triangle (JVT)", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "dubai-investment-park", name: "Dubai Investment Park (DIP)", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "arabian-ranches", name: "Arabian Ranches", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "emirates-hills", name: "Emirates Hills", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "dubai-silicon-oasis", name: "Dubai Silicon Oasis", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "al-barsha", name: "Al Barsha", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "dubai-land", name: "Dubai Land", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "al-quoz", name: "Al Quoz", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "motor-city", name: "Motor City", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "sports-city", name: "Dubai Sports City", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "discovery-gardens", name: "Discovery Gardens", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "international-city", name: "International City", type: "area", parent: "Dubai", propertyCount: 1 },
  { id: "deira", name: "Deira", type: "area", parent: "Dubai", propertyCount: 2 },
  { id: "bur-dubai", name: "Bur Dubai", type: "area", parent: "Dubai", propertyCount: 2 },
  // Abu Dhabi Areas
  { id: "al-reem-island", name: "Al Reem Island", type: "area", parent: "Abu Dhabi", propertyCount: 3 },
  { id: "yas-island", name: "Yas Island", type: "area", parent: "Abu Dhabi", propertyCount: 2 },
  { id: "saadiyat-island", name: "Saadiyat Island", type: "area", parent: "Abu Dhabi", propertyCount: 2 },
  { id: "al-raha-beach", name: "Al Raha Beach", type: "area", parent: "Abu Dhabi", propertyCount: 1 },
  { id: "corniche-area", name: "Corniche Area", type: "area", parent: "Abu Dhabi", propertyCount: 1 },
  { id: "al-khalidiyah", name: "Al Khalidiyah", type: "area", parent: "Abu Dhabi", propertyCount: 1 },
  // Sharjah Areas
  { id: "al-majaz", name: "Al Majaz", type: "area", parent: "Sharjah", propertyCount: 2 },
  { id: "al-nahda-sharjah", name: "Al Nahda", type: "area", parent: "Sharjah", propertyCount: 2 },
  { id: "al-khan", name: "Al Khan", type: "area", parent: "Sharjah", propertyCount: 1 },

  // Saudi Arabia
  { id: "saudi-arabia", name: "Saudi Arabia", type: "country", propertyCount: 25 },
  { id: "riyadh", name: "Riyadh", type: "city", parent: "Saudi Arabia", propertyCount: 10 },
  { id: "jeddah", name: "Jeddah", type: "city", parent: "Saudi Arabia", propertyCount: 8 },
  { id: "dammam", name: "Dammam", type: "city", parent: "Saudi Arabia", propertyCount: 4 },
  { id: "mecca", name: "Mecca", type: "city", parent: "Saudi Arabia", propertyCount: 3 },
  { id: "medina", name: "Medina", type: "city", parent: "Saudi Arabia", propertyCount: 2 },
  { id: "khobar", name: "Al Khobar", type: "city", parent: "Saudi Arabia", propertyCount: 3 },
  { id: "neom", name: "NEOM", type: "city", parent: "Saudi Arabia", propertyCount: 1 },
  // Riyadh Areas
  { id: "olaya", name: "Olaya", type: "area", parent: "Riyadh", propertyCount: 3 },
  { id: "al-malqa", name: "Al Malqa", type: "area", parent: "Riyadh", propertyCount: 2 },
  { id: "hittin", name: "Hittin", type: "area", parent: "Riyadh", propertyCount: 2 },
  { id: "al-nakheel", name: "Al Nakheel", type: "area", parent: "Riyadh", propertyCount: 1 },

  // Qatar
  { id: "qatar", name: "Qatar", type: "country", propertyCount: 15 },
  { id: "doha", name: "Doha", type: "city", parent: "Qatar", propertyCount: 12 },
  { id: "lusail", name: "Lusail", type: "city", parent: "Qatar", propertyCount: 5 },
  { id: "al-wakrah", name: "Al Wakrah", type: "city", parent: "Qatar", propertyCount: 2 },
  // Doha Areas
  { id: "the-pearl", name: "The Pearl", type: "area", parent: "Doha", propertyCount: 4 },
  { id: "west-bay", name: "West Bay", type: "area", parent: "Doha", propertyCount: 3 },
  { id: "al-sadd", name: "Al Sadd", type: "area", parent: "Doha", propertyCount: 2 },

  // Kuwait
  { id: "kuwait", name: "Kuwait", type: "country", propertyCount: 10 },
  { id: "kuwait-city", name: "Kuwait City", type: "city", parent: "Kuwait", propertyCount: 8 },
  { id: "salmiya", name: "Salmiya", type: "city", parent: "Kuwait", propertyCount: 3 },
  { id: "hawally", name: "Hawally", type: "city", parent: "Kuwait", propertyCount: 2 },

  // Bahrain
  { id: "bahrain", name: "Bahrain", type: "country", propertyCount: 8 },
  { id: "manama", name: "Manama", type: "city", parent: "Bahrain", propertyCount: 6 },
  { id: "seef", name: "Seef", type: "area", parent: "Manama", propertyCount: 2 },
  { id: "juffair", name: "Juffair", type: "area", parent: "Manama", propertyCount: 2 },

  // Oman
  { id: "oman", name: "Oman", type: "country", propertyCount: 6 },
  { id: "muscat", name: "Muscat", type: "city", parent: "Oman", propertyCount: 5 },
  { id: "salalah", name: "Salalah", type: "city", parent: "Oman", propertyCount: 1 },

  // ============================================
  // NORTH AMERICA
  // ============================================

  // United States
  { id: "usa", name: "United States", type: "country", propertyCount: 150 },
  // US States
  { id: "california", name: "California", type: "state", parent: "United States", propertyCount: 35 },
  { id: "new-york-state", name: "New York", type: "state", parent: "United States", propertyCount: 30 },
  { id: "florida", name: "Florida", type: "state", parent: "United States", propertyCount: 25 },
  { id: "texas", name: "Texas", type: "state", parent: "United States", propertyCount: 20 },
  { id: "arizona", name: "Arizona", type: "state", parent: "United States", propertyCount: 10 },
  { id: "nevada", name: "Nevada", type: "state", parent: "United States", propertyCount: 8 },
  { id: "colorado", name: "Colorado", type: "state", parent: "United States", propertyCount: 8 },
  { id: "washington-state", name: "Washington", type: "state", parent: "United States", propertyCount: 7 },
  { id: "illinois", name: "Illinois", type: "state", parent: "United States", propertyCount: 7 },
  { id: "massachusetts", name: "Massachusetts", type: "state", parent: "United States", propertyCount: 6 },
  { id: "georgia", name: "Georgia", type: "state", parent: "United States", propertyCount: 5 },
  { id: "new-jersey", name: "New Jersey", type: "state", parent: "United States", propertyCount: 5 },
  { id: "pennsylvania", name: "Pennsylvania", type: "state", parent: "United States", propertyCount: 4 },
  { id: "ohio", name: "Ohio", type: "state", parent: "United States", propertyCount: 4 },
  { id: "michigan", name: "Michigan", type: "state", parent: "United States", propertyCount: 3 },
  { id: "north-carolina", name: "North Carolina", type: "state", parent: "United States", propertyCount: 4 },
  { id: "virginia", name: "Virginia", type: "state", parent: "United States", propertyCount: 3 },
  { id: "maryland", name: "Maryland", type: "state", parent: "United States", propertyCount: 3 },
  { id: "hawaii", name: "Hawaii", type: "state", parent: "United States", propertyCount: 5 },
  // California Cities
  { id: "los-angeles", name: "Los Angeles", type: "city", parent: "California", propertyCount: 15 },
  { id: "san-francisco", name: "San Francisco", type: "city", parent: "California", propertyCount: 10 },
  { id: "san-diego", name: "San Diego", type: "city", parent: "California", propertyCount: 8 },
  { id: "san-jose", name: "San Jose", type: "city", parent: "California", propertyCount: 5 },
  { id: "sacramento", name: "Sacramento", type: "city", parent: "California", propertyCount: 3 },
  { id: "oakland", name: "Oakland", type: "city", parent: "California", propertyCount: 3 },
  { id: "irvine", name: "Irvine", type: "city", parent: "California", propertyCount: 4 },
  { id: "santa-monica", name: "Santa Monica", type: "city", parent: "California", propertyCount: 3 },
  { id: "beverly-hills", name: "Beverly Hills", type: "city", parent: "California", propertyCount: 4 },
  { id: "palo-alto", name: "Palo Alto", type: "city", parent: "California", propertyCount: 2 },
  // LA Areas
  { id: "hollywood", name: "Hollywood", type: "area", parent: "Los Angeles", propertyCount: 3 },
  { id: "downtown-la", name: "Downtown LA", type: "area", parent: "Los Angeles", propertyCount: 4 },
  { id: "venice", name: "Venice", type: "area", parent: "Los Angeles", propertyCount: 2 },
  { id: "brentwood", name: "Brentwood", type: "area", parent: "Los Angeles", propertyCount: 2 },
  { id: "malibu", name: "Malibu", type: "area", parent: "Los Angeles", propertyCount: 3 },
  // New York Cities
  { id: "new-york-city", name: "New York City", type: "city", parent: "New York", propertyCount: 25 },
  { id: "buffalo", name: "Buffalo", type: "city", parent: "New York", propertyCount: 2 },
  { id: "albany", name: "Albany", type: "city", parent: "New York", propertyCount: 2 },
  // NYC Areas
  { id: "manhattan", name: "Manhattan", type: "area", parent: "New York City", propertyCount: 10 },
  { id: "brooklyn", name: "Brooklyn", type: "area", parent: "New York City", propertyCount: 7 },
  { id: "queens", name: "Queens", type: "area", parent: "New York City", propertyCount: 4 },
  { id: "bronx", name: "Bronx", type: "area", parent: "New York City", propertyCount: 2 },
  { id: "staten-island", name: "Staten Island", type: "area", parent: "New York City", propertyCount: 2 },
  // Manhattan Communities
  { id: "upper-east-side", name: "Upper East Side", type: "community", parent: "Manhattan", propertyCount: 3 },
  { id: "upper-west-side", name: "Upper West Side", type: "community", parent: "Manhattan", propertyCount: 3 },
  { id: "midtown", name: "Midtown", type: "community", parent: "Manhattan", propertyCount: 4 },
  { id: "tribeca", name: "Tribeca", type: "community", parent: "Manhattan", propertyCount: 2 },
  { id: "soho", name: "SoHo", type: "community", parent: "Manhattan", propertyCount: 2 },
  { id: "chelsea", name: "Chelsea", type: "community", parent: "Manhattan", propertyCount: 2 },
  // Florida Cities
  { id: "miami", name: "Miami", type: "city", parent: "Florida", propertyCount: 12 },
  { id: "orlando", name: "Orlando", type: "city", parent: "Florida", propertyCount: 6 },
  { id: "tampa", name: "Tampa", type: "city", parent: "Florida", propertyCount: 4 },
  { id: "fort-lauderdale", name: "Fort Lauderdale", type: "city", parent: "Florida", propertyCount: 4 },
  { id: "jacksonville", name: "Jacksonville", type: "city", parent: "Florida", propertyCount: 3 },
  { id: "west-palm-beach", name: "West Palm Beach", type: "city", parent: "Florida", propertyCount: 3 },
  // Miami Areas
  { id: "miami-beach", name: "Miami Beach", type: "area", parent: "Miami", propertyCount: 4 },
  { id: "brickell", name: "Brickell", type: "area", parent: "Miami", propertyCount: 3 },
  { id: "downtown-miami", name: "Downtown Miami", type: "area", parent: "Miami", propertyCount: 3 },
  { id: "coral-gables", name: "Coral Gables", type: "area", parent: "Miami", propertyCount: 2 },
  // Texas Cities
  { id: "houston", name: "Houston", type: "city", parent: "Texas", propertyCount: 8 },
  { id: "dallas", name: "Dallas", type: "city", parent: "Texas", propertyCount: 7 },
  { id: "austin", name: "Austin", type: "city", parent: "Texas", propertyCount: 6 },
  { id: "san-antonio", name: "San Antonio", type: "city", parent: "Texas", propertyCount: 4 },
  { id: "fort-worth", name: "Fort Worth", type: "city", parent: "Texas", propertyCount: 3 },
  // Other US Cities
  { id: "las-vegas", name: "Las Vegas", type: "city", parent: "Nevada", propertyCount: 8 },
  { id: "phoenix", name: "Phoenix", type: "city", parent: "Arizona", propertyCount: 6 },
  { id: "scottsdale", name: "Scottsdale", type: "city", parent: "Arizona", propertyCount: 4 },
  { id: "denver", name: "Denver", type: "city", parent: "Colorado", propertyCount: 6 },
  { id: "seattle", name: "Seattle", type: "city", parent: "Washington", propertyCount: 6 },
  { id: "chicago", name: "Chicago", type: "city", parent: "Illinois", propertyCount: 7 },
  { id: "boston", name: "Boston", type: "city", parent: "Massachusetts", propertyCount: 6 },
  { id: "atlanta", name: "Atlanta", type: "city", parent: "Georgia", propertyCount: 5 },
  { id: "honolulu", name: "Honolulu", type: "city", parent: "Hawaii", propertyCount: 5 },
  { id: "washington-dc", name: "Washington D.C.", type: "city", parent: "United States", propertyCount: 5 },

  // Canada
  { id: "canada", name: "Canada", type: "country", propertyCount: 50 },
  // Canadian Provinces
  { id: "ontario", name: "Ontario", type: "state", parent: "Canada", propertyCount: 20 },
  { id: "british-columbia", name: "British Columbia", type: "state", parent: "Canada", propertyCount: 15 },
  { id: "quebec", name: "Quebec", type: "state", parent: "Canada", propertyCount: 10 },
  { id: "alberta", name: "Alberta", type: "state", parent: "Canada", propertyCount: 8 },
  // Canadian Cities
  { id: "toronto", name: "Toronto", type: "city", parent: "Ontario", propertyCount: 15 },
  { id: "vancouver", name: "Vancouver", type: "city", parent: "British Columbia", propertyCount: 12 },
  { id: "montreal", name: "Montreal", type: "city", parent: "Quebec", propertyCount: 8 },
  { id: "calgary", name: "Calgary", type: "city", parent: "Alberta", propertyCount: 5 },
  { id: "ottawa", name: "Ottawa", type: "city", parent: "Ontario", propertyCount: 4 },
  { id: "edmonton", name: "Edmonton", type: "city", parent: "Alberta", propertyCount: 3 },
  // Toronto Areas
  { id: "downtown-toronto", name: "Downtown Toronto", type: "area", parent: "Toronto", propertyCount: 5 },
  { id: "yorkville", name: "Yorkville", type: "area", parent: "Toronto", propertyCount: 3 },
  { id: "north-york", name: "North York", type: "area", parent: "Toronto", propertyCount: 3 },

  // Mexico
  { id: "mexico", name: "Mexico", type: "country", propertyCount: 20 },
  { id: "mexico-city", name: "Mexico City", type: "city", parent: "Mexico", propertyCount: 8 },
  { id: "cancun", name: "Cancún", type: "city", parent: "Mexico", propertyCount: 5 },
  { id: "guadalajara", name: "Guadalajara", type: "city", parent: "Mexico", propertyCount: 4 },
  { id: "monterrey", name: "Monterrey", type: "city", parent: "Mexico", propertyCount: 3 },
  { id: "playa-del-carmen", name: "Playa del Carmen", type: "city", parent: "Mexico", propertyCount: 3 },
  { id: "tulum", name: "Tulum", type: "city", parent: "Mexico", propertyCount: 2 },

  // ============================================
  // EUROPE
  // ============================================

  // United Kingdom
  { id: "uk", name: "United Kingdom", type: "country", propertyCount: 60 },
  { id: "england", name: "England", type: "state", parent: "United Kingdom", propertyCount: 50 },
  { id: "scotland", name: "Scotland", type: "state", parent: "United Kingdom", propertyCount: 6 },
  { id: "wales", name: "Wales", type: "state", parent: "United Kingdom", propertyCount: 3 },
  { id: "northern-ireland", name: "Northern Ireland", type: "state", parent: "United Kingdom", propertyCount: 2 },
  // UK Cities
  { id: "london", name: "London", type: "city", parent: "England", propertyCount: 30 },
  { id: "manchester", name: "Manchester", type: "city", parent: "England", propertyCount: 6 },
  { id: "birmingham", name: "Birmingham", type: "city", parent: "England", propertyCount: 5 },
  { id: "leeds", name: "Leeds", type: "city", parent: "England", propertyCount: 3 },
  { id: "liverpool", name: "Liverpool", type: "city", parent: "England", propertyCount: 3 },
  { id: "edinburgh", name: "Edinburgh", type: "city", parent: "Scotland", propertyCount: 4 },
  { id: "glasgow", name: "Glasgow", type: "city", parent: "Scotland", propertyCount: 3 },
  { id: "bristol", name: "Bristol", type: "city", parent: "England", propertyCount: 2 },
  { id: "cambridge", name: "Cambridge", type: "city", parent: "England", propertyCount: 2 },
  { id: "oxford", name: "Oxford", type: "city", parent: "England", propertyCount: 2 },
  // London Areas
  { id: "central-london", name: "Central London", type: "area", parent: "London", propertyCount: 8 },
  { id: "mayfair", name: "Mayfair", type: "area", parent: "London", propertyCount: 4 },
  { id: "kensington", name: "Kensington", type: "area", parent: "London", propertyCount: 4 },
  { id: "chelsea-london", name: "Chelsea", type: "area", parent: "London", propertyCount: 3 },
  { id: "canary-wharf", name: "Canary Wharf", type: "area", parent: "London", propertyCount: 3 },
  { id: "notting-hill", name: "Notting Hill", type: "area", parent: "London", propertyCount: 2 },
  { id: "shoreditch", name: "Shoreditch", type: "area", parent: "London", propertyCount: 2 },

  // France
  { id: "france", name: "France", type: "country", propertyCount: 40 },
  { id: "paris", name: "Paris", type: "city", parent: "France", propertyCount: 20 },
  { id: "nice", name: "Nice", type: "city", parent: "France", propertyCount: 5 },
  { id: "lyon", name: "Lyon", type: "city", parent: "France", propertyCount: 4 },
  { id: "marseille", name: "Marseille", type: "city", parent: "France", propertyCount: 3 },
  { id: "cannes", name: "Cannes", type: "city", parent: "France", propertyCount: 3 },
  { id: "bordeaux", name: "Bordeaux", type: "city", parent: "France", propertyCount: 2 },
  { id: "monaco", name: "Monaco", type: "city", parent: "France", propertyCount: 3 },
  // Paris Areas
  { id: "champs-elysees", name: "Champs-Élysées", type: "area", parent: "Paris", propertyCount: 4 },
  { id: "le-marais", name: "Le Marais", type: "area", parent: "Paris", propertyCount: 3 },
  { id: "saint-germain", name: "Saint-Germain-des-Prés", type: "area", parent: "Paris", propertyCount: 3 },

  // Germany
  { id: "germany", name: "Germany", type: "country", propertyCount: 35 },
  { id: "berlin", name: "Berlin", type: "city", parent: "Germany", propertyCount: 12 },
  { id: "munich", name: "Munich", type: "city", parent: "Germany", propertyCount: 8 },
  { id: "frankfurt", name: "Frankfurt", type: "city", parent: "Germany", propertyCount: 6 },
  { id: "hamburg", name: "Hamburg", type: "city", parent: "Germany", propertyCount: 5 },
  { id: "dusseldorf", name: "Düsseldorf", type: "city", parent: "Germany", propertyCount: 3 },
  { id: "cologne", name: "Cologne", type: "city", parent: "Germany", propertyCount: 3 },

  // Spain
  { id: "spain", name: "Spain", type: "country", propertyCount: 35 },
  { id: "madrid", name: "Madrid", type: "city", parent: "Spain", propertyCount: 12 },
  { id: "barcelona", name: "Barcelona", type: "city", parent: "Spain", propertyCount: 10 },
  { id: "valencia", name: "Valencia", type: "city", parent: "Spain", propertyCount: 4 },
  { id: "malaga", name: "Málaga", type: "city", parent: "Spain", propertyCount: 3 },
  { id: "marbella", name: "Marbella", type: "city", parent: "Spain", propertyCount: 4 },
  { id: "ibiza", name: "Ibiza", type: "city", parent: "Spain", propertyCount: 3 },
  { id: "seville", name: "Seville", type: "city", parent: "Spain", propertyCount: 2 },

  // Italy
  { id: "italy", name: "Italy", type: "country", propertyCount: 30 },
  { id: "rome", name: "Rome", type: "city", parent: "Italy", propertyCount: 10 },
  { id: "milan", name: "Milan", type: "city", parent: "Italy", propertyCount: 8 },
  { id: "florence", name: "Florence", type: "city", parent: "Italy", propertyCount: 4 },
  { id: "venice", name: "Venice", type: "city", parent: "Italy", propertyCount: 3 },
  { id: "naples", name: "Naples", type: "city", parent: "Italy", propertyCount: 2 },
  { id: "como", name: "Lake Como", type: "city", parent: "Italy", propertyCount: 3 },

  // Portugal
  { id: "portugal", name: "Portugal", type: "country", propertyCount: 20 },
  { id: "lisbon", name: "Lisbon", type: "city", parent: "Portugal", propertyCount: 10 },
  { id: "porto", name: "Porto", type: "city", parent: "Portugal", propertyCount: 5 },
  { id: "algarve", name: "Algarve", type: "area", parent: "Portugal", propertyCount: 5 },

  // Netherlands
  { id: "netherlands", name: "Netherlands", type: "country", propertyCount: 15 },
  { id: "amsterdam", name: "Amsterdam", type: "city", parent: "Netherlands", propertyCount: 10 },
  { id: "rotterdam", name: "Rotterdam", type: "city", parent: "Netherlands", propertyCount: 3 },
  { id: "the-hague", name: "The Hague", type: "city", parent: "Netherlands", propertyCount: 2 },

  // Switzerland
  { id: "switzerland", name: "Switzerland", type: "country", propertyCount: 20 },
  { id: "zurich", name: "Zurich", type: "city", parent: "Switzerland", propertyCount: 8 },
  { id: "geneva", name: "Geneva", type: "city", parent: "Switzerland", propertyCount: 6 },
  { id: "basel", name: "Basel", type: "city", parent: "Switzerland", propertyCount: 3 },
  { id: "lausanne", name: "Lausanne", type: "city", parent: "Switzerland", propertyCount: 2 },

  // Greece
  { id: "greece", name: "Greece", type: "country", propertyCount: 15 },
  { id: "athens", name: "Athens", type: "city", parent: "Greece", propertyCount: 6 },
  { id: "mykonos", name: "Mykonos", type: "city", parent: "Greece", propertyCount: 4 },
  { id: "santorini", name: "Santorini", type: "city", parent: "Greece", propertyCount: 4 },
  { id: "crete", name: "Crete", type: "city", parent: "Greece", propertyCount: 2 },

  // Other European
  { id: "austria", name: "Austria", type: "country", propertyCount: 10 },
  { id: "vienna", name: "Vienna", type: "city", parent: "Austria", propertyCount: 7 },
  { id: "salzburg", name: "Salzburg", type: "city", parent: "Austria", propertyCount: 3 },

  { id: "belgium", name: "Belgium", type: "country", propertyCount: 8 },
  { id: "brussels", name: "Brussels", type: "city", parent: "Belgium", propertyCount: 5 },
  { id: "antwerp", name: "Antwerp", type: "city", parent: "Belgium", propertyCount: 3 },

  { id: "ireland", name: "Ireland", type: "country", propertyCount: 8 },
  { id: "dublin", name: "Dublin", type: "city", parent: "Ireland", propertyCount: 6 },
  { id: "cork", name: "Cork", type: "city", parent: "Ireland", propertyCount: 2 },

  { id: "sweden", name: "Sweden", type: "country", propertyCount: 8 },
  { id: "stockholm", name: "Stockholm", type: "city", parent: "Sweden", propertyCount: 6 },
  { id: "gothenburg", name: "Gothenburg", type: "city", parent: "Sweden", propertyCount: 2 },

  { id: "norway", name: "Norway", type: "country", propertyCount: 6 },
  { id: "oslo", name: "Oslo", type: "city", parent: "Norway", propertyCount: 5 },

  { id: "denmark", name: "Denmark", type: "country", propertyCount: 6 },
  { id: "copenhagen", name: "Copenhagen", type: "city", parent: "Denmark", propertyCount: 5 },

  { id: "finland", name: "Finland", type: "country", propertyCount: 4 },
  { id: "helsinki", name: "Helsinki", type: "city", parent: "Finland", propertyCount: 4 },

  { id: "poland", name: "Poland", type: "country", propertyCount: 8 },
  { id: "warsaw", name: "Warsaw", type: "city", parent: "Poland", propertyCount: 4 },
  { id: "krakow", name: "Krakow", type: "city", parent: "Poland", propertyCount: 3 },

  { id: "czech-republic", name: "Czech Republic", type: "country", propertyCount: 6 },
  { id: "prague", name: "Prague", type: "city", parent: "Czech Republic", propertyCount: 5 },

  { id: "hungary", name: "Hungary", type: "country", propertyCount: 5 },
  { id: "budapest", name: "Budapest", type: "city", parent: "Hungary", propertyCount: 5 },

  { id: "turkey", name: "Turkey", type: "country", propertyCount: 15 },
  { id: "istanbul", name: "Istanbul", type: "city", parent: "Turkey", propertyCount: 8 },
  { id: "ankara", name: "Ankara", type: "city", parent: "Turkey", propertyCount: 3 },
  { id: "antalya", name: "Antalya", type: "city", parent: "Turkey", propertyCount: 4 },

  { id: "russia", name: "Russia", type: "country", propertyCount: 12 },
  { id: "moscow", name: "Moscow", type: "city", parent: "Russia", propertyCount: 8 },
  { id: "st-petersburg", name: "St. Petersburg", type: "city", parent: "Russia", propertyCount: 4 },

  // ============================================
  // ASIA PACIFIC
  // ============================================

  // China
  { id: "china", name: "China", type: "country", propertyCount: 50 },
  { id: "beijing", name: "Beijing", type: "city", parent: "China", propertyCount: 12 },
  { id: "shanghai", name: "Shanghai", type: "city", parent: "China", propertyCount: 15 },
  { id: "guangzhou", name: "Guangzhou", type: "city", parent: "China", propertyCount: 6 },
  { id: "shenzhen", name: "Shenzhen", type: "city", parent: "China", propertyCount: 8 },
  { id: "hangzhou", name: "Hangzhou", type: "city", parent: "China", propertyCount: 4 },
  { id: "chengdu", name: "Chengdu", type: "city", parent: "China", propertyCount: 3 },

  // Hong Kong
  { id: "hong-kong", name: "Hong Kong", type: "country", propertyCount: 20 },
  { id: "central-hk", name: "Central", type: "area", parent: "Hong Kong", propertyCount: 5 },
  { id: "kowloon", name: "Kowloon", type: "area", parent: "Hong Kong", propertyCount: 6 },
  { id: "hong-kong-island", name: "Hong Kong Island", type: "area", parent: "Hong Kong", propertyCount: 5 },
  { id: "the-peak", name: "The Peak", type: "community", parent: "Hong Kong Island", propertyCount: 3 },

  // Singapore
  { id: "singapore", name: "Singapore", type: "country", propertyCount: 25 },
  { id: "orchard", name: "Orchard", type: "area", parent: "Singapore", propertyCount: 5 },
  { id: "marina-bay-sg", name: "Marina Bay", type: "area", parent: "Singapore", propertyCount: 5 },
  { id: "sentosa", name: "Sentosa", type: "area", parent: "Singapore", propertyCount: 4 },
  { id: "bugis", name: "Bugis", type: "area", parent: "Singapore", propertyCount: 3 },
  { id: "holland-village", name: "Holland Village", type: "area", parent: "Singapore", propertyCount: 2 },

  // Japan
  { id: "japan", name: "Japan", type: "country", propertyCount: 35 },
  { id: "tokyo", name: "Tokyo", type: "city", parent: "Japan", propertyCount: 15 },
  { id: "osaka", name: "Osaka", type: "city", parent: "Japan", propertyCount: 8 },
  { id: "kyoto", name: "Kyoto", type: "city", parent: "Japan", propertyCount: 5 },
  { id: "yokohama", name: "Yokohama", type: "city", parent: "Japan", propertyCount: 4 },
  { id: "nagoya", name: "Nagoya", type: "city", parent: "Japan", propertyCount: 3 },
  // Tokyo Areas
  { id: "shibuya", name: "Shibuya", type: "area", parent: "Tokyo", propertyCount: 4 },
  { id: "shinjuku", name: "Shinjuku", type: "area", parent: "Tokyo", propertyCount: 4 },
  { id: "minato", name: "Minato", type: "area", parent: "Tokyo", propertyCount: 3 },
  { id: "roppongi", name: "Roppongi", type: "area", parent: "Tokyo", propertyCount: 2 },

  // South Korea
  { id: "south-korea", name: "South Korea", type: "country", propertyCount: 20 },
  { id: "seoul", name: "Seoul", type: "city", parent: "South Korea", propertyCount: 15 },
  { id: "busan", name: "Busan", type: "city", parent: "South Korea", propertyCount: 4 },
  { id: "gangnam", name: "Gangnam", type: "area", parent: "Seoul", propertyCount: 5 },
  { id: "itaewon", name: "Itaewon", type: "area", parent: "Seoul", propertyCount: 2 },

  // Thailand
  { id: "thailand", name: "Thailand", type: "country", propertyCount: 25 },
  { id: "bangkok", name: "Bangkok", type: "city", parent: "Thailand", propertyCount: 15 },
  { id: "phuket", name: "Phuket", type: "city", parent: "Thailand", propertyCount: 6 },
  { id: "pattaya", name: "Pattaya", type: "city", parent: "Thailand", propertyCount: 4 },
  { id: "chiang-mai", name: "Chiang Mai", type: "city", parent: "Thailand", propertyCount: 3 },
  { id: "koh-samui", name: "Koh Samui", type: "city", parent: "Thailand", propertyCount: 3 },
  // Bangkok Areas
  { id: "sukhumvit", name: "Sukhumvit", type: "area", parent: "Bangkok", propertyCount: 5 },
  { id: "silom", name: "Silom", type: "area", parent: "Bangkok", propertyCount: 3 },
  { id: "sathorn", name: "Sathorn", type: "area", parent: "Bangkok", propertyCount: 3 },

  // Malaysia
  { id: "malaysia", name: "Malaysia", type: "country", propertyCount: 20 },
  { id: "kuala-lumpur", name: "Kuala Lumpur", type: "city", parent: "Malaysia", propertyCount: 12 },
  { id: "penang", name: "Penang", type: "city", parent: "Malaysia", propertyCount: 4 },
  { id: "johor-bahru", name: "Johor Bahru", type: "city", parent: "Malaysia", propertyCount: 4 },
  { id: "klcc", name: "KLCC", type: "area", parent: "Kuala Lumpur", propertyCount: 4 },
  { id: "mont-kiara", name: "Mont Kiara", type: "area", parent: "Kuala Lumpur", propertyCount: 3 },

  // Indonesia
  { id: "indonesia", name: "Indonesia", type: "country", propertyCount: 20 },
  { id: "jakarta", name: "Jakarta", type: "city", parent: "Indonesia", propertyCount: 10 },
  { id: "bali", name: "Bali", type: "city", parent: "Indonesia", propertyCount: 8 },
  { id: "surabaya", name: "Surabaya", type: "city", parent: "Indonesia", propertyCount: 3 },
  { id: "seminyak", name: "Seminyak", type: "area", parent: "Bali", propertyCount: 3 },
  { id: "ubud", name: "Ubud", type: "area", parent: "Bali", propertyCount: 2 },
  { id: "canggu", name: "Canggu", type: "area", parent: "Bali", propertyCount: 2 },

  // Vietnam
  { id: "vietnam", name: "Vietnam", type: "country", propertyCount: 15 },
  { id: "ho-chi-minh", name: "Ho Chi Minh City", type: "city", parent: "Vietnam", propertyCount: 8 },
  { id: "hanoi", name: "Hanoi", type: "city", parent: "Vietnam", propertyCount: 5 },
  { id: "da-nang", name: "Da Nang", type: "city", parent: "Vietnam", propertyCount: 3 },

  // Philippines
  { id: "philippines", name: "Philippines", type: "country", propertyCount: 15 },
  { id: "manila", name: "Manila", type: "city", parent: "Philippines", propertyCount: 8 },
  { id: "makati", name: "Makati", type: "area", parent: "Manila", propertyCount: 3 },
  { id: "bgc", name: "Bonifacio Global City (BGC)", type: "area", parent: "Manila", propertyCount: 3 },
  { id: "cebu", name: "Cebu", type: "city", parent: "Philippines", propertyCount: 4 },

  // India
  { id: "india", name: "India", type: "country", propertyCount: 40 },
  // Indian States
  { id: "maharashtra", name: "Maharashtra", type: "state", parent: "India", propertyCount: 15 },
  { id: "karnataka", name: "Karnataka", type: "state", parent: "India", propertyCount: 10 },
  { id: "delhi-ncr", name: "Delhi NCR", type: "state", parent: "India", propertyCount: 10 },
  { id: "tamil-nadu", name: "Tamil Nadu", type: "state", parent: "India", propertyCount: 5 },
  // Indian Cities
  { id: "mumbai", name: "Mumbai", type: "city", parent: "Maharashtra", propertyCount: 12 },
  { id: "bangalore", name: "Bangalore", type: "city", parent: "Karnataka", propertyCount: 10 },
  { id: "new-delhi", name: "New Delhi", type: "city", parent: "Delhi NCR", propertyCount: 8 },
  { id: "gurgaon", name: "Gurgaon", type: "city", parent: "Delhi NCR", propertyCount: 5 },
  { id: "pune", name: "Pune", type: "city", parent: "Maharashtra", propertyCount: 4 },
  { id: "chennai", name: "Chennai", type: "city", parent: "Tamil Nadu", propertyCount: 4 },
  { id: "hyderabad", name: "Hyderabad", type: "city", parent: "India", propertyCount: 5 },
  { id: "goa", name: "Goa", type: "city", parent: "India", propertyCount: 4 },
  // Mumbai Areas
  { id: "bandra", name: "Bandra", type: "area", parent: "Mumbai", propertyCount: 3 },
  { id: "worli", name: "Worli", type: "area", parent: "Mumbai", propertyCount: 2 },
  { id: "powai", name: "Powai", type: "area", parent: "Mumbai", propertyCount: 2 },

  // Australia
  { id: "australia", name: "Australia", type: "country", propertyCount: 35 },
  // Australian States
  { id: "nsw", name: "New South Wales", type: "state", parent: "Australia", propertyCount: 15 },
  { id: "victoria", name: "Victoria", type: "state", parent: "Australia", propertyCount: 12 },
  { id: "queensland", name: "Queensland", type: "state", parent: "Australia", propertyCount: 8 },
  { id: "western-australia", name: "Western Australia", type: "state", parent: "Australia", propertyCount: 4 },
  // Australian Cities
  { id: "sydney", name: "Sydney", type: "city", parent: "New South Wales", propertyCount: 12 },
  { id: "melbourne", name: "Melbourne", type: "city", parent: "Victoria", propertyCount: 10 },
  { id: "brisbane", name: "Brisbane", type: "city", parent: "Queensland", propertyCount: 6 },
  { id: "perth", name: "Perth", type: "city", parent: "Western Australia", propertyCount: 4 },
  { id: "gold-coast", name: "Gold Coast", type: "city", parent: "Queensland", propertyCount: 4 },
  // Sydney Areas
  { id: "sydney-cbd", name: "Sydney CBD", type: "area", parent: "Sydney", propertyCount: 4 },
  { id: "bondi", name: "Bondi", type: "area", parent: "Sydney", propertyCount: 3 },
  { id: "surry-hills", name: "Surry Hills", type: "area", parent: "Sydney", propertyCount: 2 },

  // New Zealand
  { id: "new-zealand", name: "New Zealand", type: "country", propertyCount: 10 },
  { id: "auckland", name: "Auckland", type: "city", parent: "New Zealand", propertyCount: 6 },
  { id: "wellington", name: "Wellington", type: "city", parent: "New Zealand", propertyCount: 3 },
  { id: "queenstown", name: "Queenstown", type: "city", parent: "New Zealand", propertyCount: 2 },

  // ============================================
  // AFRICA
  // ============================================

  // South Africa
  { id: "south-africa", name: "South Africa", type: "country", propertyCount: 20 },
  { id: "cape-town", name: "Cape Town", type: "city", parent: "South Africa", propertyCount: 10 },
  { id: "johannesburg", name: "Johannesburg", type: "city", parent: "South Africa", propertyCount: 7 },
  { id: "durban", name: "Durban", type: "city", parent: "South Africa", propertyCount: 3 },
  { id: "sandton", name: "Sandton", type: "area", parent: "Johannesburg", propertyCount: 3 },
  { id: "camps-bay", name: "Camps Bay", type: "area", parent: "Cape Town", propertyCount: 2 },

  // Egypt
  { id: "egypt", name: "Egypt", type: "country", propertyCount: 15 },
  { id: "cairo", name: "Cairo", type: "city", parent: "Egypt", propertyCount: 8 },
  { id: "alexandria", name: "Alexandria", type: "city", parent: "Egypt", propertyCount: 4 },
  { id: "sharm-el-sheikh", name: "Sharm El Sheikh", type: "city", parent: "Egypt", propertyCount: 3 },
  { id: "new-cairo", name: "New Cairo", type: "area", parent: "Cairo", propertyCount: 3 },

  // Morocco
  { id: "morocco", name: "Morocco", type: "country", propertyCount: 10 },
  { id: "marrakech", name: "Marrakech", type: "city", parent: "Morocco", propertyCount: 5 },
  { id: "casablanca", name: "Casablanca", type: "city", parent: "Morocco", propertyCount: 4 },
  { id: "tangier", name: "Tangier", type: "city", parent: "Morocco", propertyCount: 2 },

  // Nigeria
  { id: "nigeria", name: "Nigeria", type: "country", propertyCount: 12 },
  { id: "lagos", name: "Lagos", type: "city", parent: "Nigeria", propertyCount: 8 },
  { id: "abuja", name: "Abuja", type: "city", parent: "Nigeria", propertyCount: 4 },
  { id: "victoria-island", name: "Victoria Island", type: "area", parent: "Lagos", propertyCount: 3 },
  { id: "ikoyi", name: "Ikoyi", type: "area", parent: "Lagos", propertyCount: 2 },

  // Kenya
  { id: "kenya", name: "Kenya", type: "country", propertyCount: 8 },
  { id: "nairobi", name: "Nairobi", type: "city", parent: "Kenya", propertyCount: 6 },
  { id: "mombasa", name: "Mombasa", type: "city", parent: "Kenya", propertyCount: 2 },

  // ============================================
  // SOUTH AMERICA
  // ============================================

  // Brazil
  { id: "brazil", name: "Brazil", type: "country", propertyCount: 25 },
  { id: "sao-paulo", name: "São Paulo", type: "city", parent: "Brazil", propertyCount: 10 },
  { id: "rio-de-janeiro", name: "Rio de Janeiro", type: "city", parent: "Brazil", propertyCount: 8 },
  { id: "brasilia", name: "Brasília", type: "city", parent: "Brazil", propertyCount: 3 },
  { id: "florianopolis", name: "Florianópolis", type: "city", parent: "Brazil", propertyCount: 2 },
  { id: "copacabana", name: "Copacabana", type: "area", parent: "Rio de Janeiro", propertyCount: 3 },
  { id: "ipanema", name: "Ipanema", type: "area", parent: "Rio de Janeiro", propertyCount: 2 },

  // Argentina
  { id: "argentina", name: "Argentina", type: "country", propertyCount: 12 },
  { id: "buenos-aires", name: "Buenos Aires", type: "city", parent: "Argentina", propertyCount: 10 },
  { id: "palermo", name: "Palermo", type: "area", parent: "Buenos Aires", propertyCount: 3 },
  { id: "recoleta", name: "Recoleta", type: "area", parent: "Buenos Aires", propertyCount: 2 },

  // Colombia
  { id: "colombia", name: "Colombia", type: "country", propertyCount: 10 },
  { id: "bogota", name: "Bogotá", type: "city", parent: "Colombia", propertyCount: 5 },
  { id: "medellin", name: "Medellín", type: "city", parent: "Colombia", propertyCount: 4 },
  { id: "cartagena", name: "Cartagena", type: "city", parent: "Colombia", propertyCount: 3 },

  // Chile
  { id: "chile", name: "Chile", type: "country", propertyCount: 8 },
  { id: "santiago", name: "Santiago", type: "city", parent: "Chile", propertyCount: 6 },
  { id: "valparaiso", name: "Valparaíso", type: "city", parent: "Chile", propertyCount: 2 },

  // Peru
  { id: "peru", name: "Peru", type: "country", propertyCount: 6 },
  { id: "lima", name: "Lima", type: "city", parent: "Peru", propertyCount: 5 },
  { id: "miraflores", name: "Miraflores", type: "area", parent: "Lima", propertyCount: 2 },

  // ============================================
  // CARIBBEAN
  // ============================================

  { id: "bahamas", name: "Bahamas", type: "country", propertyCount: 5 },
  { id: "nassau", name: "Nassau", type: "city", parent: "Bahamas", propertyCount: 4 },

  { id: "jamaica", name: "Jamaica", type: "country", propertyCount: 4 },
  { id: "kingston", name: "Kingston", type: "city", parent: "Jamaica", propertyCount: 2 },
  { id: "montego-bay", name: "Montego Bay", type: "city", parent: "Jamaica", propertyCount: 2 },

  { id: "dominican-republic", name: "Dominican Republic", type: "country", propertyCount: 5 },
  { id: "punta-cana", name: "Punta Cana", type: "city", parent: "Dominican Republic", propertyCount: 3 },
  { id: "santo-domingo", name: "Santo Domingo", type: "city", parent: "Dominican Republic", propertyCount: 2 },

  { id: "puerto-rico", name: "Puerto Rico", type: "country", propertyCount: 5 },
  { id: "san-juan", name: "San Juan", type: "city", parent: "Puerto Rico", propertyCount: 4 },

  // ============================================
  // COMMUNITIES (Sub-areas for popular locations)
  // ============================================

  // Dubai Communities
  { id: "burj-khalifa-area", name: "Burj Khalifa Area", type: "community", parent: "Downtown Dubai", propertyCount: 2 },
  {
    id: "the-address-residences",
    name: "The Address Residences",
    type: "community",
    parent: "Downtown Dubai",
    propertyCount: 1,
  },
  { id: "marina-walk", name: "Marina Walk", type: "community", parent: "Dubai Marina", propertyCount: 2 },
  { id: "jbr", name: "Jumeirah Beach Residence (JBR)", type: "community", parent: "Dubai Marina", propertyCount: 2 },
  { id: "palm-crescent", name: "Palm Crescent", type: "community", parent: "Palm Jumeirah", propertyCount: 1 },
  { id: "palm-trunk", name: "Palm Trunk", type: "community", parent: "Palm Jumeirah", propertyCount: 1 },
]

export function searchLocations(query: string): Location[] {
  if (!query.trim()) {
    // Return popular cities when no query
    return locations.filter((l) => l.type === "city").slice(0, 8)
  }

  const lowerQuery = query.toLowerCase()

  return locations
    .filter((location) => {
      const nameMatch = location.name.toLowerCase().includes(lowerQuery)
      const parentMatch = location.parent?.toLowerCase().includes(lowerQuery)
      return nameMatch || parentMatch
    })
    .sort((a, b) => {
      // Prioritize exact matches at the start
      const aStartsWith = a.name.toLowerCase().startsWith(lowerQuery)
      const bStartsWith = b.name.toLowerCase().startsWith(lowerQuery)
      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1

      // Then by type priority: country > state > city > area > community
      const typePriority = { country: 0, state: 1, city: 2, area: 3, community: 4 }
      return typePriority[a.type] - typePriority[b.type]
    })
    .slice(0, 12)
}

export function highlightMatch(text: string, query: string): { before: string; match: string; after: string } | null {
  if (!query.trim()) return null

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) return null

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + query.length),
    after: text.slice(index + query.length),
  }
}

// Get icon for location type
export function getLocationIcon(type: Location["type"]): string {
  switch (type) {
    case "country":
      return "🌍"
    case "state":
      return "🏛️"
    case "city":
      return "🏙️"
    case "area":
      return "📍"
    case "community":
      return "🏘️"
    default:
      return "📍"
  }
}
