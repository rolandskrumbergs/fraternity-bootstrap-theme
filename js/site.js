$(document).scroll(function () {
  var navigationBar = $('nav');

  if ($(this).scrollTop() > 200) {
    navigationBar
      .removeClass('navbar-transparent')
      .addClass('navbar-transparent-dark');
  } else {
    navigationBar
      .removeClass('navbar-transparent-dark')
      .addClass('navbar-transparent');
  }
});
