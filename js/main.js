//모든 애니메이션 정보를 배열에 담는다

//즉시 호출 사용 //전역 변수 피하기 위함
(() => {
  let yOffset = 0; //window.pageYOffset 대신 사용할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화 된(눈 앞에 보고 있는) scene(scroll-section) // prevScrollHeight와 yOffset의 높이값을 비교해서 currentScene이 몇번째인지 판별할 수 있다

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
        //각 구간의 컨테이너 역할 지정
        container: document.querySelector("#scroll-section-0"), //section에 있는 ID값
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    // sceneInfo를 다 돌면서 4구간의 scrollHeight를 셋팅한다
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      //컨테이너에 각 scrollHeight를 연결한다
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
  }

  function scrollLoop() {
    //몇번째 스크롤 섹션인지 판별하기 위한 함수 작성
    prevScrollHeight = 0;
    // 활성화 시킬 scene의 번호를 적어준다. 활성해둔 prevScrollHeight의 모든 scene의 scrollHeight의 값을 더해서 확인한다
    for (let i = 0; i < currentScene; i++) {
      //prevScrollHeight와 yOffset의 높이값을 비교해서 판별하는 함수가 currentScene이니까 currentScene은 0 일 때 아래 값들이 아무런 행동을 취하지 않다가
      //스크롤 시 값이 1(section 1번)이 되면 위에 prevScrollHeight값은 0에서 3990값이 들어가게된다
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    //이렇게 동작하기 위해선 스크롤 할 때 마다 체크해서 currentScene의 값을 + 1 - 1해줘야한다
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      //증가할 땐 currentScene이 더해줘야한다
      currentScene++;
    }
    if (yOffset < prevScrollHeight) {
      //브라우저에서 스크롤 최상단에서 위로 쭉 땡기면 바운스 효과가 나오는데 사파리 같은 경우에는 마이너스 값으로 취급한다
      //이때 이러한 값 때문에 의도치 않은 효과가 나오므로 사전에 방지한다
      if (currentScene === 0) return; // 이렇게 작성하면 마이너스 값을 취급하는 브라우저에서도 마이너스로 빼지 않고 리턴하며 종료시킨다
      currentScene--;
    }
    console.log(currentScene);
  }

  window.addEventListener("resize", setLayout); //window 창이 사이즈가 변할 때 setLayout 실행
  window.addEventListener("scroll", () => {
    // 구체적인 역할을 하는 함수 넣는 곳, 추가적인 함수를 넣기 위해 익명함수로 생성했음
    yOffset = window.pageYOffset; // 스크롤이 일어날 때 pageYOffset값으로 갱신한다
    scrollLoop(); //스크롤 시 내려간다는의미로 생성 // 스크롤 시 scrollLoop가 실행됨
  });

  setLayout();
})();

// section 요소도 애니메이션에 연관되니 각 scroll-section들이 각 구간의 컨테이너를 의미한다 section도 sceneInfo 배열에 넣는다
