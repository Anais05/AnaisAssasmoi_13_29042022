
export const isLogged = (state) => {
	return state.login.data !== null
}

export const getTokken = (state) => {
	return state.login.data?.token
}

export const getUser = (state) => {
	return {
    firstName: state.user.data?.firstName,
		lastName: state.user.data?.lastName,
    email: state.user.data?.email,
  }
}
