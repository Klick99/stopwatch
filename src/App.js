import React, {useState, useEffect} from 'react';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


export default function App() {
  const [sec, setSeconds] = useState(0)
  const [status, setStatusRun] = useState(false)
  const [waitStatus, setWaitStatus] = useState(false)
  let waitTimer = 0

  useEffect(() => {
    const unsubscribe$ = new Subject()
    timer(1000, 1000)
       .pipe(takeUntil(unsubscribe$))

       .subscribe(() => {
         if (status) {
           setSeconds(e => e + 1)
         }
       })

    return () => {
      unsubscribe$.next()
      unsubscribe$.complete()
    }
  }, [status])

  const wait = () => {
    if (waitTimer) clearTimeout(waitTimer)
    waitTimer = setTimeout(() => alert('Click faster!'), 300)
  }

  const waitOnDoubleClick = () => {
    setWaitStatus(!waitStatus)
    setStatusRun(!status)
    clearTimeout(waitTimer)
  }

  const startStop = () => {
    if (waitStatus) {
      setStatusRun(!status)
      setWaitStatus(!waitStatus)
    } else {
      setStatusRun(!status)
      setSeconds(0)
    }
  }

  let currentTime = `${Math.trunc(sec / 60 / 60 % 60)} : ${Math.trunc(sec / 60 % 60)} : ${sec % 60}`

  return (
     <>
       <div className='timer'>
         <span>{currentTime}</span>
       </div >
       <div className='buttons'>
         <input type='button' value='Start/Stop' onClick={startStop}/>
         <input type='button' value='Reset' onClick={() => setSeconds(0)}/>
         <input type='button' value='Wait' onClick={wait} onDoubleClick={waitOnDoubleClick}/>
       </div>
     </>
  );
}