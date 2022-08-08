//모든 애니메이션 정보를 배열에 담는다

//즉시 호출 사용 //전역 변수 피하기 위함
(() => {
  let yOffset = 0; //window.pageYOffset 대신 사용할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화 된(눈 앞에 보고 있는) scene(scroll-section) // prevScrollHeight와 yOffset의 높이값을 비교해서 currentScene이 몇번째인지 판별할 수 있다
  let enterNewScene = false; // 새로운 scene이 시작된 순간 True

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
      //objs 는 html dom 객체 요소
      objs: {
        //html 객체 모으기
        //각 구간의 컨테이너 역할 지정
        container: document.querySelector("#scroll-section-0"), //section에 있는 ID값
        messageA: document.querySelector('#scroll-section-0 .main-message.a'), //클래스 범용화 시켜주기
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      //어느시점에 등장하고 빠질것인지 정한다
      //values는 값에 해당된다
      values: {
        //텍스트 올라고오 내려오는 투명도 지정
        //시작과 끝 값 지정 0 ~ 1
        messageA_opacity: [0, 1] //전체 범위에 scrollRatio를 곱하고 초기값인 0을 더해준다
      }
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

    yOffset = window.pageYOffset; //pageYOffset 대신 yOffset변수를 사용하기로했지만 정확한 의미를 두기 위함
    //setLayout 엣도 현재 스크롤 위치에 맞게 currentscene을 셋팅해준다
    let totalScrollHeight = 0;
    for(let i=0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight; //각 scene에 scrollHeight를 더해서 넣어주는 중
      //현재 스크롤 높이와 비교한다 for문 돌면 돌수록 스크롤 높이가 커짐
      if(totalScrollHeight >= yOffset) { //언젠가는 맞춰야 하므로 현재 스크롤 위치보다 큭나 같을 때
        currentScene = i;
        break;
      }
    }
     //body에 현재 currentScene 갱신한다
    document.body.setAttribute('id',`show-scene-${currentScene}`)
  }

  function calcValues(values, currentYOffset) { //currentYOffset 매개변수가 현재 씬에서 얼마나 스크롤 됐는지 나타낸다
    let rv;
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight //현재 Scene(스크롤섹션)에서 전체 범위에서 현재 얼만큼 스크롤 했는지 스크롤 범위를 비율로 구한다
    
    rv = scrollRatio * (values[1] - values[0]) + values[0];

    return rv;
  }

  function playAnimation() {

    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    //스크롤 높이 픽셀, scene 넘어갈 시 값 초기화
    // console.log(currentScene, currentYOffset)

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        break;

      case 1:
        // console.log('1 play');
        break;

      case 2:
        // console.log('2 play');
        break;

      case 3:
        // console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
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
      enterNewScene = true;
      //증가할 땐 currentScene이 더해줘야한다
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene}`)
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      //브라우저에서 스크롤 최상단에서 위로 쭉 땡기면 바운스 효과가 나오는데 사파리 같은 경우에는 마이너스 값으로 취급한다
      //이때 이러한 값 때문에 의도치 않은 효과가 나오므로 사전에 방지한다
      if (currentScene === 0) return; // 이렇게 작성하면 마이너스 값을 취급하는 브라우저에서도 마이너스로 빼지 않고 리턴하며 종료시킨다
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene}`)
    }
    // document.body.setAttribute('id',`show-scene-${currentScene}`) //currentScene의 순서를 낳는다. body의 id가 셋팅된다

    if(enterNewScene) return;
    //애니메이션 처리
    playAnimation();
    //  document.body.setAttribute('id',`show-scene-${currentScene}`) //currentScene의 순사를 낳는다. body의 id가 셋팅된다
  }


  window.addEventListener("scroll", () => {
    // 구체적인 역할을 하는 함수 넣는 곳, 추가적인 함수를 넣기 위해 익명함수로 생성했음
    yOffset = window.pageYOffset; // 스크롤이 일어날 때 pageYOffset값으로 갱신한다
    scrollLoop(); //스크롤 시 내려간다는의미로 생성 // 스크롤 시 scrollLoop가 실행됨
  });

  window.addEventListener('load', setLayout); //load 시 setLayout 실행
  // window.addEventListener('DOMContentLoaded', setLayout);
  //DOMContentLoaded도 사용 가능하다
  //load는 웹페이지에 있는 이미지 리소스 모두 싹다 로딩하고 실행되고
  //DOMContentLoaded는 DOM 답게 DOM 구조만 끝나면 실행된다, 이미지는 상관하지않음 속도측면엣ㄴ DOM을 사용
  window.addEventListener("resize", setLayout); //window 창이 사이즈가 변할 때 setLayout 실행
  //setLayou 현재 역할은 sceneInfo 배열에 있는 각 scene의 scrollHeight를 잡아주고 scrollHeight를 값을 실제 scrollsection element의 높이로 셋팅해준다 
  // setLayout(); //layout 초기화
})();

// section 요소도 애니메이션에 연관되니 각 scroll-section들이 각 구간의 컨테이너를 의미한다 section도 sceneInfo 배열에 넣는다
