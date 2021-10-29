import {useState} from 'react'
import {api} from './api'

export const App = () => {
  const [data, setData] = useState('init data')

  return (
    <div>
      <div>Data: <code style={{background: 'pink'}}>{data}</code></div>
      <button
        onClick={async() => {
          const data = await api.getData()
          console.log(data)
          setData(data.data)
        }}
      >Fetch data</button>
    </div>
  )
}