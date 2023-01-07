function getId(fullUrl, splitUrl) {
  const url = fullUrl.split(splitUrl);
  const id = url[1].slice(0, -1);
  return id;
}

export default getId;
