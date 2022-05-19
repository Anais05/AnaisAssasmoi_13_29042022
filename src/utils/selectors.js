
export const isLogged = (state) => {
	return state.login.data !== null
}

export const loginError = (state) => {
	return state.login.error
}

export const getTokken = (state) => {
	return state.login.data?.token
}

export const getUserName = (state) => {
	return {
    firstName: state.user.data?.firstName,
		lastName: state.user.data?.lastName
  }
}
