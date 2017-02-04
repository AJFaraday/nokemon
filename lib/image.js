function Image(source, row_length, no_rows) {

  this.pixel_count = row_length * no_rows;
  this.width = row_length;
  this.height = no_rows;
  
  if(Utils.isInteger(source)) {
    this.image_data = Utils.dec2bin(source);
  } else if(typeof source == 'string') {
    this.image_data = Utils.onlyBinary(source);
  } else if(typeof source == 'object') { //array?!?
    this.image_data = Utils.decArray2bin(source);
  }
  while(this.image_data.length < this.pixel_count) {
    this.image_data = '0' + this.image_data;
  }

  this.image_data_as_number = function() {
    return Utils.bin2dec(this.image_data);
  };

  this.image_data_as_number_array = function() {
    return Utils.bin2decArray(this.image_data);
  };

  this.render = function(target) {
    var table = $('<table>').addClass('tile');
    var row = $('<tr>');
    for(var i = 0; i < this.pixel_count; i++) {
      if(this.image_data[i] == '1') {
        row.append($('<td>').addClass('dark'));
      } else {
        row.append($('<td>').addClass('light'));
      }
      if(((i + 1) % row_length) == 0) {
        table.append(row);
        row = $('<tr>');
      }
    }
    $(target).html(table);
  };

}