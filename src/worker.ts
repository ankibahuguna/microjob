import { WorkerResponse } from './interfaces'
import { parentPort } from 'worker_threads'

parentPort.on('message', async (worker: string) => {
  const response: WorkerResponse = {
    error: null,
    data: null
  }

  try {
    eval(worker)
    // __executor__ is defined in worker
    response.data = await __executor__()
    parentPort.postMessage(response)
  } catch (err) {
    response.data = null
    response.error = {
      message: err.message,
      stack: err.stack
    }
    parentPort.postMessage(response)
  }
})
