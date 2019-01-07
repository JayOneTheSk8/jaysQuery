let about, addClass, dropdownOpenStatus;
let $definition, $dropdownArea, $dropdownButton, $dropdownMenu, $header, $sections;
const WINDOW = "WINDOW";
const BUTTON = "BUTTON";

const changeDefinition = (html) => {
  $definition.html(html);
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
      $dropdownMenu.removeClass('closed');
      return;
    case false:
      if (!$dropdownMenu.nodes[0].className.includes('closed')) {
        $dropdownMenu.addClass('closed');
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
  $dropdownMenu = $j('#dropdown-menu');
  $dropdownArea = $j('.dropdown-hover-area');
  $dropdownArea.on('mouseenter', showDropdownButton);
  $dropdownArea.on('mouseleave', hideDropdownButton);
  $dropdownButton = $j('.close-dropdown-button');
  $dropdownButton.on('click', changeDropdown);
  $header = $j('.header');
  setClick($j('#to-about'), about);
  setClick($j('#to-addClass'), addClass);
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
  handleDropdown();
});
