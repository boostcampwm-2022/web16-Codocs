const copyURLPath = () => {
  try {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert('주소가 복사되었습니다.\n문서를 다른 사람에게 공유해보세요!'));
  } catch (e) {
    alert('주소 복사에 실패했어요 ㅠㅠ');
  }
};

export { copyURLPath };
