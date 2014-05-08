module.exports = function defer(callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  process.nextTick(function() {
    callback.apply(self, args);
  });
};
