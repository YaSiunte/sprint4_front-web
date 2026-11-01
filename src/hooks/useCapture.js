import { useState } from 'react'
import { analyzeCapture } from '../services/mockApi.js'

export function useCapture() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function analyze(file) {
    if (!file) return

    setLoading(true)

    try {
      const analysis = await analyzeCapture(file)
      setResult(analysis)
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, analyze }
}