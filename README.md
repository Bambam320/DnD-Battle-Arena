
# Dungeon and Dragons Battle Arena

This is a single-page application that allows the user to look through all the spells offered in the Dungeon and Dragons game. The spells can be added to pre-made characters available in the App or a newly created character, by the user. The characters can be placed in the arena where they will duke it out until there is only one victor. Spells can be created or chosen from a list and added to a character to give them a better chance at winning. A spell can also be created without adding it to a character. Each character can be deleted or have its attributes updated.
  
## Table of Contents


- [Features](#Features)

- [Installation](#installation)

- [Usage](#usage)

- [Description](#Description)

- [Instructional-GIF](#Instructional-GIF)

- [Video-Describing-Functionality](#Video-Describing-Functionality)

- [Credits](#Credits)

- [License](#License)

- [Badges](#Badges)

  

## Features


1. The home page is basic with just an informative message describing some of the functions of the website.

2. The character page offers a list of all characters in the database. Each character displays several different attributes pertaining to that character. There are 4 buttons available for each character card, the fighter and the opponent in the arena may be set as such and their information is displayed in the NavBar along with their attack points. There is a delete button which deletes that character and an update button which creates a separate card filled with the current information for some of the attributes of the character in a form. This form can be altered and submitted to the character. The entire card is a link to a separate card which displays all of the spells that belong to that character.

3. The create a character page offers a small form that may be filled in with some attributes of a character. Upon submit that character will be randomly assigned some weapons and taught the "Acid Arrow" and "Acid Splash" spells. The character will be available in the characters page.

4. The create and add a spell page offers many functions. The first is that a spell may be created through a form where its damage and level could be provided. This spell may be submitted and will be added as an existing spell in the drop down menu below the spell form. The spell form may be used on its own or it may be used to add to a character upon submit. This requires selecting a character as your champion and selecting the "Add To Character" switch to on before submitting. The same is true when selecting a spell from the existing list of spells and selecting the "Add To Character" switch before pressing the submit button. This will add the existing spell to the character selected as the champion.

5. The fight page is straightforward. A champion and an opponent must be selected and they will be displayed along with a fight and reset button. The victor's card image will change to a funny winner gif and the losers card image will also change to a funny loser gif. The reset button displays the correct images to the cards again. The fight involves a great deal of chance because during the fight, the hit points of each character are multiplied by a random percentage which makes the fight more interesting.

## Installation

This SPA requires both a front and back end and for that reason, there are a few installation commands that need to be used to set the application up for use.

The first step after cloning the repository is to find the ```dndpedia_client``` directory and from within, run the command for installing the nodes using the following.
```js
$ npm install
```
It is built with the React framework and must be initialized by running the following command.
```js
$ npm start
```
The best method for setting up the back end requires opening a new terminal and preparing the backend first, by finding the ```dndpedia_server``` directory and from within running the bundle installation.
```rb
$ bundle install
```
OPTIONAL: Before running the server and using this SPA, consider seeding new spells and characters, there are already some records in the spells and characters tables. If you prefer, you may roll back the migrations and migrate them again. In this situation, run ```bundle exec db:rollback```, threefold to roll back the characters tables and fourfold to roll back the spells table as well. Once the table(s) have been cleared, run ```bundle exec db:migrate```. Now that the tables have been cleared, you may run the following command, ```bundle exec rake db:seed``` to seed the tables with spells and characters.

Last step, After the tables are sufficiently prepared for your purposes, run the following command in order to run a special gem called "rerun" that will listen for changes and utilize the ```dndpedia_server``` backend as the server for the front end. 
```rb
$ bundle exec rake server
```

Now you're ready to create characters, change their information, including their spells and send them to the arena.

Clone the repo [from Github here](https://github.com/Bambam320/phase-3-dndpedia-project)

  

## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

***SPA Component Tree***

The component tree includes an index file that attaches the react app to the DOM. Then an ```<App>``` component provides context and routing for all children's elements. The first is a ```<Background>``` component that places some imagery and title text on all pages. The next is the ```<NavBar>``` component that lists links and stores some information from the selected fighters. The next is the ```<Home>``` component which displays the main page with a title. The next is the ```<Characters>``` component which has children called ```<CharacterSpells>```, ```<UpdateCharacter>``` and ```<CharacterCards>``` these are reponsible for listing characters and when selected, their spells or a form to update them. The next is the ```<Spells>``` component which offers a form and drop down for creating or adding spells to a character. The next is the ```<CreateACharacter>``` component which offers a form to input attributes to a character that will be created. The last is the ```<Fight>``` component, which lists cards for both fighters and allows them to fight.
```
Index from the src folder
└── App from component folder
  ├── Background
  ├── NavBar
  ├── Home   
  ├── Characters
  |   └── CharacterCards
  |   └── CharacterSpells
  |   └── UpdateCharacter
  ├── Spells
  ├── CreateACharacter
  └── Fight
```
***Entity Relationship Model***

Each character in the schema has many spells and each spell belongs to a single character.

![](images/Entity_Relationship_Model.png  "Entity Relationship Model")

***Home Page***

![](images/Homepage.png  "Home Page Example")

The Home component renders via the link ```<Home>``` from the NavBar, the other components shown here are the ```<Background>``` and ```<NavBar>``` components. They are shown on every single page and are available to all components.
```
Index from the src folder
└── App from component folder
  ├── Background
  ├── NavBar
  ├── Home   
```

The ```<App>``` component provides routes to all the other main components in the app. The default path at ```"/"``` will display the NavBar component and unless there is a path after the default path, then the Home component will be rendered as well. The ```<App>``` will provide routes to all components and provides context to all components for the state of all characters, spells and the chosen opponent and fighter. It holds to effect functions that get all characters and all spells and set state with them. The fighter and opponent states are filled with default values until they are set with characters from other components.

```js
  //provides context for state declared above to all components and creates routes to match links that render the correct components
  return (
    <LoggedContext.Provider value={{ opponent, setOpponent, myFighter, setMyFighter, characters, setCharacters, spells, setSpells }}>
      <Background />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="characters/" element={<Characters />} >
            <Route path=":id/spells" element={<CharacterSpells />} />
            <Route path=":id/edit" element={<UpdateCharacter />} />
          </Route>
          <Route path="spells/" element={<Spells />} />
          <Route path="characters/new" element={<CreateACharacter />} />
          <Route path="characters/fight" element={<Fight />} />
        </Route>
      </Routes>
    </LoggedContext.Provider>
  )
};
```

The backend receives the ```GET``` requests and returns all spells as they are. The Get request calls the ```create_me_a_character_hash_with_spells``` which updates the characters ```attack_points``` and ```spell_points```, then poises all the characters including their spells as a ```JSON``` and returns it to the characters ```GET``` request and returns it back to the front end in ```JSON``` format.
```rb
  get '/characters' do
    characters = Character.create_me_a_character_hash_with_spells
    characters.to_json
  end

  get '/spells' do
    spells = Spell.all
    spells.to_json
  end
  
    def self.create_me_a_character_hash_with_spells
    all_characters = Character.all
    all_characters.each{ |char| char.update(attack_points: char.level * char.attack_points)}
    all_characters.each{ |char| char.update(spell_points: char.spells.map{ |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))}
    character_json = all_characters.as_json(include: :spells)
    character_json
  end
```
The Background component loads the background image and the title at the top of the page.

```js
  // sets the style of the background image
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  // returns the background image and a title that lives on every component of this SPA
  return (
    <div style={backgroundStyle}>
      <Container maxWidth={false} >
        <Typography className='gradient-text' variant='h3' style={{ fontWeight: '800', textAlign: 'center', marginBottom: '25px' }}>
          Dungeon & Dragons Battle Arena
        </Typography>
      </Container>
    </div>
  )
};
```
The ```<NavBar>``` component provides all the links for this SPA. It lists the currently selected fighter and opponent through the following example. The ```validFighter``` boolean lists the information about the selected fighter or lets the user know that now fighter has been selected. 

```js
        <List>
          {/* a ternary operator checks if there is a fighter selected and presents that information but if no fighter is selected, it says as much. */}
          <ListItem>
            <p className='characterFont'>{validFighter ?
              `Your champion: ${myFighter.card.name} has ${fighterHitPoints()} hit points` :
              `No champion has been selected`}
            </p>
          </ListItem>
          {/* A ternary operator to display the button based on a fighter being selected or not */}
          {validFighter ?
            <Button
              onClick={() => handleDeselect('champion')}
              style={{
                marginTop: '5px',
                borderRadius: 5,
                backgroundColor: "#ea2424",
                color: "white",
                padding: "10px 20px",
                fontSize: "11px",
                fontWeight: "bold"
              }}
            > Deselect Champion </Button> : <></>}
        </List>
```

***Characters page***

![](images/Characters.png  "Characters Page Example")

The Characters branch of the app.
```
  ├── Characters
  |   └── CharacterCards
  |   └── CharacterSpells
  |   └── UpdateCharacter
```
The Character branch of the app renders its child ```<CharacterCards>``` and provides each character held in state. It also handles the delete from the delete button from its child, ```<CharacterCards>```.

```js
  // function is passed back as props from CharacterCards, this updates the characters held in state to remove the user requested deleted character, then navigates
  // back to characters
  function handleDeleteCharacter(id) {
    const newCharacters = characters.filter((character) => character.id != id)
    setCharacters(newCharacters)
    navigate('/characters')
  }

  // lists a card for each character held in state, it passes card which represents each character and passes the delete function as props
  const listCharacters = characters.map((singleCharacter) => {
    return (
      <React.Fragment key={singleCharacter.id} >
        <Grid item={4}>
          <Charactercards card={singleCharacter} onDeleteCharacter={handleDeleteCharacter} />
        </Grid>
      </React.Fragment>
    )
  })

  // returns a container and grid for spacing then calls listCharacters to render a component for each card
  return (
    <>
      <Container style={{ margin: '-600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Grid container spacing={10} justifyContent="space-evenly" columnspacing={10}>
          {listCharacters}
        </Grid>
      </Container>
      <Outlet />
    </>
  )
};
```

The ```CharacterCards``` component takes each character from the ```<Character>``` component and lists all the pertinent attributes from the character's information; it also provides 5 buttons. The first is the entire card, which when clicked will link to the child ```<CharacterSpells>``` which displays all of the spells associated with the character. It is a nested link which renders from the app.

```js
///CharacterCards
<CardActionArea component={Link} to={`/characters/${char_id}/spells`}>
```

The next two buttons include the "Set As My Character" and "Set as Opponent" which take the current character and save them to the ```myFighter``` and ```opponent``` states to be used by other components such as ```<Fight>``` and ```<Spells>```.

```js
          <Button onClick={handleAddMainFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginTop: "10px", marginBottom: "20px" }}>
            Set As My Character
          </Button>
          <Button onClick={handleAddOpponentFighter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px" }}>
            Set As Opponent
          </Button>
```

The fourth button is the ```deleteCharacter``` button which fires the ```handleDeleteCharacter``` function that sends a ```DELETE``` request to the backend. The character of the id is then passed as a prop to the onDeleteCharacter function which updates state in the ```<Character>``` component. 

```js
          <Button onClick={handleDeleteCharacter} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold", marginBottom: "20px" }}>
            Delete This Character
          </Button>
          
          // fetches a delete url from sinatra to delete a character from the database, the returned JSON is not used and the onDeleteCharacter function is called
          function handleDeleteCharacter(e) {
            e.preventDefault()
            fetch(`http://localhost:9292/characters/${char_id}`, {
              method: "DELETE",
            });
            onDeleteCharacter(char_id)
          }
```
The fetch method to the backend is a ```DELETE``` action which destroys the character by finding it by its id.
```rb
  delete '/characters/:char_id' do
    character = Character.find(params[:char_id])
    character.destroy
  end
```

The last button is the "Update This Character" button which is a link that renders ```<UpdateCharacter>```. That provides a form to update the character and passes the character's id as a prop.

```js
      <Button component={Link} to={`/characters/${char_id}/edit`} style={{ borderRadius: 5, backgroundColor: "#21b6ae", color: "white", padding: "10px 20px", fontSize: "11px", fontWeight: "bold" }}>
        Update This Character
      </Button>
```

The update character component uses a submit function to provide a ```PATCH``` request to the backend, the entire character is sent which holds the selected character in a controlled form updated as a user enters information into the fields. The returned character is used to update all the characters held in state, and the currently selected fighter. It also updates the characters spell points.

```js
  function handleSubmit(e) {
    e.preventDefault();
    let server = `http://localhost:9292/characters/${char_id}`
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character)
    }
    fetch(server, patch)
      .then((r) => r.json())
      .then((patchedCharacter) => {
        const updatedCharacter = { ...patchedCharacter }
        updatedCharacter.spell_points = patchedCharacter.spells.reduce((acc, val) => {
          return acc += val.level * val.damage * val.description.length / 8
        }, 0)
        updatedCharacter.attack_points = updatedCharacter.level * updatedCharacter.attack_points
        setMyFighter({ card: updatedCharacter })
        let updatedCharacters = characters.map((eachCharacter) => {
          if (eachCharacter.id === patchedCharacter.id) {
            return updatedCharacter
          } else {
            return eachCharacter
          }
        });
        setCharacters(updatedCharacters)
      });
  }
```
The backend receives the updated attributes through parameters, finds the character by its ```[:char_id]``` and uses active record to update those new parameters. The returned character includes all spells in that character.
```rb
  patch '/characters/:char_id' do
    character = Character.find(params[:char_id])
    character.update(
      name: params[:name],
      pet: params[:pet],
      level: params[:level],
      city: params[:city],
      avatar_url: params[:avatar_url],
      language: params[:language]
    )
    character.to_json(include: :spells)
  end
```

***Create A Character page***

![](images/Create_A_Character.png  "Create A Character Example")

The Create a Character component.
```
  ├── CreateACharacter
```
The ```<CreateACharacter>``` component renders a small form with 6 inputs that allow the user to input character attributes including, name and level. Level is actually used in computing a character's hit points. The ```handleSubmit``` function provides a ```POST``` request to the backend and has the new character returned. It then adds it to state holding all characters. Then it resets the form values and navigates back to characters after 2 seconds.

```js
  // a post request to active record with the formValues for the new character returns the new character from the database and adds to current state for characters
  function handleSubmit(e) {
    e.preventDefault();
    const server = 'http://localhost:9292/characters'
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    fetch(server, post)
      .then((r) => r.json())
      .then((returnedCharacter) => {
        setCharacters([...characters, returnedCharacter])
        setFormValues(defaultValues)
        setTimeout(navigate('/characters'), 2000)
      });
  };
```

The back end receives the request and sends the params to ```create_me_a_brand_new_character``` which uses the ```Faker``` ruby gem to fill all the other data for the character. This includes the weapons and other DnD terminology. It also adds a couple of spells and calculates both the characters ```attack_points``` and ```spell_points```. This is used in determining a winner for the fight. It returns the new character in ```JSON``` format. 

```rb
  post '/characters' do 
    new_character = Character.create_me_a_brand_new_character(params)
    new_character.to_json
  end
  
    def self.create_me_a_brand_new_character params
    level = params[:level]
    melee_weapon = Faker::Games::DnD.melee_weapon
    melee_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{melee_weapon.downcase.gsub(" ", "-")}"
    melee_weapon_json = JSON.parse(melee_weapon_source)
    melee_weapon_power = melee_weapon_json["range"].values[0] * melee_weapon_json["weight"]
    ranged_weapon_location = Faker::Games::DnD.ranged_weapon
    ranged_weapon = ranged_weapon_location == "Crossbow" || ranged_weapon_location == "Boomerang" ? "Blowgun" : ranged_weapon_location
    ranged_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{ranged_weapon.downcase.gsub(" ", "-")}"
    ranged_weapon_json = JSON.parse(ranged_weapon_source)
    ranged_weapon_power = ranged_weapon_json["range"].values[1] * ranged_weapon_json["weight"]
    new_character = Character.create(
      name: params[:name],
      alignment: Faker::Games::DnD.alignment,
      background: Faker::Games::DnD.background,
      city: params[:city],
      c_lass: Faker::Games::DnD.klass,
      language: params[:language],
      melee_weapon: melee_weapon,
      pet: params[:pet],
      race: Faker::Games::DnD.race,
      ranged_weapon: ranged_weapon,
      level: level,
      attack_points: ranged_weapon_power * melee_weapon_power * level.to_i,
      spell_points: 0,
      avatar_url: params[:avatar_url],
    )
    new_character.spells << Spell.find(1)
    new_character.spells << Spell.find(2)
    new_character.update(spell_points: new_character.spells.map{ |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))
    new_character
  end
```

***Spells page***

![](images/Spells.png  "Spells Page Example")

The Spells page of the app.
```
	├── Spells
```

The ```<Spells>``` component offers a lot of functionality. It will process a ```POST``` to spells without adding it to a character. It will ```POST``` a spell to the spells table while adding it to a character. It will also ```PATCH``` a character with a spell selected from existing spells, provided from the state held spells.

The ```handleSubmit``` function below creates variables holding the ```PATCH``` or ```POST``` objects, server URLs and the switch statement and ternary operator selects which to use based on user input. If the form is used, the ```POST``` will be fired, if the existing spell is selected, the ```PATCH``` is fired. Also, the user can select to add a spell to a character. The returned spell is then added to spells held in state or updates the champion and characters state by adding the spell to the character selected.

```js
  function handleSubmit(e) {
    e.preventDefault();

    // Variables for the selected character, post and patch server address
    let char_id = myFighter.card.id
    const postToSpellsServer = `http://localhost:9292/spells`
    const postToCharServer = `http://localhost:9292/spells/${char_id}/characters`
    const patchServer = `http://localhost:9292/characters/${char_id}/spells`

    // definitions for post and patch objects
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues)
    }
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chosenSpell)
    }

    // ternary that will always post the fetch unless the user has been selected to add a character and some information exists in the create a spell form
    // switch statement that will provide the correct RESTful url depending on whether its a post with or without a character or a patch
    let postOrPatch = addToCharacter && !select ? patch : post
    let server = ''
    switch (true) {
      case addToCharacter && !select:
        server = patchServer;
        break;
      case addToCharacter && !textField:
        server = postToCharServer;
        break;
      default:
        server = postToSpellsServer;
    }

    // function for updating the spell power of the updated character and setting the my fighter state with it
    function updateTheCharacter(character, spell) {
      const updatedCharacter = { ...character, spells: [...character.spells, spell] }
      updatedCharacter.spell_points = character.spells.reduce((acc, val) => {
        return acc += val.level * val.damage * val.description.length / 8
      }, 0)
      setMyFighter({ card: updatedCharacter })
      return updatedCharacter
    }

    // The address and object are filled in based on logic
    fetch(server, postOrPatch)
      .then((r) => r.json())
      .then((spell) => {

        // the patch returns the spell and it updates characters along with updating the spell_points by reducing the new values from the spells array
        if (addToCharacter && !select) {
          let updatedCharacters = characters.map((character) => {
            if (character.id === spell.character_id) {
              return updateTheCharacter(character, spell)
            } else {
              return character
            }
          })
          setCharacters(updatedCharacters)

          // the post returns the spell and it updates the state held spells, resets formValues and updates characters, using the updateTheCharacter function
          // it updates the spell power of the updated character
        } else if (addToCharacter && select) {
          setSpells([...spells, spell])
          setFormValues(defaultValues)
          let updatedCharacters = characters.map((character) => {
            if (character.id === char_id) {
              return updateTheCharacter(character, spell)
            } else {
              return character
            }
          })
          setCharacters(updatedCharacters)

          // posts a new spell to the database from the form provided on the page
        } else {
          setSpells([...spells, spell])
          setFormValues(defaultValues)
        }
      });
  };
```

The backend will receive the spell parameters for the ```POST``` requests and call the ```create_me_a_spell``` method from the Spell model which returns the newly recorded spell after its attributes have been added to the database including the ```character_id``` which is set from the champion selected in the front end as required.

```rb
  post '/spells' do
    created_spell = Spell.create_me_a_spell(params)
    created_spell.to_json
  end
  
    def self.create_me_a_spell params
    if params[:char_id].to_i == 0
      params[:character_id] = nil
    else
      params[:character_id] = params[:char_id]
    end
    puts 'from spell.rb params', params
    new_spell = Spell.create(
      name: params[:name],
      description: params[:description],
      range: params[:range],
      material: params[:material],
      duration: params[:duration],
      casting_time: params[:casting_time],
      level: params[:level],
      damage: params[:damage],
      character_id: params[:character_id]
    )
    new_spell
  end
```
The ```POST``` for a new spell added to a character finds that character and adds the new spell as an association to that character.

The ```PATCH``` adds an existing spell to a character by adding that character's id to the spells table as aa foreign key.

```rb
  # This post to the spells table will create a spell and attach it to the provided character id by association
  # This returns the newly created spell back to the frontend
  post '/spells/:char_id/characters' do
    character = Character.find(params[:char_id])
    created_spell = Spell.create_me_a_spell(params)
    created_spell.to_json 
  end

  # finds the character provided by react and shovels the existing spell into that characters spells array and returns the new spell including the
  # character id
  patch '/characters/:char_id/spells' do
    character = Character.find(params[:char_id])
    spell = Spell.find(params[:id])
    character.spells << spell
    spell.to_json
  end
```

***Fight page***

![](images/Fight.png  "Fight Page Example")

The Fight page of the app.
```
	├── Fight
```
The ```<Fight>``` component renders a couple of cards for each fighter and opponent and offers a "Fight" and "Reset" button which puts the selected challengers against each other and offers a victor in the form of a gif depicting a winner or a loser. Below is the ```handleFight``` function which determines the winner and changes that characters ```avatar_url``` attribute to a gif.
```js
  function handleFight(e) {
    e.preventDefault()
    if (((champion.card.spell_points + champion.card.attack_points) * Math.random()) > ((opponent.card.spell_points + opponent.card.attack_points) * Math.random())) {
      setChampion({ ...champion, card: { ...champion.card, avatar_url: "https://media.tenor.com/BA4S2y58lbEAAAAS/chris-farley-academy-awards.gif" } })
      setChallenger({ ...challenger, card: { ...challenger.card, avatar_url: "https://media.tenor.com/eTqdoJ96YP4AAAAM/failure-fail.gif" } })
    } else {
      setChampion({ ...champion, card: { ...champion.card, avatar_url: "https://media.tenor.com/eTqdoJ96YP4AAAAM/failure-fail.gif" } })
      setChallenger({ ...challenger, card: { ...challenger.card, avatar_url: "https://media.tenor.com/BA4S2y58lbEAAAAS/chris-farley-academy-awards.gif" } })
    }
  }
```



## Description


- The Faker gem offered in Ruby is one of my favorite, incorporating it into this project was step 1. It is used to fill in information about characters in the SPA. Mostly for fantastical sounding names and background information. The seed file is filled with the use of this gem. 

- The DnD API that was used to provide information about a character's weapons. This added some difficulty in the way the front end was coded. The backend uses the api to grab all spells and weapon information for the character. This information is then updated to state while the attack and spell power of each character is updated by multiplying each spells level and damage power. There were a lot of learning opportunites because of this added functionality.

- This SPA uses the Material UI framework which makes it the best-looking website that I have ever created, since the last one. I used some of the readily available examples from the Material ui docs and altered some of them because I needed additional styling or functionality. Using the API docs for components to obtain the correct props was a great learning experience.

- This SPA uses two separate GET requests to the backend, each returning all of the characters with their associated spells or all spells. There are three POST requests, the first two allow the user to enter information about a spell or character. The new spell or character uses the data input by the user to create the new instance and record but it also fetches information from the dnd API to give a user and character actual values in their total attack power. The third is a POST request to the spells table but the url includes the "characters" as a resource, so the structure would be resource/identifier/resource.

- There are two PATCH requests, both to characters. The general request to the "/characters/id" url may have the attributes of that character changed and saved to the table. The specific patch to the "/characters/id/spells" url will only add an existing spell to a characters spells.

## Instructional-GIF

***Create a Character***

![](https://media.giphy.com/media/1wEa9ED3VG0bSLwUKf/giphy.gif)

***Set a character as challenger or delete them***

![](https://media.giphy.com/media/ZST0K2MMA36sLtDxgw/giphy.gif)

***Add an existing spell to a character***

![](https://media.giphy.com/media/KjYIHKs9qFTuwSID10/giphy.gif)

***Update a character***

![](https://media.giphy.com/media/vtodu4IVIwXXTTlDeV/giphy.gif)

***List each characters spells***

![](https://media.giphy.com/media/dR0PYWVoO1BbfJahs7/giphy.gif)

***Create a new spell***

![](https://media.giphy.com/media/Y8a2peA7EtBwCY3dac/giphy.gif)

***Create a new spell and add it to a character***

![](https://media.giphy.com/media/JOG1g2CX9k6Itp0TdX/giphy.gif)

***Character battle arena***

![](https://media.giphy.com/media/VeduDaJLcuiI2ikkOB/giphy.gif)



## Video-Describing-Functionality

    
   [![Watch the video](https://i.imgur.com/bWUcmyd.png)](https://youtu.be/eUogGOHnCl4)

  

## Credits

This project uses the free API from D&D 5e API - The 5th Edition Dungeons and Dragons API [dnd5eapi](https://www.dnd5eapi.co/api)



## License

MIT License
Copyright (c) 2022 Igor M.  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, E ,AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGE, S OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TOR  ,T OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  

## Badges

  

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-3-dndpedia-project)

