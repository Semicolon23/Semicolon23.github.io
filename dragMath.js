
var correctCards = 0;
$( init );

function init() {

  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  var terms = ['Why did the scarecrow get a promotion?', 'Why is 6 afraid of 7?', 'What is love?', 'What is the air speed velocity of an unladen swallow?', 'What is my favorite color?', 'Why do they fence in graveyards?', 'What is the last letter of the Greek alphabet', 'What US state flag does the Chiliation flag resemble?', 'Guess what my favorite joke is', 'Guess what my second favorite joke is' ];
  <!--numbers.sort( function() { return Math.random() - .5 } );-->

  for ( var i=0; i<10; i++ ) {
    $('<div>' + terms[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {

      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  shuffle(numbers);
  shuffle(terms);

  // Create the card slots
  var words = [ 'He was outstanding in his field. HAHAHAHA', '7 was a registered six offender', 'Baby dont hurt meee', 'Is it African or European? HAHAHA', 'Blue', 'People are always dying to get in', 'Omega', 'The state of Texas', 'You', 'Prefix operators' ];
  for ( var i=1; i<=10; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}
function shuffle(a){
  var j,x,i;
  for (var i = 0; i < a.length; i++) {
    j = Math.floor(.36 * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  }


  if ( correctCards == 10 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }
}
