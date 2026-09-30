import { useEffect, useRef } from 'react'
import markup from './markup.html?raw'
import { initPage } from './page'

export default function App() {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    initPage()
  }, [])

  return <div className="page" dangerouslySetInnerHTML={{ __html: markup }} />
}
