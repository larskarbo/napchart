const types = (state = [], action) => {
  return {
  	0: {
  		id:0,
  		name:'Work',
  		style:'blue',
  		lane:1
  	},
  	1: {
  		id:0,
  		name:'Sleep',
  		style:'green',
  		lane:2
  	}
  }
}

export default types