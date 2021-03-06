console.clear();

const elApp = document.querySelector('#app');
const elAlbumSmall = document.querySelector('[data-view="feed"] .ui-animation.-current');
const elAlbumLarge = document.querySelector('[data-view="closeup"] .ui-animation.-current');
const elItem = document.querySelector('.player-item.-primary');
const losBackButtons = document.querySelectorAll('[data-back]');

const machine = {
  initial: elApp.dataset.state, //'feed',
  states: {
    feed: {
      on: {
        ALBUM: 'closeup' } },


    closeup: {
      on: {
        ALBUM: 'details',
        BACK: 'feed' } },


    details: {
      on: {
        TURNTABLE: 'player',
        BACK: 'closeup' } },


    player: {
      on: {
        BACK: 'details' } } } };





let currentState = machine.initial;

const lasVistas = document.querySelectorAll('[data-view]');

const flipping = new Flipping({
  duration: 600,
  delay: 0,
  activeSelector: el => el.matches('[data-active="true"] *') });


function showCurrentState(state, prevState) {
  flipping.read();
  elApp.dataset.state = state;

  Array.from(lasVistas).forEach(view => {
    if (view.matches(`[data-view="${state}"]`)) {
      view.dataset.active = true;
    } else {
      delete view.dataset.active;
    }
  });

  flipping.flip();
}

function send(event) {
  elApp.dataset.prevState = currentState;
  const nextState = machine.states[currentState].on[event];

  if (!nextState) return;

  showCurrentState(nextState);
  currentState = nextState;
}

elApp.dataset.state = currentState;
showCurrentState(currentState);

// Events
elAlbumSmall.addEventListener('click', () => {
  send('ALBUM');
});

elAlbumLarge.addEventListener('click', () => {
  send('ALBUM');
});

elItem.addEventListener('click', () => {
  send('TURNTABLE');
});

Array.from(losBackButtons).forEach(backButton => {
  backButton.addEventListener('click', () => {
    send('BACK');
  });
});