const ifError = (cb, fb) => {
  try {
    return cb();
  } catch (error) {
    return fb;
  }
}

module.exports = ifError;