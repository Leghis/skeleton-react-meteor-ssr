const Reducers = (state = [{name:'Ayina', surname:'Maerik'}], action)=>{
  switch (action.type) {
    case 'GET_CONTACTS':
      // let d = {name:'Ayina', surname:'Maerik'}
      // state.push(d)
      return state
  }
}

export default Reducers
