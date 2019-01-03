const changeDefinition = (html) => {
  $definition.html(html);
};

const linkTo = (section) => {
  return e => {
    changeDefinition(section);
  };
};

const setClick = (queryObject, section) => {
  queryObject.on('click', linkTo(section));
};

document.addEventListener("DOMContentLoaded", (e) => {
  about = $j('#about').html();
  setClick($j('#to-about'), about);
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
});
