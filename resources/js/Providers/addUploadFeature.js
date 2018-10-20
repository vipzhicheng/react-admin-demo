/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.rawFile)

    reader.onload = () => resolve({ src: reader.result, title: file.title })
    reader.onerror = reject
  })

// new Promise((resolve, reject) => {
//   const reader = new FileReader()
//   reader.readAsArrayBuffer(file.rawFile)

//   reader.onload = () => resolve({ binary: reader.result, title: file.title })
//   reader.onerror = reject
// })

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
  if ((type === 'CREATE' || type === 'UPDATE') && resource === 'media') {
    if (params.data.files && params.data.files.length) {
      // only freshly dropped pictures are instance of File
      // const formerPictures = params.data.files.filter(p => !(p.rawFile instanceof File))
      const newPictures = params.data.files.filter(p => p.rawFile instanceof File)

      const form = new FormData()
      for (let key in params.data) {
        if (key !== 'files') {
          form.append(key, params.data[key])
        } else {
          newPictures.map(file => {
            console.log(file)
            form.append('files[]', file.rawFile)
          })
        }
      }
      return requestHandler(
        type,
        resource,
        {
          ...params
        },
        {
          body: form
        }
      )
    }
  }
  // for other request types and reources, fall back to the defautl request handler
  return requestHandler(type, resource, params)
}

export default addUploadFeature
