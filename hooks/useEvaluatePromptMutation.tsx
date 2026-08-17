import { EvalContext } from '@/context/evalContext'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

function useEvaluatePromptMutation() {
  const { evaluateConfig, setEvaluationReportHtml } = useContext(EvalContext)
  return useMutation({
    mutationFn: async (apiKey: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/evaluate`, {
        method: "POST",
        body: JSON.stringify(evaluateConfig),
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        }
      }).then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          throw new Error(body?.detail || `HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then((data: { response: string }) => {
        setEvaluationReportHtml?.(data.response)
      })
    }
  })
}

export default useEvaluatePromptMutation