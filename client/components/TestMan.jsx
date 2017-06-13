

import React from 'react'
import Element from './Element.jsx'
import ChartStore from '../stores/ChartStore';

export default class App extends React.Component {
  constructor(){
    super()

    this.state = {
      elements: []
    }
  }

  componentDidMount() {
    ChartStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ChartStore.unlisten(this.onChange);
  }

  getInitialState() {
    return ChartStore.getState();
  }

  onChange(elements) {
    this.setState({
      elements: elements
    });
  }

	render() {
    return (
       <div style={{paddingTop: '100px'}}>
        {elements.map((element) => 
          (
            <div key={element.id}>
              <Element element={element} types={[]}
              />
            </div>
          )
        )}
       </div>
    );
  }

  onReset = () => {
  	console.log(this.props.store.elements[0].end)
  }
}