import { EvalContext } from '@/context/evalContext'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

function useEvaluatePromptMutation() {
  const { evaluateConfig } = useContext(EvalContext)
  return useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/evaluate`, {
        method: "POST",
        body: JSON.stringify(evaluateConfig),
        headers: { "Content-Type": "application/json" }
      })
    }
  })
}

export default useEvaluatePromptMutation