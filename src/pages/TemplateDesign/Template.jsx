import { Form } from 'pdfme/ui'

const domContainer = document.getElementById('container')

const template = {
  schemas: [
    {
      owner: {
        type: 'qrcode',
        position: {
          x: 159.01,
          y: 240.68
        },
        width: 26.53,
        height: 26.53
      },
      'healthcare_agent-1': {
        type: 'text',
        position: {
          x: 67.66,
          y: 81.64
        },
        width: 115.61,
        height: 6,
        fontSize: 12,
        fontColor: '#0024b3',
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        characterSpacing: 0.5
      },
      'dob-1': {
        type: 'text',
        position: {
          x: 44.08,
          y: 93.28
        },
        width: 42.66,
        height: 5.67,
        alignment: 'center',
        fontSize: 13,
        characterSpacing: 3,
        lineHeight: 1,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'drivers_license-1': {
        type: 'text',
        position: {
          x: 143.42,
          y: 92.68
        },
        width: 43.38,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'property_address-1': {
        type: 'text',
        position: {
          x: 45.79,
          y: 107.32
        },
        width: 138.89,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'phone_home-1': {
        type: 'text',
        position: {
          x: 58.52,
          y: 122.1
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'phone_cell-1': {
        type: 'text',
        position: {
          x: 103.71,
          y: 121.51
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'phone_other-1': {
        type: 'text',
        position: {
          x: 155.51,
          y: 121.47
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'healthcare_agent-2': {
        type: 'text',
        position: {
          x: 69.2,
          y: 135.82
        },
        width: 115.61,
        height: 6,
        fontSize: 12,
        fontColor: '#0024b3',
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        characterSpacing: 0.5
      },
      'dob-2': {
        type: 'text',
        position: {
          x: 44.46,
          y: 147.57
        },
        width: 42.66,
        height: 5.67,
        alignment: 'center',
        fontSize: 13,
        characterSpacing: 3,
        lineHeight: 1,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'drivers_license-2': {
        type: 'text',
        position: {
          x: 142.84,
          y: 147.39
        },
        width: 43.38,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'property_address-2': {
        type: 'text',
        position: {
          x: 44.94,
          y: 162.03
        },
        width: 138.89,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        fontColor: '#0024b3'
      },
      'phone_home-2': {
        type: 'text',
        position: {
          x: 57.14,
          y: 176.81
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'phone_cell-2': {
        type: 'text',
        position: {
          x: 103.39,
          y: 177.02
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'phone_other-2': {
        type: 'text',
        position: {
          x: 154.93,
          y: 177.24
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'healthcare_agent-3': {
        type: 'text',
        position: {
          x: 67.87,
          y: 190.07
        },
        width: 115.61,
        height: 6,
        fontSize: 12,
        fontColor: '#0024b3',
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        characterSpacing: 0.5
      },
      'dob-3': {
        type: 'text',
        position: {
          x: 44.14,
          y: 201.76
        },
        width: 42.66,
        height: 5.67,
        alignment: 'center',
        fontSize: 13,
        characterSpacing: 3,
        lineHeight: 1,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'drivers_license-3': {
        type: 'text',
        position: {
          x: 142.52,
          y: 201.31
        },
        width: 43.38,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'property_address-3': {
        type: 'text',
        position: {
          x: 45.94,
          y: 215.96
        },
        width: 138.89,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        verticalAlignment: 'bottom',
        alignment: 'center',
        fontColor: '#0024b3'
      },
      'phone_home-3': {
        type: 'text',
        position: {
          x: 57.35,
          y: 230.2
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        fontColor: '#0024b3'
      },
      'phone_cell-3': {
        type: 'text',
        position: {
          x: 103.39,
          y: 230.2
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      },
      'phone_other-3': {
        type: 'text',
        position: {
          x: 154.92,
          y: 230.43
        },
        width: 32.8,
        height: 6.12,
        fontSize: 12,
        fontName: 'Roboto',
        alignment: 'center',
        verticalAlignment: 'bottom',
        characterSpacing: 0.5,
        fontColor: '#0024b3'
      }
    }
  ],
  basePdf:
    'data:application/pdf;base64,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UgovQ29udGVudHMgMjggMCBSCi9QYXJlbnQgMiAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL1Jlc291cmNlcyAyOSAwIFIKL0NvbnRlbnRzIDMwIDAgUgovUGFyZW50IDIgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgNCAwIFJdCi9Db3VudCAyCj4+CmVuZG9iagoxIDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMzEgMCBvYmoKPDwKL1Byb2R1Y2VyIChpTG92ZVBERikKL01vZERhdGUgKEQ6MjAyMzA4MjQwOTI0MjZaKQo+PgplbmRvYmoKeHJlZgowIDMyCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAzMDgxMiAwMDAwMCBuDQowMDAwMDMwNzQ5IDAwMDAwIG4NCjAwMDAwMzA1MzggMDAwMDAgbg0KMDAwMDAzMDY0MyAwMDAwMCBuDQowMDAwMDI4MTI4IDAwMDAwIG4NCjAwMDAwMjgwOTUgMDAwMDAgbg0KMDAwMDAwMDAxNSAwMDAwMCBuDQowMDAwMDA4MzExIDAwMDAwIG4NCjAwMDAwMDgwMzggMDAwMDAgbg0KMDAwMDAwMjcyNyAwMDAwMCBuDQowMDAwMDE3NTQyIDAwMDAwIG4NCjAwMDAwMTcyOTIgMDAwMDAgbg0KMDAwMDAwODczOCAwMDAwMCBuDQowMDAwMDIxNDQ1IDAwMDAwIG4NCjAwMDAwMjA5MDEgMDAwMDAgbg0KMDAwMDAxNzk1NCAwMDAwMCBuDQowMDAwMDIxMTUwIDAwMDAwIG4NCjAwMDAwMjI4MzUgMDAwMDAgbg0KMDAwMDAyMjU2OSAwMDAwMCBuDQowMDAwMDIxNjA4IDAwMDAwIG4NCjAwMDAwMjQ2MzMgMDAwMDAgbg0KMDAwMDAyNDA3MyAwMDAwMCBuDQowMDAwMDIzMTQwIDAwMDAwIG4NCjAwMDAwMjQzMzggMDAwMDAgbg0KMDAwMDAyNzY5OSAwMDAwMCBuDQowMDAwMDI3NDQ4IDAwMDAwIG4NCjAwMDAwMjQ4MDAgMDAwMDAgbg0KMDAwMDAyODI4MyAwMDAwMCBuDQowMDAwMDMwMDkwIDAwMDAwIG4NCjAwMDAwMzAxODYgMDAwMDAgbg0KMDAwMDAzMDg2MSAwMDAwMCBuDQp0cmFpbGVyCjw8Ci9TaXplIDMyCi9Sb290IDEgMCBSCi9JbmZvIDMxIDAgUgovSUQgWzw4Nzk0Q0YwREEwRUMyQjQwNTg4NDY4MzFEQTQzQjIzRD4gPDRFRUY0NTA1QkE4OEJDMjQyRDY0OEQyREFGRTRCNDA4Pl0KPj4Kc3RhcnR4cmVmCjMwOTMzCiUlRU9GCg=='
}

const inputs = [
  {
    owner: 'https://pdfme.com/',
    'healthcare_agent-1': 'healthcare_agent-1',
    'dob-1': '12/12/2024',
    'drivers_license-1': 'drivers_license-1',
    'property_address-1': 'property_address-1',
    'phone_home-1': 'phone_home-1',
    'phone_cell-1': 'phone_cell-1',
    'phone_other-1': 'phone_other-1',
    'healthcare_agent-2': 'healthcare_agent-2',
    'dob-2': '12/12/2024',
    'drivers_license-2': 'drivers_license-2',
    'property_address-2': 'property_address-2',
    'phone_home-2': 'phone_home-2',
    'phone_cell-2': 'phone_cell-2',
    'phone_other-2': 'phone_other-2',
    'healthcare_agent-3': 'healthcare_agent-3',
    'dob-3': '12/12/2024',
    'drivers_license-3': 'drivers_license-3',
    'property_address-3': 'property_address-3',
    'phone_home-3': 'phone_home-3',
    'phone_cell-3': 'phone_cell-3',
    'phone_other-3': 'phone_other-3'
  }
]

const designer = new Designer({ domContainer, template })
const form = new Form({ domContainer, template, inputs })

generate({ template, inputs: form.getInputs() }).then((pdf) => {
  const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
  window.open(URL.createObjectURL(blob))
  console.log(pdf)
})