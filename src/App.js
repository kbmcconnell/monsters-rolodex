import {Component} from 'react';

import CardList from './components/card-list/CardList.component';
import SearchBox from './components/search-box/SearchBox.component';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // this state is always a json object
    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      // whatever is returned from the above json will be passed into the users below
      .then((users) => this.setState(() => {
        return {monsters: users}
      }
      ))
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()
    this.setState(() => {
      return {searchField}
    })
  }

  render() {
    // these two consts allow us to remove the 'this.state' from the state references
    const { monsters, searchField } = this.state
    const { onSearchChange } = this
    // we know we have an array of monsters [ { name: 'Kriston' }, { name: 'Mash' } ]
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    return (
      <div className="App">
        <h1 className='app-title'>MONSTERS</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='monsters-search-box' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
