export const getResponse = (
    data = {},
    status = 'success',
    errors = [{
      code: 0,
      customData: null,
      message: 'server error'
    }]
) => {
  return JSON.stringify({
    data,
    status,
    errors,
  })
}
