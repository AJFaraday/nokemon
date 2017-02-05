function Display(x_size, y_size, target) {

  this.pixel_count = x_size * y_size;
  target = $(target);

  draw_start = new Date;
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

  console.log(new Date - draw_start);


  var cell_identifier = function(x, y) {
    var adjusted_x = (x + 1);
    var adjusted_y = (y + 1);
    return 'tr:nth-child(' + adjusted_y + ') td:nth-child(' + adjusted_x + ')'
  };

  var cell = function(x, y) {
    //return table.find(cell_identifier(x, y));
    //return rows[y][x];
    return $(table[0].rows[y].cells[x]);
  };

  // The coordinates of an 8x8 tile, from the top left.
  this.tile_coord = function(x, y) {
    return {x: x * 8, y: y * 8};
  };

  // Following this are instructions which will change the display

  this.draw = function(image, x, y) {
    if(x > x_size || y > y_size) {
      console.log('invalid draw');
      return
    }
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

  this.write = function(text, x, y) {
    var init_time = new Date;
    display = this;
    $.each(
      text.lines,
      function(line_index, line) {
        $.each(line, function(char_index, char) {
          display.draw(char, x + (char_index * 8), y);
        });
        y += 8;
      }
    );
    console.log('string write time: ' + (new Date - init_time));
  };

  this.clear = function(start_x, start_y, width, height) {
    var end_y = start_y + height;
    var end_x = start_x + width;
    for(var y = start_y; y < end_y; y++) {
      for(var x = start_x; x < end_x; x++) {
        cell(x, y).removeClass('dark');
      }
    }
  }

}
