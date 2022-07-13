//모든 애니메이션 정보를 배열에 담는다

//즉시 호출 사용 //전역 변수 피하기 위함
(() => {
  const sceneInfo = [
    //객체 4개 생성 스크롤 섹션도 4개
    //스크롤 높이는 스크립트로 미리 잡아준다 //각 픽셀에 대한 정보를 scrollHeight에 생성
    //각각 화면에 맞게 사이즈가 달라지니 높이를 고정값이 아닌 스크롤의 몇배수를 지정한다, 브라우저 높이의 5배로 scrollHeight 세팅
    // 각 스크롤 높이 구간을 가지고 있는 값이 scrollHeight 속성이다
    // heightNum을 이용해서 scrollHeight값을 셋팅한다
    {
      // 0
      type: "sticky", //sticky로 동작하는 이벤트와 일반적인 스크롤로 작동되는 스크롤 스타일들이 다르기 때문에 타입을 지정한다 (sticky, normal)
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        //html 객체 모으기
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    // sceneInfo를 다 돌면서 4구간의 scrollHeight를 셋팅한다
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    }
    console.log(sceneInfo);
  }
  setLayout();
})();

// section 요소도 애니메이션에 연관되니 각 scroll-section들이 각 구간의 컨테이너를 의미한다 section도 sceneInfo 배열에 넣는다
