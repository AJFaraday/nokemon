function DrawGrid(x_size, y_size, target) {

  var row, cell, active, dark;
  var draw_tool = this;

  var table = $('<table>');
  table.addClass('draw_tool');
  table.on('mouseleave', function() {active = false});
  table.on('mouseup', function() {active = false});

  var preview = $('<div>').addClass('draw_preview');
  var preview_button = $('<button>')
    .addClass('preview_button')
    .html('Preview');
  preview_button.on('mouseup', function() {
    draw_tool.preview();
  });

  for(var row_no = 0; row_no < y_size; row_no++) {
    row = $('<tr>');
    for(var column_no = 0; column_no < x_size; column_no++) {
      cell = $('<td>');
      setCellInteractions(cell);
      row.append(cell);
    }
    table.append(row);
  }

  function setCellInteractions(block) {
    block.on('mousedown', function() {
      $(this).toggleClass('dark');
      dark = $(this).hasClass('dark');
      active = true;
    });
    block.on('mouseover', function() {
      if(active) {
        if(dark) {
          $(this).addClass('dark');
        } else {
          $(this).removeClass('dark');
        }
      }
    });
  }

  $(target).addClass('draw_tool');
  $(target).html(table);
  $(target).append(preview);
  $(target).append($('<br clear="both">'));
  $(target).append(preview_button);

  this.get_image_data = function() {
    var str = '';
    $.each(table.children(), function(row_index, row) {
      $.each($(row).children(), function(cell_index, cell) {
        if($(cell).hasClass('dark')) {
          str = str + '1';
        } else {
          str = str + '0';
        }
      });
    });
    return str;
  };

  this.get_decimal_array = function() {
    return Utils.bin2decArray(this.get_image_data());
  };

  this.preview = function() {
    var image = new Image(this.get_decimal_array(), x_size, y_size);
    image.render(preview);
  };

}
