import { EvalContext } from '@/context/evalContext'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

function useGenerateTestCaseMutation() {
  const { testCasesConfig, setGeneratedTestCases } = useContext(EvalContext)
  return useMutation({
    mutationFn: async (apiKey: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/generate-testcases`, {
        method: "POST",
        body: JSON.stringify(testCasesConfig),
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Passes the parsed JSON to the next .then()
      })
        .then(data => {
          setGeneratedTestCases?.(data)
        })
    }
  })
}

export default useGenerateTestCaseMutation