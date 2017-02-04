function Display(x_size, y_size, target) {

  this.pixel_count = x_size * y_size;
  target = $(target);

  // Initial create of display table
  var table = $('<table>').addClass('tile');

  var row_template = $('<tr>');
  for(var i = 0; i < x_size; i++) {
    row_template.append($('<td>').addClass('light'));
  }
  var rows_drawn = 0;
  for(i = 0; i < y_size; i++) {
    table.append(row_template.clone());
    rows_drawn++;
  }
  target.append(table);

  var cell_identifier = function(x, y) {
    var adjusted_x = (x + 1);
    var adjusted_y = (y + 1);
    return 'tr:nth-child(' + adjusted_y + ') td:nth-child(' + adjusted_x + ')'
  };

  var cell = function(x, y) {
    return table.find(cell_identifier(x, y));
  };

  this.draw = function(image, x, y) {
    var init_time = new Date();

    init_x = x;
    for(var i = 0; i < image.pixel_count; i++) {
      if(image.image_data[i] == '1') {
        cell(x, y).addClass('dark')
      }
      x += 1;
      if(((i + 1) % image.width) == 0) {
        x = init_x;
        y += 1;
      }
    }

    console.log("image draw time: " + (new Date - init_time));
  };

  this.other_draw = function(image, x, y) {
    var init_time = new Date();
    var coords = [];

    $.each(
      image.indexes(),
      function(_, index) {
        $(cells[index]).addClass('dark');
      }
    );

    console.log("image draw time: " + (new Date - init_time));
  };


}
