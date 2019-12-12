export const createNotification = (content, timeout) => {
  return async dispatch => {
    await setTimeout(() => {
      clearNotification()
    }, timeout)
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message: content
      },
    })
  }
}
export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {
      message: ''
    },
  }
}