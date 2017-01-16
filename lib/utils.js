Utils = {

  /* Convert a decimal number to a binary string, padded to n digits
    Utils.dec2bin(5,0)
      -> '101'
    Utils.dec2bin(5,4)
      -> '0101'
    Only works up to 53 binary digits :/
  */
  dec2bin: function(dec, size) {
    var binary = (dec >>> 0).toString(2);
    while (binary.length < size) {
      binary = '0' + binary;
    }
    return binary;
  },

  /* Convert a binary string to a decimal number
   Utils.dec2bin('101')
   -> 5
   Utils.dec2bin('0101')
   -> 5
   Only works up to 53 binary digits :/
   */
  bin2dec: function(str) {
    return parseInt(str, 2);
  },

  /* converts a binary string to an array of decimal numbers
     each number represents 32 binary digits
    Utils.bin2decArray('1000000101000010001001000001100000011000001001000100001010000001')
    -> [2168595480, 405029505]
  */
  bin2decArray: function(str) {
    var chunk;
    var integers = [];
    var chars = str.split('');
    while (chars.length > 0) {
      chunk = chars.splice(0, 32);
      integers.push(this.bin2dec(chunk.join('')))
    }
    return integers;
  },

  /* converts an array of 32-bit numbers to a single binary string
    Utils.decArray2bin([2168595480, 405029505])
    -> '1000000101000010001001000001100000011000001001000100001010000001'
  */
  decArray2bin: function(array) {
    var string = '';
    $.each(array, function(index, integer) {
      string = string + Utils.dec2bin(integer, 32);
    });
    return string;
  },
  
  isInteger: function(val) {
    return val === parseInt(val, 10);
  },

  /* Remove any characters of a string which aren't a 0 or a 1 */
  onlyBinary: function(str) {
    return str.replace(/[^01]/gm, "");
  }

}
;
