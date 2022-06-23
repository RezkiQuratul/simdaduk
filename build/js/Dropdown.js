const Dropdown = (($) => {

  const NAME               = 'Dropdown'
  const DATA_KEY           = 'lte.dropdown'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Selector = {
    DROPDOWN_MENU: 'ul.dropdown-menu',
    DROPDOWN_TOGGLE: '[data-toggle="dropdown"]',
  }

  const ClassName = {
    DROPDOWN_HOVER: '.dropdown-hover'
  }

  const Default = {
  }


  class Dropdown {
    constructor(element, config) {
      this._config  = config
      this._element = element
    }

    // Public

    toggleSubmenu() {
      this._element.siblings().show().toggleClass("show");

      if (! this._element.next().hasClass('show')) {
        this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide();
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show").hide();
      });

    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data      = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Dropdown($(this), _config)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'toggleSubmenu') {
          data[config]()
        }
      })
    }
  }

  $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')
  });

  $.fn[NAME] = Dropdown._jQueryInterface
  $.fn[NAME].Constructor = Dropdown
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Dropdown._jQueryInterface
  }

  return Dropdown
})(jQuery)

export default Dropdown
