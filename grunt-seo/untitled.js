var src = [
    'cformnkp.js',
    'AC_RunActiveContent.js',
    'js/moo_12.js',
    'js/sl_slider.js',
    'js/swfobject.js',
    'scripts/*.js',
    'pro_dropdown_2/*js'
];

// returns full list of .js files that matches your *.js
var complete_src = grunt.file.expand(src);


var final_name = '';

// some string manipulations to get your the format you want

for (var i = 0; i < complete_src.length; i++) {
    complete_src[i] = complete_src[i].substring(complete_src[i].lastIndexOf('/') + 1, complete_src[i].length - 3);

}

var final_name = complete_src.join('-');
 dist: {
        src: src ,
        dest: 'dist/'+final_name+'.js'
    }


    //

    concat: {
  options: {
    process: function(src, filepath) {
      return '//####' + filepath + '\n' + src;
    }
},
