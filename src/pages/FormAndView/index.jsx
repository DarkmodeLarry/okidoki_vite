import { useEffect, useRef, useState } from 'react'
import { Form, Viewer, checkTemplate } from '@pdfme/ui'
import { generate } from '@pdfme/generator'
import { getTemplate, getTemplateFromJsonFile, isJsonString } from '@/libs/helper'
import { Button } from '@/components/ui/Button'

const initTemplate = () => {
  let template = getTemplate()
  try {
    const templateString = localStorage.getItem('template')
    const templateJson = templateString ? JSON.parse(templateString) : getTemplate()
    checkTemplate(templateJson)
    template = templateJson
  } catch {
    localStorage.removeItem('template')
  }
  return template
}

function FormAndView() {
  const uiRef = useRef(null)
  const ui = useRef(null)
  const [mode, setMode] = useState(localStorage.getItem('mode') ?? 'form')

  useEffect(() => {
    const template = initTemplate()
    let inputs = template.sampledata ?? [{}]
    try {
      const inputsString = localStorage.getItem('inputs')
      const inputsJson = inputsString ? JSON.parse(inputsString) : template.sampledata ?? [{}]
      inputs = inputsJson
    } catch {
      localStorage.removeItem('inputs')
    }

    if (uiRef.current) {
      ui.current = new (mode === 'form' ? Form : Viewer)({
        domContainer: uiRef.current,
        template,
        inputs
      })
    }

    return () => {
      if (ui.current) {
        ui.current.destroy()
      }
    }
  }, [uiRef, mode])

  const onChangeMode = (e) => {
    const value = e.target.value
    setMode(value)
    localStorage.setItem('mode', value)
  }

  const onLoadTemplate = (e) => {
    if (e.target && e.target.files) {
      getTemplateFromJsonFile(e.target.files[0])
        .then((t) => {
          if (ui.current) {
            ui.current.updateTemplate(t)
          }
        })
        .catch((e) => {
          alert(`Invalid template file.
--------------------------
${e}`)
        })
    }
  }

  const onGetInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs()
      alert(JSON.stringify(inputs, null, 2))
      alert('Dumped as console.log')
      console.log(inputs)
    }
  }

  const onSetInputs = () => {
    if (ui.current) {
      const prompt = window.prompt('Enter Inputs JSONString') || ''
      try {
        const json = isJsonString(prompt) ? JSON.parse(prompt) : [{}]
        ui.current.setInputs(json)
      } catch (e) {
        alert(e)
      }
    }
  }

  const onSaveInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs()
      localStorage.setItem('inputs', JSON.stringify(inputs))
      alert('Saved!')
    }
  }

  const onResetInputs = () => {
    localStorage.removeItem('inputs')
    if (ui.current) {
      const template = initTemplate()
      ui.current.setInputs(template.sampledata ?? [{}])
    }
  }

  const onGeneratePDF = async () => {
    if (ui.current) {
      const template = ui.current.getTemplate()
      const inputs = ui.current.getInputs()
      const pdf = await generate({ template, inputs })
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
      window.open(URL.createObjectURL(blob))
    }
  }

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <strong>Form, Viewer</strong>
        <span style={{ margin: '0 1rem' }}>:</span>
        <div className='flex items-center justify-center gap-3'>
          <input type='radio' onChange={onChangeMode} id='form' value='form' checked={mode === 'form'} />
          <label htmlFor='form'>Form</label>
          <input type='radio' onChange={onChangeMode} id='viewer' value='viewer' checked={mode === 'viewer'} />
          <label htmlFor='viewer'>Viewer</label>
        </div>
        <label style={{ width: 180 }}>
          Load Template
          <input type='file' accept='application/json' onChange={onLoadTemplate} />
        </label>
        <span style={{ margin: '0 1rem' }}>/</span>
        <Button className='p-2' onClick={onGetInputs}>
          Get Inputs
        </Button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <Button className='p-2' onClick={onSetInputs}>
          Set Inputs
        </Button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <Button className='p-2' onClick={onSaveInputs}>
          Save Inputs
        </Button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <Button className='p-2' onClick={onResetInputs}>
          Reset Inputs
        </Button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <Button className='p-2' onClick={onGeneratePDF}>
          Generate PDF
        </Button>
      </header>
      <div ref={uiRef} />
    </div>
  )
}

export default FormAndView
