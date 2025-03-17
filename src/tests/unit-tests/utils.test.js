const { validateCsvFilenameFormat, getCsvUploadId } = require('../../utils/csvUtils');

describe('validate filename format', () => {
  const validFilename = 'time-report-123'
  const invalidFilename = 'invalid-report-123'

  it('should validate a valid file name', () => {
    expect(validateCsvFilenameFormat(validFilename)).toBe(true)
  })

  it('should fail to validate an invalid file name', () => {
    expect(validateCsvFilenameFormat(invalidFilename)).toBe(false)
  })
})

describe('get csv ID', () => {
  const fileId = 123
  const filename = `time-report-${fileId}`

  it('should retrieve the ID from the csv file', async () => {
    expect(getCsvUploadId(filename)).toBe(fileId)
  });
})