import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert'

const App = () => {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");

    const APP_ID = 'da1d81a9'
    const APP_KEY='aa44b86219a04658cd76528ae58f2c66'

    const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`

    const getData = async () => {
        if(search !== "" ){
            const results = await Axios.get(url);
            if(!results.data.more) {
                return setAlert('No results found');
            }
            setRecipes(results.data.hits);
            setAlert("");
            setSearch('');
        }else {
            setAlert("Please fill in the seach bar")
        }

    };

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    };


    return (
        <div className="App">
            <h1>Easy Cook</h1>
            <form className="search-form" onSubmit={onSubmit}>
                {alert !== "" && <Alert alert={alert} />}
                <input type="text" placeholder="Search for Food..." 
                autoComplete="off" onChange={onChange}  
                value={search}
                />
                <input type="submit" value="search" />
            </form>
            <div className="recipes">
                {recipes !== [] &&
                recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
            </div>
        </div>
    )
}

export default App
