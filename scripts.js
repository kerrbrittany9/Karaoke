const chorus = "HEROES, By David Bowie, I... I will be king, And you... you will be queen, Though nothing... will drive them away, We can beat them... just for one day, We can be heroes... just for one day, And you... you can be mean, And I... I\'ll drink all the time, \'Cause we\'re lovers... and that is a fact, Yes we\'re lovers... and that is that, Though nothing... will keep us together, We could steal time... just for one day, We can be heroes... forever and ever, What\'d you say?, I... I wish you could swim, Like the dolphins... like dolphins can swim, Though nothing... nothing will keep us together, We can beat them... forever and ever, Oh we can be heroes... just for one day, I... I will be king, And you... you will be queen, Though nothing... will drive them away, We can be heroes... just for one day, We can be us... just for one day, I... I can remember (I remember), Standing... by the wall (by the wall), And the guns... shot above our heads (over our heads), And we kissed... as though nothing could fall (nothing could fall), And the shame... was on the other side, Oh we can beat them... forever and ever, Then we could be heroes... just for one day, We can be heroes, We can be heroes, We can be heroes, Just for one day, We can be heroes, We\'re nothing... and nothing will help us, Maybe we\'re lying... then you better not stay, But we could be safer... just for one day, Oh-oh-oh-ohh, oh-oh-oh-ohh, just for one day";

const chorusArray = chorus.split(',');
let position = 0;

const initialState = {
  chorus: chorus,
  chorusArray: chorusArray,
  arrayPosition: position,
  currentPhrase: chorusArray[position]
}

//Reducer
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newPosition =state.arrayPosition + 1;
      newState ={
        chorus:state.chorus,
        chorusArray: state.chorusArray,
        arrayPosition: newPosition,
        currentPhrase: state.chorusArray[newPosition]
      }
      return newState;
    case 'RESTART_SONG':
    newState = {
      chorus: state.chorus,
      chorusArray: state.chorusArray,
      arrayPosition: 0,
      currentPhrase: state.chorusArray[0]
    }
    return newState;
    default:
      return state;
  }
}

const { expect } = window;

//Unit Tests

expect(
  reducer(initialState, { type: null })
).toEqual(initialState);

expect(
  reducer(initialState, { type: 'NEXT_LYRIC' })
).toEqual({
  chorus: chorus,
  chorusArray: chorusArray,
  arrayPosition: 1,
  currentPhrase: chorusArray[1]
});

expect(
  reducer({
    chorus: chorus,
    chorusArray: chorusArray,
    arrayPosition: 0,
    currentPhrase: chorusArray[0]
  }, { type: 'RESTART_SONG' })
).toEqual(initialState);

const { createStore } = Redux;
const store = createStore(reducer);

const render = () => {
  document.getElementById('words').innerHTML = store.getState().currentPhrase;
}

window.onload = function() {
  render();
}

const userClick = () => {
  const checkState = store.getState();
  if (checkState.arrayPosition === checkState.chorusArray.length- 1) {
  store.dispatch({ type: 'RESTART_SONG' });
  } else {
  store.dispatch({ type: 'NEXT_LYRIC'} );
  }
}

store.subscribe(render);
