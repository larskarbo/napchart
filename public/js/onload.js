$(document).ready(function(){
$(window).on('popstate', function(event) {
    var state = event.originalEvent.state;

    if (state) {
        selectColor( state.selectedColor );
    }
});

});