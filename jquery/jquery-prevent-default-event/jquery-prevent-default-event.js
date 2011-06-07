(function($){
$.preventDefaultEvent = function(e, options) {
    options = options || {shift:1, ctrl:1, alt:1, meta:1};
    var href = e.currentTarget.getAttribute('href');
    if(((options.shift && e.shiftKey)
        || (options.alt && e.altKey)
        || (options.ctrl && e.ctrlKey)
        || (options.meta && e.metaKey))
        && href && href.indexOf('#') != 0
        && href.indexOf('javascript:') != 0
    ) return true;
    e.preventDefault();
    return false;
}
})(jQuery);
