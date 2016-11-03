const $ = jQuery;

var logoDownlaod = {

  init($element) {
    this.$el = $element;
    this.attachEvent();
  },

  attachEvent() {
    this.$el.contextmenu($.proxy(function(event) {
      if (event.which === 3) {
        event.preventDefault();
        this.showLayer();
      }
    }, this));
  },

  showLayer() {
    // visualizzo il layer
    $('#downloadLogo').openModal();
  }


};

export default logoDownlaod;
