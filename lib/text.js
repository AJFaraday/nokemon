function Text(string, line_length) {

  var char_images = [];

  var image;
  $.each(string.split(''), function(index, character) {
    image = data.font[character];
    if(image == null) {
      char_images.push(new Image([], 8,8))
    } else {
      char_images.push(image)
    }
  });

  this.lines = [];

  while (char_images.length > 0) {
    this.lines.push(char_images.splice(0, (line_length - 1)))
  }

}
