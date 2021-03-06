let about, addClass, append, attr, children, css, dropdownOpenStatus, each, empty, find,
hide, height, html, on, off, parent, remove, removeClass, show, width;

let $clickHere, $definition, $dropdownArea, $dropdownButton,
$dropdownMenu, $exampleButton, $lockButton, $moveableBox,
$sections, $showItem;

const ADD_CLASS = "addClassExample";
const REMOVE_CLASS = "removeClassExample";
const EACH = "eachExample";
const HIDE = "hideExample";
const SHOW = "showExample";
const HEIGHT = "heightExample";
const WIDTH = "widthExample";
const HTML = "htmlExample";
const EMPTY = "emptyExample";
const REMOVE = "removeExample";
const ATTR = "attrExample";
const CSS = "cssExample";
const APPEND = "appendExample";
const CHILDREN = "childrenExample";
const PARENT = "parentExample";
const FIND = "findExample";

// For .off
const FIRST = "first-pos";
const SECOND = "second-pos";
const THIRD = "third-pos";
const FOURTH = "fourth-pos";
const FIFTH = "fifth-pos";
const SIXTH = "sixth-pos";

const changeDefinition = (html) => {
  $definition.html(html);
  $exampleButton = $j('.example-button');
  $exampleButton.on('click', playExample);
  $showItem = $j('#show-text');
  $showItem.hide();
  $clickHere = $j('#click-here');
  $clickHere.on('click', moveButton);
  $lockButton = $j('.lock-button');
  $lockButton.on('click', checkBox);
  $moveableBox = $j('#moveable-box');
  $moveableBox.on('mouseenter', changeButtonPosition);
};

const checkBox = (e) => {
  switch (e.currentTarget.innerHTML) {
    case "LOCK":
      $moveableBox.css('background-color', 'blue');
      $moveableBox.off('mouseenter');
      $lockButton.html('UNLOCK');
      return;
    case "UNLOCK":
      $moveableBox.css('background-color', 'red');
      $moveableBox.on('mouseenter', changeButtonPosition);
      $lockButton.html('LOCK');
      return;
    default:
      return;
  }
};

const changeButtonPosition = (e) => {
  switch (e.target.className) {
    case FIRST:
      $moveableBox.removeClass('first-pos');
      $moveableBox.addClass('second-pos');
      return;
    case SECOND:
      $moveableBox.removeClass('second-pos');
      $moveableBox.addClass('third-pos');
      return;
    case THIRD:
      $moveableBox.removeClass('third-pos');
      $moveableBox.addClass('fourth-pos');
      return;
    case FOURTH:
      $moveableBox.removeClass('fourth-pos');
      $moveableBox.addClass('fifth-pos');
      return;
    case FIFTH:
      $moveableBox.removeClass('fifth-pos');
      $moveableBox.addClass('sixth-pos');
      return;
    case SIXTH:
      $moveableBox.removeClass('sixth-pos');
      $moveableBox.addClass('first-pos');
      return;
    default:
      return;
  }
};

const checkHeader = () => {
  if (window.innerWidth < 960) {
    dropdownOpenStatus = false;
  } else if (window.innerWidth >= 960) {
    dropdownOpenStatus = true;
  }
};

const handleAttrButton = (button) => {
  if (button.attr('disabled')) {
    button.attr('disabled', false);
    button.html('BUTTON ENABLED');
  } else {
    button.attr('disabled', true);
    button.html('BUTTON DISABLED');
  }
};

const linkTo = (section) => {
  return () => {
    changeDefinition(section);
  };
};

const playExample = (e) => {
  switch (e.currentTarget.id) {
    case ADD_CLASS:
      $j('#text').addClass('red');
      return;
    case REMOVE_CLASS:
      $j('#sentence').removeClass('red');
      return;
    case EACH:
      $j('.to-li').each((el) => el.outerHTML = (`<li class="new-li">${el.innerHTML}</li>`));
      return;
    case HIDE:
      $j('.will-disappear').hide();
      return;
    case SHOW:
      $showItem.show();
      return;
    case HEIGHT:
    case WIDTH: {
      let $size = $j('.size');
      let $textarea = $j('.stretch');
      if (e.currentTarget.id === HEIGHT) {
        $size.html(` ${$textarea.height()}`);
      } else {
        $size.html(` ${$textarea.width()}`);
      }
      return;
    }
    case HTML: {
      const input = $j('#html-input').attr('value');
      $j('.change-html').html(input);
      return;
    }
    case EMPTY:
      $j('#will-empty').empty();
      return;
    case REMOVE: {
      const PARENS = "parens";
      const HELLO = "hello";
      const WORLD = "world";
      const $section = $j('.hello-world');
      let selection;
      $j('[name=rem-radio]').each((node) => {
        if (node.checked) {
          selection = node;
        }
      });
      switch (selection.id) {
        case PARENS:
          $section.remove();
          return;
        case HELLO:
          $section.remove('.hello');
          return;
        case WORLD:
          $section.remove('.world');
          return;
        default:
          return;
      }
    }
    case ATTR: {
      let $attrButton = $j('#attr-button');
      handleAttrButton($attrButton);
      return;
    }
    case CSS: {
      const $increaseFont = $j('#increase-font');
      let pixelFont = $increaseFont.css('font-size');
      let fontSize = parseInt(pixelFont.split('px')[0]);
      $increaseFont.css('font-size', `${fontSize + 2}px`);
      return;
    }
    case APPEND:
      $j('#add-lis').append("...and more", true);
      return;
    case CHILDREN:
      $j('#parent').children().css('color', 'blue');
      return;
    case PARENT:
      $j('.child').parent().css('border', 'none');
      return;
    case FIND:
      $j('#haystack').find('.needle').css('color', 'darkgrey');
      return;
    default:
      return;
  }
};

const moveButton = () => {
  switch ($clickHere.attr('classList').length) {
    case 1:
      $clickHere.addClass('middle-position');
      return;
    case 2:
      $clickHere.addClass('bottom-position');
      return;
    case 3:
      $clickHere.removeClass('middle-position');
      $clickHere.removeClass('bottom-position');
      return;
    default:
      return;
  }
};

const setClick = (queryObject, section) => {
  queryObject.on('click', linkTo(section));
};

const showDropdownButton = () => {
  $dropdownButton.addClass('open-dropdown');
};

const hideDropdownButton = () => {
  $dropdownButton.removeClass('open-dropdown');
};

const toggleDropdown = () => {
  switch (dropdownOpenStatus) {
    case true:
      $dropdownMenu.show();
      $definition.removeClass('shifted');
      return;
    case false:
      if (!$dropdownMenu.attr('className').includes('closed')) {
        $dropdownMenu.hide();
        $definition.removeClass('shifted');
      }
      return;
    default:
      return;
  }
};

const handleDropdown = () => {
  checkHeader();
  toggleDropdown();
};

const changeDropdown = () => {
  dropdownOpenStatus = dropdownOpenStatus === true ? false : true;
  toggleDropdown();
};

window.addEventListener("resize", handleDropdown);

document.addEventListener("DOMContentLoaded", () => {
  about = $j('#about').html();
  addClass = $j('#addClass').html();
  removeClass = $j('#removeClass').html();
  each = $j('#each').html();
  hide = $j('#hide').html();
  show = $j('#show').html();
  height = $j('#height').html();
  width = $j('#width').html();
  html = $j('#html').html();
  on = $j('#on').html();
  off = $j('#off').html();
  empty = $j('#empty').html();
  remove = $j('#remove').html();
  attr = $j('#attr').html();
  css = $j('#css').html();
  append = $j('#append').html();
  parent = $j('#parent').html();
  children = $j('#children').html();
  find = $j('#find').html();
  $dropdownMenu = $j('.function-list');
  $dropdownArea = $j('.dropdown-hover-area');
  $dropdownButton = $j('.close-dropdown-button');
  $dropdownArea.on('mouseenter', showDropdownButton);
  $dropdownArea.on('mouseleave', hideDropdownButton);
  $dropdownButton.on('click', changeDropdown);
  $dropdownButton.on('mouseenter', showDropdownButton);
  $dropdownButton.on('mouseleave', hideDropdownButton);
  setClick($j('#to-about'), about);
  setClick($j('#to-addClass'), addClass);
  setClick($j('#to-removeClass'), removeClass);
  setClick($j('#to-each'), each);
  setClick($j('#to-hide'), hide);
  setClick($j('#to-show'), show);
  setClick($j('#to-height'), height);
  setClick($j('#to-width'), width);
  setClick($j('#to-html'), html);
  setClick($j('#to-on'), on);
  setClick($j('#to-off'), off);
  setClick($j('#to-empty'), empty);
  setClick($j('#to-remove'), remove);
  setClick($j('#to-attr'), attr);
  setClick($j('#to-css'), css);
  setClick($j('#to-append'), append);
  setClick($j('#to-append'), append);
  setClick($j('#to-parent'), parent);
  setClick($j('#to-children'), children);
  setClick($j('#to-find'), find);
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
  handleDropdown();
});
