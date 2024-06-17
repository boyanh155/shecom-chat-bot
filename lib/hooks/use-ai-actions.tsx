import axios from 'axios'
import shecomicon from '@/public/favicon-16x16.png'

const submitUserMessage: (message: string) => any = async function (
  message: string
) {
  const result = await axios.post(`/api/chat?q=${message}`)
  return result.data
}
const useAiActions = () => {
  return {
    submitUserMessage
  }
}

export default useAiActions
