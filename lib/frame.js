function Frame(width, height, text) {

  text = new Text(text, (width - 1));

  tileset = data.tilesets.frame;
  this.draw = function(display, x, y) {
    var start_time = new Date();

    draw_top_left(display, x, y);
    draw_top(display, x, y);
    draw_top_right(display, x, y);
    draw_right(display, x, y);
    draw_bottom_right(display, x, y);
    draw_bottom(display, x, y);
    draw_bottom_left(display, x, y);
    draw_left(display, x, y);

    write_text(display, x, y);

    console.log('Frame draw time: ' + (new Date() - start_time))
  };

  var write_text = function(display, x, y) {
    coord = display.tile_coord((x + 1), (y + 1));
    display.write(text, coord.x, coord.y);
  };

  var draw_top_left = function(display, x, y) {
    var coord = display.tile_coord(x, y);
    display.draw(tileset['top-left'], coord.x, coord.y);
  };

  var draw_top = function(display, x, y) {
    for(var i = 1; i < (width - 1); i++) {
      var coord = display.tile_coord((x + i), y);
      display.draw(tileset['top'], coord.x, coord.y);
    }
  };

  var draw_top_right = function(display, x, y) {
    var coord = display.tile_coord((x + (width - 1)), y);
    display.draw(tileset['top-right'], coord.x, coord.y);
  };

  var draw_right = function(display, x, y) {
    for(var i = 1; i < (height - 1); i++) {
      var coord = display.tile_coord((x + width - 1), (y + i));
      display.draw(tileset['right'], coord.x, coord.y);
    }
  };

  var draw_bottom_right = function(display, x, y) {
    var coord = display.tile_coord((x + (width - 1)), (y + height - 1));
    display.draw(tileset['bottom-right'], coord.x, coord.y);
  };

  var draw_bottom = function(display, x, y) {
    for(var i = 1; i < (width - 1); i++) {
      var coord = display.tile_coord((x + i), (y + height - 1));
      display.draw(tileset['bottom'], coord.x, coord.y);
    }
  };

  var draw_bottom_left = function(display, x, y) {
    var coord = display.tile_coord(x, (y + height - 1));
    display.draw(tileset['bottom-left'], coord.x, coord.y);
  };

  var draw_left = function(display, x, y) {
    for(var i = 1; i < (height - 1); i++) {
      var coord = display.tile_coord(x, (y + i));
      display.draw(tileset['left'], coord.x, coord.y);
    }
  };


}
