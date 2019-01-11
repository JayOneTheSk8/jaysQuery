let about, addClass, dropdownOpenStatus, each, hide, height, removeClass, show;
let $definition, $dropdownArea, $dropdownButton, $dropdownMenu, $exampleButtons, $header, $mainContent, $sections, $showItem;
const WINDOW = "WINDOW";
const BUTTON = "BUTTON";
const ADD_CLASS = "addClassExample";
const REMOVE_CLASS = "removeClassExample";
const EACH = "eachExample";
const HIDE = "hideExample";
const SHOW = "showExample";
const HEIGHT = "heightExample";

const changeDefinition = (html) => {
  $definition.html(html);
  $exampleButton = $j('.example-button');
  $exampleButton.on('click', playExample);
  $showItem = $j('#show-text');
  $showItem.hide();
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
      let $size = $j('.size');
      let $textarea = $j('.stretch');
      $size.html(` ${$textarea.height()}`);
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
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
  handleDropdown();
});
