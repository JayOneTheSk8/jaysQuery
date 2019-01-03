const changeDefinition = (html) => {
  $definition.html(html);
};

document.addEventListener("DOMContentLoaded", (e) => {
  about = $j('#about').html();
  $definition = $j('.definition');
  $sections = $j('.definition-section');
  $sections.remove();
  changeDefinition(about);
});
