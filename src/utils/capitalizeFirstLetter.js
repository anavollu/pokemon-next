function capitalizeFirstLetter(string) {
  return string.replace(/\b[a-z](?=[a-z])/g, function (letter) {
    return letter.toUpperCase();
  });
}

export default capitalizeFirstLetter;
