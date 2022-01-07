const $carousel_cells = $('#product-carousel li');
const $carousel_dots = $('#carousel-dots li');
const $carousel_nav = $('.carousel-nav');
let selected_product_index = 0;

function selectProduct(index) {
  selected_product_index = index % $carousel_cells.length;

  if (selected_product_index < 0) selected_product_index = $carousel_cells.length + selected_product_index;

  $carousel_cells.each(function (i) {
    let offset = i - selected_product_index;
    if (offset < 0) offset += $carousel_cells.length;

    let index;
    for (index = 0; index < $carousel_cells.length + 1; index++) {
      $(this).removeClass('item-' + index).addClass('item-' + (offset + 1));
    }
  });

  $carousel_dots.eq(index).addClass('active').siblings('li').removeClass('active');
}

/* Arrow clicks */
$carousel_nav.click(function () {
  const delta = $(this).hasClass('prev') ? -1 : 1;
  const $delta_product = $(`#product-carousel li:eq(${(selected_product_index + delta) % $carousel_cells.length})`);
  const delta_product_index = parseInt($delta_product.index());
  selectProduct(delta_product_index);
});

/* Can clicks */
$carousel_cells.click(function () {
  selectProduct($(this).index());
});

/* Pagination */
$carousel_dots.click(function (e) {
  selectProduct($(this).index());
  $(e.currentTarget).addClass('active').siblings('li').removeClass('active');
});

/* Left/Right key arrows */
$(document).keydown(e => {
  const delta = e.keyCode == 37 ? -1 : 1;
  const $delta_product = $(`#product-carousel li:eq(${(selected_product_index + delta) % $carousel_cells.length})`);
  const delta_product_index = parseInt($delta_product.index());

  if (e.keyCode == 37 || e.keyCode == 39) {
    selectProduct(delta_product_index);
    return false;
  }
});

/*
    Inspired by:
    https://www.7up.com/en/products
    */