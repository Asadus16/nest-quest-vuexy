export type City = {
  label: string
  value: string
}

export type Area = {
  label: string
  value: string
  city: string
}

export const uaeCities: City[] = [
  { label: 'Dubai', value: 'dubai' },
  { label: 'Abu Dhabi', value: 'abu-dhabi' },
  { label: 'Sharjah', value: 'sharjah' },
  { label: 'Ajman', value: 'ajman' },
  { label: 'Ras Al Khaimah', value: 'ras-al-khaimah' },
  { label: 'Fujairah', value: 'fujairah' },
  { label: 'Umm Al Quwain', value: 'umm-al-quwain' }
]

export const uaeAreas: Area[] = [
  // Dubai
  { label: 'Downtown Dubai', value: 'downtown-dubai', city: 'dubai' },
  { label: 'Dubai Marina', value: 'dubai-marina', city: 'dubai' },
  { label: 'Palm Jumeirah', value: 'palm-jumeirah', city: 'dubai' },
  { label: 'Business Bay', value: 'business-bay', city: 'dubai' },
  { label: 'JBR', value: 'jbr', city: 'dubai' },
  { label: 'Jumeirah Village Circle', value: 'jvc', city: 'dubai' },
  { label: 'Dubai Hills Estate', value: 'dubai-hills', city: 'dubai' },
  { label: 'Deira', value: 'deira', city: 'dubai' },
  { label: 'Bur Dubai', value: 'bur-dubai', city: 'dubai' },
  { label: 'Al Barsha', value: 'al-barsha', city: 'dubai' },
  { label: 'International City', value: 'international-city', city: 'dubai' },
  { label: 'Dubai Silicon Oasis', value: 'silicon-oasis', city: 'dubai' },
  { label: 'Arabian Ranches', value: 'arabian-ranches', city: 'dubai' },
  { label: 'DIFC', value: 'difc', city: 'dubai' },
  { label: 'Motor City', value: 'motor-city', city: 'dubai' },

  // Abu Dhabi
  { label: 'Al Reem Island', value: 'al-reem-island', city: 'abu-dhabi' },
  { label: 'Yas Island', value: 'yas-island', city: 'abu-dhabi' },
  { label: 'Saadiyat Island', value: 'saadiyat-island', city: 'abu-dhabi' },
  { label: 'Corniche', value: 'corniche', city: 'abu-dhabi' },
  { label: 'Khalifa City', value: 'khalifa-city', city: 'abu-dhabi' },
  { label: 'Al Raha Beach', value: 'al-raha-beach', city: 'abu-dhabi' },
  { label: 'Masdar City', value: 'masdar-city', city: 'abu-dhabi' },

  // Sharjah
  { label: 'Al Nahda', value: 'al-nahda-sharjah', city: 'sharjah' },
  { label: 'Al Majaz', value: 'al-majaz', city: 'sharjah' },
  { label: 'Al Khan', value: 'al-khan', city: 'sharjah' },
  { label: 'Al Taawun', value: 'al-taawun', city: 'sharjah' },
  { label: 'Muwaileh', value: 'muwaileh', city: 'sharjah' },

  // Ajman
  { label: 'Ajman Downtown', value: 'ajman-downtown', city: 'ajman' },
  { label: 'Al Nuaimia', value: 'al-nuaimia', city: 'ajman' },
  { label: 'Emirates City', value: 'emirates-city', city: 'ajman' },

  // Ras Al Khaimah
  { label: 'Al Hamra Village', value: 'al-hamra-village', city: 'ras-al-khaimah' },
  { label: 'Mina Al Arab', value: 'mina-al-arab', city: 'ras-al-khaimah' },
  { label: 'Al Marjan Island', value: 'al-marjan-island', city: 'ras-al-khaimah' },

  // Fujairah
  { label: 'Fujairah City', value: 'fujairah-city', city: 'fujairah' },
  { label: 'Dibba Al Fujairah', value: 'dibba-fujairah', city: 'fujairah' },

  // Umm Al Quwain
  { label: 'Umm Al Quwain City', value: 'uaq-city', city: 'umm-al-quwain' },
  { label: 'Al Salamah', value: 'al-salamah-uaq', city: 'umm-al-quwain' }
]

export const getAreasByCity = (cityValue: string): Area[] => {
  return uaeAreas.filter(area => area.city === cityValue)
}
