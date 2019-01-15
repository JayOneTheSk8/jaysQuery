let about, addClass, dropdownOpenStatus, each, hide, height, html, on, off, removeClass, show, width;
let $clickHere, $definition, $dropdownArea, $dropdownButton, $dropdownMenu, $exampleButtons, $header,
$mainContent, $moveableBox, $sections, $showItem;
const WINDOW = "WINDOW";
const BUTTON = "BUTTON";
const ADD_CLASS = "addClassExample";
const REMOVE_CLASS = "removeClassExample";
const EACH = "eachExample";
const HIDE = "hideExample";
const SHOW = "showExample";
const HEIGHT = "heightExample";
const WIDTH = "widthExample";
const HTML = "htmlExample";
const ON = "onExample";

// For .off Box
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
  $moveableBox = $j('#moveable-box');
  $moveableBox.on('mouseenter', changeButtonPosition);
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

function checkHeader() {
  if (window.innerWidth < 960) {
    dropdownOpenStatus = false;
  } else if (window.innerWidth >= 960) {
    dropdownOpenStatus = true;
  }
};

const linkTo = (section) => {
  return e => {
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
    case WIDTH:
      let $size = $j('.size');
      let $textarea = $j('.stretch');
      if (e.currentTarget.id === HEIGHT) {
        $size.html(` ${$textarea.height()}`);
      } else {
        $size.html(` ${$textarea.width()}`);
      }
      return;
    case HTML:
      let input, $paragraph;
      $j('#html-input').each((node) => input = node.value);
      $paragraph = $j('.change-html');
      $paragraph.html(input);
      return;
    default:
      return;
  }
};

const moveButton = (e) => {
  switch ($clickHere.nodes[0].classList.length) {
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
}

const hideDropdownButton = () => {
  $dropdownButton.removeClass('open-dropdown');
}

const toggleDropdown = () => {
  switch (dropdownOpenStatus) {
    case true:
      $dropdownMenu.show();
      $definition.removeClass('shifted');
      return;
    case false:
        if (!$dropdownMenu.nodes[0].className.includes('closed')) {
          $dropdownMenu.hide();
          $definition.removeClass('shifted');
        }
      return;
    default:
      return;
  }
}

const handleDropdown = (e) => {
  checkHeader();
  toggleDropdown();
};

const changeDropdown = (e) => {
  dropdownOpenStatus = dropdownOpenStatus === true ? false : true;
  toggleDropdown();
};

window.addEventListener("resize", handleDropdown);

document.addEventListener("DOMContentLoaded", (e) => {
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
  $dropdownMenu = $j('.function-list');
  $dropdownArea = $j('.dropdown-hover-area');
  $dropdownButton = $j('.close-dropdown-button');
  $dropdownArea.on('mouseenter', showDropdownButton);
  $dropdownArea.on('mouseleave', hideDropdownButton);
  $dropdownButton.on('click', changeDropdown);
  $dropdownButton.on('mouseenter', showDropdownButton);
  $dropdownButton.on('mouseleave', hideDropdownButton);
  $header = $j('.header');
  $mainContent = $j('.main-content');
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
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
  handleDropdown();
});
