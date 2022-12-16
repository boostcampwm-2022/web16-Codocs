const copyURLPath = () => {
  const url = window.location.href;
  return navigator.clipboard.writeText(url);
};

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

export { copyURLPath, getRandomColor };

