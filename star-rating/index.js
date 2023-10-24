// // do something!

//head에다가 css 요소 추가 
let container = document.getElementsByTagName("head")[0];
let linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "./star-rating/theme.css";
container.appendChild(linkElement);


const StarRating = ($container) => {
    if(!$container) return; //렌더링 문제로 parameter가 없는경우에 리턴시킴


    //  $container 에서 파라미터로 받아온 콘테이너div 갯수 만큼 for문 돌려서 콘테이너 생성
    // 클래스 네임과 개수를 전달 받아 비교하여 클래스 네임 부여
    const starFunc = (classname, count) => {
        console.log(classname, count);
        for(let i = 0; i < $container.children.length; i++) {
            console.log("$container.children.length", $container.children.length);
            let starContainer = $container.children[i];
            if(count > i) {
                starContainer.firstElementChild.classList.add(classname);
            } else {
                starContainer.firstElementChild.classList.remove(classname);
            }
        }
    }

    // 별 생성 조건이 data-max-rating의 개수로 되어 있어 최대 개수 만큼 for 문 돌려 기초별 생성
    for (let i = 0; i < $container.dataset.maxRating; i++) {
        const score = i + 1;

        // 별 아이콘 감싸고 있는 span 태그
        let starSpan = document.createElement('span');
        starSpan.className = "star-rating-container";
        // 별 아이콘 그려주는 i 태그
        let starIcon = document.createElement('i');
        starIcon.className = "bx bxs-star";
 
        starSpan.appendChild(starIcon);
        $container.appendChild(starSpan);

       // 마우스 오버 이벤트
        starIcon.addEventListener('mouseover', () => {
            starFunc("hovered", score); // hover인지 select인지 파라미터로 클래스랑 개수score 전달
        });

        starIcon.addEventListener('mouseleave', () => {
            starIcon.classList.remove("hovered"); // 별 위에서 마우스 떠나면 hover 클래스 삭제
        });

        starIcon.addEventListener('click', () => {
            starFunc("selected", score); // 클릭이벤트 일 때는 select 전달

            const changeEvent = new CustomEvent('rating-change', {
                detail: score // 체인지 이벤트를 새로 커스텀해서 만든 후, detail에 개수 전달
            });

            $container.dispatchEvent(changeEvent); //$container에 생성한 커스텀이벤트 전달
        });
    }

    // 마우스 오버 전체해제
    $container.addEventListener('mouseleave', () => {
        for (let i = 0; i < $container.children.length; i++) {
            $container.children[i].firstElementChild.classList.remove('hovered');
        }
    });
}

export default StarRating;