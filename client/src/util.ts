export function makeTimeId() {
  const d = new Date()
  return `\
${d.getFullYear()}\
${String(d.getMonth()).padStart(2, '0')}\
${String(d.getDate()).padStart(2, '0')}\
${String(d.getHours()).padStart(2, '0')}\
${String(d.getMinutes()).padStart(2, '0')}\
${String(d.getSeconds()).padStart(2, '0')}`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
