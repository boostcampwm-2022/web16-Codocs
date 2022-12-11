const copyURLPath = () => {
  const url = window.location.href;
  return navigator.clipboard.writeText(url);
};

export { copyURLPath };
