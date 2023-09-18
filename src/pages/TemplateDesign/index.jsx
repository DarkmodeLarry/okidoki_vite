import { useEffect, useState, useRef } from 'react'
import { Designer } from '@pdfme/ui'
import { generate } from '@pdfme/generator'
import {
  getSampleTemplate,
  cloneDeep,
  downloadJsonFile,
  readFile,
  getTemplateFromJsonFile,
  getGeneratorSampleCode,
  getDesignerSampleCode,
  getFormSampleCode,
  getViewerSampleCode
} from '@/libs/helper'

const headerHeight = 60
const controllerHeight = 60

const TemplateDesign = () => {
  const designerRef = useRef(null)
  const designer = (useRef < Designer) | (null > null)
  const [template, setTemplate] = useState(getSampleTemplate())
  const [smallDisplay, setSmallDisplay] = useState(true)

  const modes = ['generator', 'designer', 'form', 'viewer']

  const [codeMode, setCodeMode] = useState('generator')
  const [codeModalOpen, setCodeModalOpen] = useState(false)
  const handleCodeModalOpen = () => setCodeModalOpen(true)
  const handleCodeModalClose = () => setCodeModalOpen(false)

  const code = () => {
    if (codeMode === 'generator') {
      return getGeneratorSampleCode(template)
    } else if (codeMode === 'designer') {
      return getDesignerSampleCode(template)
    } else if (codeMode === 'form') {
      return getFormSampleCode(template)
    } else if (codeMode === 'viewer') {
      return getViewerSampleCode(template)
    }
  }

  useEffect(() => {
    setSmallDisplay(window.innerWidth < 900)
  }, [])

  useEffect(() => {
    if (designerRef.current) {
      designer.current = new Designer({ designerRef, template })
      designer.current.onSaveTemplate(downloadTemplate)
      designer.current.onChangeTemplate(setTemplate)
    }
    return () => {
      designer.current.destroy()
    }
  }, [designerRef])

  const changeBasePdf = (file) => {
    if (designer.current) {
      readFile(file, 'dataURL').then(async (basePdf) => {
        designer.current.updateTemplate(Object.assign(cloneDeep(template), { basePdf }))
      })
    }
  }

  const loadTemplate = (file) => {
    if (designer.current) {
      getTemplateFromJsonFile(file)
        .then((t) => {
          designer.current.updateTemplate(t)
        })
        .catch((e) => {
          alert(`Invalid template file.

				${e}`)
        })
    }
  }

  const downloadTemplate = () => {
    downloadJsonFile(designer.current.getTemplate(), 'template')
  }

  const generatePdf = async () => {
    const inputs = template.sampleData ?? []
    const pdf = await generate({ template, inputs })
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
    window.open(URL.createObjectURL(blob))
  }

  return (
    <div>
      <h1>TemplateDesign</h1>
    </div>
  )
}

export default TemplateDesign
