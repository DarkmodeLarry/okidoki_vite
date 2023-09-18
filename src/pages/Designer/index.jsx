import { useEffect, useRef } from 'react'
import { Designer, checkTemplate } from '@pdfme/ui'
import { generate } from '@pdfme/generator'
import { getTemplate, readFile, cloneDeep, getTemplateFromJsonFile, downloadJsonFile } from '@/libs/helper'

function Designer() {
  const designerRef = useRef(null)
  const designer = useRef < Designer > null

  useEffect(() => {
    let template = getTemplate()
    try {
      const templateString = localStorage.getItem('template')
      const templateJson = templateString ? JSON.parse(templateString) : getTemplate()
      checkTemplate(templateJson)
      template = templateJson
    } catch {
      localStorage.removeItem('template')
    }

    if (designerRef.current) {
      designer.current = new Designer({
        domContainer: designerRef.current,
        template
      })
      designer.current.onSaveTemplate(onSaveTemplate)
    }

    return () => {
      if (designer.current) {
        designer.current.destroy()
      }
    }
  }, [designerRef])

  const onChangeBasePDF = (e) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], 'dataURL').then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf
            })
          )
        }
      })
    }
  }

  const onLoadTemplate = (e) => {
    if (e.target && e.target.files) {
      getTemplateFromJsonFile(e.target.files[0])
        .then((t) => {
          if (designer.current) {
            designer.current.updateTemplate(t)
          }
        })
        .catch((e) => {
          alert(`Invalid template file.

${e}`)
        })
    }
  }

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), 'template')
    }
  }

  const onSaveTemplate = (template) => {
    if (designer.current) {
      localStorage.setItem('template', JSON.stringify(template || designer.current.getTemplate()))
      alert('Saved!')
    }
  }

  const onResetTemplate = () => {
    if (designer.current) {
      designer.current.updateTemplate(getTemplate())
      localStorage.removeItem('template')
    }
  }

  const onGeneratePDF = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate()
      const inputs = template.sampledata ?? []
      const pdf = await generate({ template, inputs, options: { font } })
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
        <strong>Designer</strong>
        <span style={{ margin: '0 1rem' }}>:</span>
        <label style={{ width: 180 }}>
          Change BasePDF
          <input type='file' accept='application/pdf' onChange={onChangeBasePDF} />
        </label>
        <span style={{ margin: '0 1rem' }}>/</span>
        <label style={{ width: 180 }}>
          Load Template
          <input type='file' accept='application/json' onChange={onLoadTemplate} />
        </label>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onDownloadTemplate}>Download Template</button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={() => onSaveTemplate()}>Save Template</button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onResetTemplate}>Reset Template</button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onGeneratePDF}>Generate PDF</button>
      </header>
      <div ref={designerRef} />
    </div>
  )
}

export default Designer
