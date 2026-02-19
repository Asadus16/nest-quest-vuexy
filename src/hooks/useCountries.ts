'use client'

import { useState, useEffect } from 'react'

export type Country = {
  label: string
  code: string
}

const CACHE_KEY = 'nest-quest-countries'

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check sessionStorage cache first
    const cached = sessionStorage.getItem(CACHE_KEY)

    if (cached) {
      setCountries(JSON.parse(cached))
      setLoading(false)

      return
    }

    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(res => res.json())
      .then((data: { name: { common: string }; cca2: string }[]) => {
        const sorted = data
          .map(c => ({ label: c.name.common, code: c.cca2 }))
          .sort((a, b) => a.label.localeCompare(b.label))

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(sorted))
        setCountries(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { countries, loading }
}

export default useCountries
