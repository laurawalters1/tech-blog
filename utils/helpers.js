module.exports = {
  isEqual: (val1, val2) => {
    return val1 === val2;
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
